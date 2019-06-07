import {
  observable,
  action,
} from "mobx"
import ChannelModel from "../model/ChannelModel";
import {
  LOAD_PENDING, SAVE_PENDING, SAVE_DONE, SAVE_ERROR
} from "../../services/constants";

export default class BaseTeamModel {
  @observable channels = [];
  @observable loadingState = LOAD_PENDING;
  @observable saveState;
  @observable name;
  @observable info;
  @observable display_name;
  @observable logo;
  @observable banner;
  @observable id;

  constructor(parentStore) {
    this.parentStore = parentStore;
  }

  /**
   * Initializes team information from Twitch Team API
   * Endpoint
   *
   * @returns void
   * @memberof TwitchTeamModel
   */
  @action
  initTeamInfo() {
    console.error('Override');
  }

  @action
  buildChannels(users) {
    this.channels = [];

    users.forEach((channel) => {
      if (channel) {
        this.channels.push(new ChannelModel(this, channel));
      }
    });
  }

  addChannels(users) {
    users.forEach((channel) => {
      if (channel) {
        this.channels.push(new ChannelModel(this, channel));
      }
    });
  }

  @action
  setName(name) {
    this.name = name;
  }

  @action
  setChannelFollowed(channelName) {
    let followedChannel = this.channels.find((channel) => {
      return channel.info.name === channelName;
    });

    followedChannel.followed = true;
  }

  /**
   * Sets the passed in team in the backend
   *
   * @param {string} selected_team
   * @memberof TwitchTeamModel
   */
  @action
  setTeam() {
    console.error('Override')
  }
}

