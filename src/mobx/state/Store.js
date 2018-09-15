import {
  observable,
  action,
} from "mobx"
import {
  getPanelInformation,
  getLiveChannels,
  configGetPanelInformation,
} from "../../services/Ebs";
import {
  LOAD_DONE, LOAD_ERROR, LOAD_PENDING, CUSTOM_TEAM_TYPE
} from "../../services/constants";
import TwitchTeamModel from "../model/TwitchTeamModel";
import CustomTeamModel from "../model/CustomTeamModel";

export default class Store {
  @observable token;
  @observable loadingState = LOAD_PENDING;
  @observable teamType;
  @observable twitchTeam = {};
  @observable customTeam = {};

  toJSON = () => {
    return {
      selected_team: this.selected_team,
      customName: this.customName,
      customChannels: this.customChannels,
    };
  }

  @action
  fetchConfig() {
    this.loadingState = LOAD_PENDING;
    configGetPanelInformation(this.token).then(
      // inline created action
      action("fetchSuccess", result => {
        let { customTeam, selectedTeam, teamType, teams } = result;

        this.teamType = teamType;
        this.twitchTeam = new TwitchTeamModel(this, selectedTeam, teams);
        this.customTeam = new CustomTeamModel(this, customTeam);

        this.loadingState = LOAD_DONE;

        // Fetch the live channels
        this.fetchLiveChannels();
      }),
      // inline created action
      action("fetchError", error => {
        this.twitchTeam = new TwitchTeamModel(this);
        this.customTeam = new CustomTeamModel(this);
        this.loadingState = LOAD_ERROR;
      })
    );
  }

  @action
  fetchTeam() {
    this.loadingState = LOAD_PENDING;
    getPanelInformation(this.token).then(
      // inline created action
      action("fetchSuccess", result => {
        let { selectedTeam, teamType } = result;

        this.teamType = teamType;
        if (this.teamType === CUSTOM_TEAM_TYPE) {
          this.customTeam = new CustomTeamModel(this, selectedTeam);
        } else {
          this.twitchTeam = new TwitchTeamModel(this, selectedTeam);
        }

        this.loadingState = LOAD_DONE;

        // Fetch the live channels for inital render, this will get updated by a pubsub message
        this.fetchLiveChannels();
      }),
      // inline created action
      action("fetchError", error => {
        this.loadingState = LOAD_ERROR;
      })
    );
  }

  fetchLiveChannels = async () => {
    let { data } = await getLiveChannels(this.token);
    this.updateLiveChannels(data);
  }

  updateLiveChannels = (liveChannelIds) => {
    let liveChannels = [];
    let notLiveChannels = [];

    let team;
    if (this.teamType === CUSTOM_TEAM_TYPE) {
      team = this.customTeam;
    } else {
      team = this.twitchTeam;
    }

    team.channels.forEach(channel => {
      let foundChannel = liveChannelIds.find((id) => { return id === channel.id });
      if (foundChannel)
      {
        channel.isLive = true;
        liveChannels.push(channel);
      } else
      {
        channel.isLive = false;
        notLiveChannels.push(channel);
      }
    });

    // Set new channel order with live channels at the top
    team.channels = liveChannels.concat(notLiveChannels);
  }
}
