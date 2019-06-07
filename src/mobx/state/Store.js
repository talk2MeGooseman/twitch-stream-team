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
import BaseTeamModel from "../model/BaseTeamModel";
import { requestLiveChannels } from "../../services/TwitchAPI";

export default class Store {
  /** @type {string} */
  @observable token;
  /** @type {LOAD_DONE|LOAD_ERROR|LOAD_PENDING} */
  @observable loadingState = LOAD_PENDING;
  /** @type {'twitch'|CUSTOM_TEAM_TYPE} */
  @observable teamType;
  /** @type {TwitchTeamModel} */
  @observable twitchTeam;
  /** @type {CustomTeamModel} */
  @observable customTeam;
  /** @type {BaseTeamModel} */
  @observable team;

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

        this.twitchTeam = new TwitchTeamModel(this, selectedTeam);
        this.twitchTeam.teams = teams;

        this.customTeam = new CustomTeamModel(this, customTeam);

        if (this.teamType === CUSTOM_TEAM_TYPE)
        {
          this.team = this.customTeam;
        }
        else
        {
          this.team = this.twitchTeam;
        }

        this.twitchTeam.initTeamInfo().then(() => {
          // Fetch the live channels
          this.customTeam.initTeamInfo().then(() => {
            this.loadingState = LOAD_DONE;
            this.fetchLiveChannels();
          })
        })

      }),
      // inline created action
      action("fetchError", error => {
        this.twitchTeam = new TwitchTeamModel(this);
        this.customTeam = new CustomTeamModel(this);
        this.twitchTeam.loadingState = LOAD_ERROR;
        this.customTeam.loadingState = LOAD_ERROR;
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
        if (this.teamType === CUSTOM_TEAM_TYPE)
        {
          this.team = new CustomTeamModel(this, selectedTeam);
        }
        else
        {
          this.team = new TwitchTeamModel(this, selectedTeam);
        }

        this.team.initTeamInfo().then(() => {
          this.fetchLiveChannels();
          setInterval(this.fetchLiveChannels, 1000 * 60 * 5);
          this.loadingState = LOAD_DONE;
        })
      }),
      // inline created action
      action("fetchError", error => {
        this.loadingState = LOAD_ERROR;
      })
    );
  }

  setChannelFollowed(channelName) {
    let team = this.selectedTeam();
    team.setChannelFollowed(channelName);
  }

  fetchLiveChannels = async () => {
    let team = this.selectedTeam();
    let liveChannels = [];
    let notLiveChannels = [];

    if (team.channels.length === 0) {
      return;
    }

    let data;
    try {
      data = await requestLiveChannels(team.channels);
      console.log(data)
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

  selectedTeam() {
    return this.team;
  }
}
