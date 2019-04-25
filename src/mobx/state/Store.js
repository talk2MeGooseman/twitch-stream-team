import {
  observable,
  action,
} from "mobx"
import {
  getPanelInformation,
  configGetPanelInformation,
} from "../../services/Ebs";
import {
  LOAD_DONE, LOAD_ERROR, LOAD_PENDING, CUSTOM_TEAM_TYPE
} from "../../services/constants";
import TwitchTeamModel from "../model/TwitchTeamModel";
import CustomTeamModel from "../model/CustomTeamModel";
import { getLiveChannels } from "../../services/TwitchAPI";

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
        this.twitchTeam = new TwitchTeamModel(this, teams, selectedTeam);
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
        let { customTeam, selectedTeam, teamType, teams } = result;

        this.teamType = teamType;
        this.twitchTeam = new TwitchTeamModel(this, teams, selectedTeam);
        this.customTeam = new CustomTeamModel(this, customTeam);

        this.loadingState = LOAD_DONE;

        // Fetch the live channels
        this.fetchLiveChannels();
        setInterval(this.fetchLiveChannels, 1000 * 60 * 5);
      }),
      // inline created action
      action("fetchError", error => {
        this.loadingState = LOAD_ERROR;
      })
    );
  }

  fetchLiveChannels = async () => {
    let liveChannels = [];
    let notLiveChannels = [];

    let team;
    if (this.teamType === CUSTOM_TEAM_TYPE) {
      team = this.customTeam;
    } else {
      team = this.twitchTeam;
    }

    let data;
    try {
      data = await getLiveChannels(team.channels)
    } catch (error) {
      return;
    }

    if(!data) {
      return;
    }

    team.channels.forEach(channel => {
      let foundChannel = data.find((liveChannel) => { return liveChannel.user_id === channel.id });
      if (foundChannel)
      {
        channel.isLive = true;
        channel.info.status = foundChannel.title;
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
