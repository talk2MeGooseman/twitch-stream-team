import { action } from 'mobx'
import { andThen, map, pipe } from 'ramda'

import {
  CUSTOM_TEAM_TYPE,
  SAVE_DONE,
  SAVE_ERROR,
  SAVE_PENDING,
} from '../../services/constants'
import { setCustomTeamInformation } from '../../services/Ebs'
import {
  requestChannelsById,
  requestChannelsByName,
} from '../../services/TwitchAPI'
import BaseTeamModel from './BaseTeamModel'

export default class CustomTeamModel extends BaseTeamModel {
  constructor(parentStore, data) {
    super(parentStore)
    this.rawData = data
  }

  @action
  async initTeamInfo() {
    const data = this.rawData

    if (!data) {
      this.loadingState = SAVE_DONE
      return
    }

    if (data.customTeamMembers) {
      pipe(
        map((member) => member.channelId),
        requestChannelsById,
        andThen((channels) => this.buildChannels(channels))
      )(data.customTeamMembers)
    }

    this.name = data.name
    this.customName = data.name

    this.loadingState = SAVE_DONE
  }

  /**
   * Add a channel to the custom team object
   *
   * @param {string} channelName
   * @memberof CustomTeamModel
   */
  @action
  addChannel(channelName) {
    channelName = channelName.trim()

    requestChannelsByName([channelName]).then((data) =>
      // Add to channels array and potentially do some validation checks
       this.addChannels(data)
    ).catch(() => {
      // Do nothing
    })
  }

  @action
  removeChannel(channelName) {
    const index = this.channels.findIndex(
      (channel) => channel.name === channelName
    )
    this.channels.splice(index, 1)
  }

  @action
  async setLogo() {
    this.logo =  null
  }

  @action
  async setBanner() {
    this.banner =  null
  }

  @action
  setTeam() {
    if (
      !this.name ||
      this.name.length === 0 ||
      !this.channels ||
      this.channels.length === 0
    ) {
      this.parentStore.saveState = SAVE_DONE
      return
    }

    this.parentStore.saveState = SAVE_PENDING
    setCustomTeamInformation(this.parentStore.token, this.toJSON()).then(
      // inline created action
      action('setTeamSuccess', (result) => {
        const { customTeam } = result

        this.rawData = customTeam
        this.initTeamInfo()

        this.parentStore.teamType = CUSTOM_TEAM_TYPE
        this.parentStore.saveState = SAVE_DONE
        this.parentStore.team = this
        this.parentStore.fetchLiveChannels()
      }), // inline created action
      action('setTeamError', () => {
        this.parentStore.saveState = SAVE_ERROR
      })
    ).catch(() => {
      // Do nothing
    })
  }

  toJSON() {
    return {
      customName: this.name,
      customChannels: this.channels.map((c) => c.toJSON()),
      banner: this.banner,
      logo: this.logo,
    }
  }
}
