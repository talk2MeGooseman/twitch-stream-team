import { action,observable } from 'mobx'

import {
  CUSTOM_TEAM_TYPE,
  LOAD_DONE,
  LOAD_ERROR,
  LOAD_PENDING,
  SAVE_DONE,
} from '../../services/constants'
import {
  configGetPanelInformation,
  getGqlPanelInformation,
  getPanelInformation,
  initClient} from '../../services/Ebs'
import { requestLiveChannels } from '../../services/TwitchAPI'
import CustomTeamModel from '../model/CustomTeamModel'
import TwitchTeamModel from '../model/TwitchTeamModel'

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

  toJSON = () => ({
    selected_team: this.selected_team,
    customName: this.customName,
    customChannels: this.customChannels,
  })

  @action
  fetchConfig() {
    this.loadingState = LOAD_PENDING

    getGqlPanelInformation(this.gqlclient()).then(
      // inline created action
      action('fetchSuccess', async ({ channel: { streamTeam: { customTeam, twitchTeam: selectedTeam, customActive }}}) => {
        this.customActive = customActive

        this.twitchTeam = new TwitchTeamModel(this, selectedTeam)

        this.customTeam = new CustomTeamModel(this, customTeam)

        this.team = customActive ? this.customTeam : this.twitchTeam

        await this.twitchTeam.initTeamInfo()
        await this.customTeam.initTeamInfo()

        this.loadingState = LOAD_DONE
        // Fetch the live channels
        this.fetchLiveChannels()
      }),
      // inline created action
      action('fetchError', () => {
        this.twitchTeam = new TwitchTeamModel(this)
        this.customTeam = new CustomTeamModel(this)
        this.twitchTeam.loadingState = LOAD_ERROR
        this.customTeam.loadingState = LOAD_ERROR
        this.loadingState = LOAD_ERROR
      })
    ).catch(() => {
      // do nothing
    })
  }

  @action
  fetchTeam() {
    this.loadingState = LOAD_PENDING

    getPanelInformation(this.token).then(
      // inline created action
      action('fetchSuccess', async (result) => {
        const { twitchTeam, teamType, customTeam } = result

        this.teamType = teamType
        this.team = this.teamType === CUSTOM_TEAM_TYPE ? new CustomTeamModel(this, customTeam) : new TwitchTeamModel(this, twitchTeam)

        await this.team.initTeamInfo()
        this.fetchLiveChannels()
        setInterval(this.fetchLiveChannels, 1000 * 60 * 5)
        this.loadingState = LOAD_DONE
      }),
      // inline created action
      action('fetchError', () => {
        this.loadingState = LOAD_ERROR
      })
    ).catch(() => {
      // do nothing
    })
  }

  setChannelFollowed(channelName) {
    const team = this.selectedTeam()
    team.setChannelFollowed(channelName)
  }

  fetchLiveChannels = async () => {
    const team = this.selectedTeam()
    const liveChannels = []
    const notLiveChannels = []

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
      const foundChannel = data.find((c) => c.user_id === channel.id)
      if (foundChannel) {
        channel.isLive = true
        channel.info.status = [foundChannel.game_name, foundChannel.title].join(': ')
        liveChannels.push(channel)
      } else {
        channel.isLive = false
        notLiveChannels.push(channel)
      }
    })

    // Set new channel order with live channels at the top
    team.channels = [...liveChannels, ...notLiveChannels]
  }

  selectedTeam() {
    return this.team
  }

  gqlclient() {
    if(this.client) {
      return this.client
    }
    this.client = initClient(this.token)
    return this.client
  }
}
