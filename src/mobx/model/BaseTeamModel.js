import { action,observable } from 'mobx'

import {
  LOAD_PENDING,
  SAVE_DONE,
} from '../../services/constants'
import ChannelModel from './ChannelModel'

export default class BaseTeamModel {
  @observable channels = []

  @observable loadingState = LOAD_PENDING

  @observable saveState = SAVE_DONE

  @observable name

  @observable info

  // eslint-disable-next-line babel/camelcase
  @observable display_name

  @observable logo

  @observable banner

  @observable id

  constructor(parentStore) {
    this.parentStore = parentStore
  }

  /**
   * Initializes team information from Twitch Team API
   * Endpoint
   *
   * @returns void
   * @memberof TwitchTeamModel
   */
  // eslint-disable-next-line class-methods-use-this
  @action
  initTeamInfo() {
    throw new Error('Override')
  }


  @action
  buildChannels(users) {
    this.channels = []

    this.buildUsersChannelModel(users)
  }

  addChannels(users) {
    this.buildUsersChannelModel(users)
  }

  buildUsersChannelModel(users) {
    users.forEach((channel) => {
      if (channel) {
        this.channels.push(new ChannelModel(this, channel))
      }
    })
  }

  @action
  setName(name) {
    this.name = name
  }

  @action
  setChannelFollowed(channelName) {
    const followedChannel = this.channels.find((channel) => channel.info.name === channelName)

    followedChannel.followed = true
  }

  /**
   * Sets the passed in team in the backend
   *
   * @param {string} selected_team
   * @memberof TwitchTeamModel
   */
  // eslint-disable-next-line class-methods-use-this
  @action
  setTeam() {
    throw new Error('Override')
  }
}
