import { observable, action } from 'mobx'
import {
  getPanelInformation,
  configGetPanelInformation,
} from '../../services/Ebs'
import {
  LOAD_DONE,
  LOAD_ERROR,
  LOAD_PENDING,
  CUSTOM_TEAM_TYPE,
  SAVE_DONE,
} from '../../services/constants'
import TwitchTeamModel from '../model/TwitchTeamModel'
import CustomTeamModel from '../model/CustomTeamModel'
import BaseTeamModel from '../model/BaseTeamModel'
import { requestLiveChannels } from '../../services/TwitchAPI'

// Gift Sub from PakmanJr - csharpfritz

export default class Store {
  /** @type {string} */
  @observable token
  /** @type {LOAD_DONE|LOAD_ERROR|LOAD_PENDING} */
  @observable loadingState = LOAD_PENDING
  @observable saveState = SAVE_DONE
  /** @type {'twitch'|CUSTOM_TEAM_TYPE} */
  @observable teamType
  /** @type {TwitchTeamModel} */
  @observable twitchTeam
  /** @type {CustomTeamModel} */
  @observable customTeam
  /** @type {BaseTeamModel} */
  @observable team

  toJSON = () => {
    return {
      selected_team: this.selected_team,
      customName: this.customName,
      customChannels: this.customChannels,
    }
  }

  @action
  fetchConfig() {
    this.loadingState = LOAD_PENDING
    configGetPanelInformation(this.token).then(
      // inline created action
      action('fetchSuccess', async (result) => {
        let { customTeam, selectedTeam, teamType, teams } = result

        this.teamType = teamType

        this.twitchTeam = new TwitchTeamModel(this, selectedTeam)
        this.twitchTeam.teams = teams

        this.customTeam = new CustomTeamModel(this, customTeam)

        if (this.teamType === CUSTOM_TEAM_TYPE) {
          this.team = this.customTeam
        } else {
          this.team = this.twitchTeam
        }

        await this.twitchTeam.initTeamInfo()
        await this.customTeam.initTeamInfo()

        this.loadingState = LOAD_DONE
        // Fetch the live channels
        this.fetchLiveChannels()
      }),
      // inline created action
      action('fetchError', (error) => {
        this.twitchTeam = new TwitchTeamModel(this)
        this.customTeam = new CustomTeamModel(this)
        this.twitchTeam.loadingState = LOAD_ERROR
        this.customTeam.loadingState = LOAD_ERROR
        this.loadingState = LOAD_ERROR
      })
    )
  }

  @action
  fetchTeam() {
    this.loadingState = LOAD_PENDING

    getPanelInformation(this.token).then(
      // inline created action
      action('fetchSuccess', async (result) => {
        let { twitchTeam, teamType, customTeam } = result

        this.teamType = teamType
        if (this.teamType === CUSTOM_TEAM_TYPE) {
          this.team = new CustomTeamModel(this, customTeam)
        } else {
          this.team = new TwitchTeamModel(this, twitchTeam)
        }

        await this.team.initTeamInfo()
        this.fetchLiveChannels()
        setInterval(this.fetchLiveChannels, 1000 * 60 * 5)
        this.loadingState = LOAD_DONE
      }),
      // inline created action
      action('fetchError', (error) => {
        this.loadingState = LOAD_ERROR
      })
    )
  }

  setChannelFollowed(channelName) {
    let team = this.selectedTeam()
    team.setChannelFollowed(channelName)
  }

  fetchLiveChannels = async () => {
    let team = this.selectedTeam()
    let liveChannels = []
    let notLiveChannels = []

    if (team.channels.length === 0) {
      return
    }

    let data
    try {
      data = await requestLiveChannels(team.channels)
    } catch (error) {
      return
    }

    if (!data) {
      return
    }

    team.channels.forEach((channel) => {
      let foundChannel = data.find((c) => {
        return c.user_id === channel.id
      })
      if (foundChannel) {
        channel.isLive = true
        channel.info.status = [foundChannel.game_name, foundChannel.title].join(": ")
        liveChannels.push(channel)
      } else {
        channel.isLive = false
        notLiveChannels.push(channel)
      }
    })

    // Set new channel order with live channels at the top
    team.channels = liveChannels.concat(notLiveChannels)
  }

  selectedTeam() {
    return this.team
  }
}
