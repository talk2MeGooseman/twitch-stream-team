import { action,observable } from 'mobx'

import {
  SAVE_DONE,
  SAVE_ERROR,
  SAVE_PENDING,
  TWITCH_TEAM_TYPE,
} from '../../services/constants'
import { setPanelInformation } from '../../services/Ebs'
import { requestChannelsById,requestTeamInfo } from '../../services/TwitchAPI'
import BaseTeamModel from './BaseTeamModel'

// Bit 1 - Lurking_kat

export default class TwitchTeamModel extends BaseTeamModel {
  @observable teams

  /**
   * Creates an instance of TwitchTeamModel.
   * @param {*} parentStore - Mobx Store
   * @param {string} selectedTeam Name of Twitch Team
   * @memberof TwitchTeamModel
   */
  constructor(parentStore, selectedTeam) {
    super(parentStore)
    this.name = selectedTeam && selectedTeam.name ? selectedTeam.name : selectedTeam
  }

  /**
   * Initializes team information from Twitch Team API
   * Endpoint
   *
   * @returns void
   * @memberof TwitchTeamModel
   */
  @action
  async initTeamInfo() {
    if (!this.name) {
      return
    }

    const { data: [team] } = await requestTeamInfo(this.name)

    const channels = await requestChannelsById(team.users)
    this.buildChannels(channels)

    this.info = team.info
    this.display_name = team.team_display_name
    this.logo = team.thumbnail_url
    this.banner = team.banner
    this.id = team.id
  }

  /**
   * Sets the passed in team in the backend
   *
   * @param {string} selectedTeam
   * @memberof TwitchTeamModel
   */
  @action
  setTeam(selectedTeam) {
    this.parentStore.saveState = SAVE_PENDING
    return setPanelInformation(this.parentStore.token, { selectedTeam }).then(
      // inline created action
      action('fetchSuccess', (result) => {
        this.name = result.selectedTeam
        this.initTeamInfo()
        this.parentStore.teamType = TWITCH_TEAM_TYPE
        this.parentStore.saveState = SAVE_DONE
        this.parentStore.team = this
        this.parentStore.fetchLiveChannels()
      }),
      // inline created action
      action('fetchError', () => {
        this.saveState = SAVE_ERROR
      })
    )
  }
}
