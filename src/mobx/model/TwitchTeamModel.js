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
  LOAD_PENDING, SAVE_PENDING, SAVE_DONE, SAVE_ERROR
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
    this.name = selectedTeam;
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
    return requestTeamInfo(this.name).then((data) => {
      this.buildChannels(data.users);

      this.info = data.info;
      this.display_name = data.display_name;
      this.logo = data.logo;
      this.banner = data.banner;
      this.id = data.id;

      this.loadingState = SAVE_DONE;
    })
  }

  /**
   * Sets the passed in team in the backend
   *
   * @param {string} selected_team
   * @memberof TwitchTeamModel
   */
  @action
  setTeam(selected_team) {
    this.saveState = SAVE_PENDING;
    return setPanelInformation(this.parentStore.token, { selected_team }).then(
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
    )
  }
}
