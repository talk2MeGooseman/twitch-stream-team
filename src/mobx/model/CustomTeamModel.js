import {
  observable,
  action,
} from "mobx"
import ChannelModel from "../model/ChannelModel";
import {
  setCustomTeamInformation
} from "../../services/Ebs";
import {
  LOAD_PENDING, SAVE_PENDING, SAVE_DONE, SAVE_ERROR, CUSTOM_TEAM_TYPE
} from "../../services/constants";

export default class CustomTeamModel {
  @observable channels;
  @observable selectedChannels = [];
  @observable loadingState = LOAD_PENDING;
  @observable saveState;
  @observable name;
  @observable info;
  @observable display_name;
  @observable logo;
  @observable banner;

  constructor(parentStore, data) {
    this.parentStore = parentStore;
    if (data) {
      this.setData(data);
    }
  }

  setData(data) {
    this.channel = data.channel;
    this.name = data.name;
    this.customName = data.name;
    this.display_name = data.display_name;
    this.logo = data.logo;
    this.banner = data.banner;

    this.selectedChannels = [];
    this.channels = data.users.map((channel) => {
      this.selectedChannels.push(channel.name);
      return new ChannelModel(this, channel);
    });
  } 

  @action
  addChannel(channelName) {
    // Add to selectedChannels array and potentially do some validation checks
    this.selectedChannels.push(channelName);
  }

  @action
  removeChannel(channelName) {
    let index = this.selectedChannels.indexOf(channelName);
    this.selectedChannels.splice(index, 1);
  }

  @action
  setName(name) {
    this.name = name;
  }

  @action
  setLogo(text) {
    this.logo = text;
  }

  @action
  setBanner(text) {
    this.banner = text;
  }

  @action
  setChannelFollowed(channelName) {
    let followedChannel = this.channels.find((channel) => {
      return channel.info.name === channelName;
    });

    followedChannel.followed = true;
  }


  @action
  setTeam() {
    if (!this.name || !this.name.length || !this.selectedChannels || !this.selectedChannels.length) {
      this.saveState =SAVE_DONE;
      return;
    }

    this.saveState = SAVE_PENDING;
    setCustomTeamInformation(this.parentStore.token, this.toJSON()).then(// inline created action
      action("setTeamSuccess", result => {
        let {customTeam} = result;

        this.setData(customTeam);

        this.saveState = SAVE_DONE;
        this.parentStore.teamType = CUSTOM_TEAM_TYPE;
        this.parentStore.fetchLiveChannels();
      }), // inline created action
      action("setTeamError", error => {
        this.saveState = SAVE_ERROR;
      }));
  }

  toJSON() {
    return {
      customName: this.name,
      customChannels: this.selectedChannels,
      banner: this.banner,
      logo: this.logo,
    };
  }
}