import { observable, action } from 'mobx'
import {
  requestChannelsById,
  requestChannelsByName,
} from '../../services/TwitchAPI'
import BaseTeamModel from './BaseTeamModel'
import { setCustomTeamInformation } from '../../services/Ebs'
import {
  LOAD_PENDING,
  SAVE_PENDING,
  SAVE_DONE,
  SAVE_ERROR,
  CUSTOM_TEAM_TYPE,
} from '../../services/constants'
import { debug } from 'util'
import { isValidImage } from '../../services/Utils'

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

    if (data.users) {
      requestChannelsById(data.users).then((c) => {
        this.buildChannels(c)
      })
    }

    this.name = data.name
    this.customName = data.name
    this.display_name = data.display_name

    this.logo = null
    this.banner = null

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

    requestChannelsByName([channelName]).then((data) => {
      // Add to channels array and potentially do some validation checks
      this.addChannels(data)
    })
  }

  @action
  removeChannel(channelName) {
    let index = this.channels.findIndex(
      (channel) => channel.name === channelName
    )
    this.channels.splice(index, 1)
  }

  @action
  async setLogo(text) {
    if (await isValidImage(text)) {
      this.logo = text
    } else {
      this.logo = null
    }
  }

  @action
  async setBanner(text) {
    if (await isValidImage(text)) {
      this.banner = text
    } else {
      this.banner = null
    }
  }

  @action
  setTeam() {
    if (
      !this.name ||
      !this.name.length ||
      !this.channels ||
      !this.channels.length
    ) {
      this.parentStore.saveState = SAVE_DONE
      return
    }

    this.parentStore.saveState = SAVE_PENDING
    setCustomTeamInformation(this.parentStore.token, this.toJSON()).then(
      // inline created action
      action('setTeamSuccess', (result) => {
        let { customTeam } = result

        this.rawData = customTeam
        this.initTeamInfo()

        this.parentStore.teamType = CUSTOM_TEAM_TYPE
        this.parentStore.saveState = SAVE_DONE
        this.parentStore.team = this
        this.parentStore.fetchLiveChannels()
      }), // inline created action
      action('setTeamError', (error) => {
        this.parentStore.saveState = SAVE_ERROR
      })
    )
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
