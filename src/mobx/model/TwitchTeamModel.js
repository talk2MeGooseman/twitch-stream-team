import {
  observable,
  action,
} from "mobx"
import ChannelModel from "../model/ChannelModel";
import {
  setPanelInformation,
} from "../../services/Ebs";
import {
  LOAD_PENDING, SAVE_PENDING, SAVE_DONE, SAVE_ERROR
} from "../../services/constants";

export default class TwitchTeamModel {
  @observable channels;
  @observable loadingState = LOAD_PENDING;
  @observable saveState;
  @observable name;
  @observable info;
  @observable display_name;
  @observable logo;
  @observable banner;
  @observable teams;

  constructor(parentStore, selectedTeamData, teams) {
    this.teams = teams;

    if (!selectedTeamData) {
      return;
    }
    this.parentStore = parentStore;
    this.name = selectedTeamData.name;
    this.display_name = selectedTeamData.display_name;
    this.logo = selectedTeamData.logo;
    this.banner = selectedTeamData.banner;

    this.channels = selectedTeamData.users.map((channel) => {
      return new ChannelModel(this, channel);
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

  @action
  setTeam(selected_team) {
    this.saveState = SAVE_PENDING;
    setPanelInformation(this.parentStore.token, { selected_team }).then(
      // inline created action
      action("fetchSuccess", result => {
        let selectedTeam = result.selectedTeam;

        this.channel = selectedTeam.channel;
        this.name = selectedTeam.name;
        this.info = selectedTeam.info;
        this.display_name = selectedTeam.display_name;
        this.logo = selectedTeam.logo;
        this.banner= selectedTeam.banner;
        this.background = selectedTeam.background
        this.parentStore.teamType = result.team_type;

        this.channels = selectedTeam.users.map((channel) => {
          return new ChannelModel(this, channel);
        });

        this.saveState = SAVE_DONE;
      }),
      // inline created action
      action("fetchError", error => {
        this.saveState = SAVE_ERROR;
      })
    ).then(async () => {
      this.parentStore.fetchLiveChannels();
    });
  }
}