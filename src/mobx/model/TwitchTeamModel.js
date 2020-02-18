import {
  observable,
  action,
} from "mobx"
import ChannelModel from "../model/ChannelModel";
import BaseTeamModel from "./BaseTeamModel";
import {
  setPanelInformation,
} from "../../services/Ebs";
import {
  LOAD_PENDING, SAVE_PENDING, SAVE_DONE, SAVE_ERROR, TWITCH_TEAM_TYPE, LOAD_DONE
} from "../../services/constants";
import { requestTeamInfo } from "../../services/TwitchAPI";

// Bit 1 - Lurking_kat

export default class TwitchTeamModel extends BaseTeamModel {
  @observable teams;

  /**
   * Creates an instance of TwitchTeamModel.
   * @param {*} parentStore - Mobx Store
   * @param {string} selectedTeam Name of Twitch Team
   * @memberof TwitchTeamModel
   */
  constructor(parentStore, selectedTeam) {
    super(parentStore)
    if (selectedTeam && selectedTeam.name) {
      this.name = selectedTeam.name;
    } else {
      this.name = selectedTeam;
    }
  }

  /**
   * Initializes team information from Twitch Team API
   * Endpoint
   *
   * @returns void
   * @memberof TwitchTeamModel
   */
  @action
  async initTeamInfo() {
    if (!this.name) {
      return;
    }

    const data = await requestTeamInfo(this.name);
    this.buildChannels(data.users);

    this.info = data.info;
    this.display_name = data.display_name;
    this.logo = data.logo;
    this.banner = data.banner;
    this.id = data.id;
  }

  /**
   * Sets the passed in team in the backend
   *
   * @param {string} selected_team
   * @memberof TwitchTeamModel
   */
  @action
  setTeam(selected_team) {
    this.parentStore.saveState = SAVE_PENDING;
    return setPanelInformation(this.parentStore.token, { selected_team }).then(
      // inline created action
      action("fetchSuccess", result => {
        this.name = result.selectedTeam;
        this.initTeamInfo();
        this.parentStore.teamType = TWITCH_TEAM_TYPE;
        this.parentStore.saveState = SAVE_DONE;
        this.parentStore.team = this;
        this.parentStore.fetchLiveChannels();
      }),
      // inline created action
      action("fetchError", error => {
        this.saveState = SAVE_ERROR;
      })
    )
  }
}
