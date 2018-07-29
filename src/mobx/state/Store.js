import {
  observable,
  computed,
  action,
} from "mobx"
import ChannelModel from "../model/ChannelModel";
import { uuid } from "../../services/Utils";
import {
  setPanelInformation,
  getPanelInformation
} from "../../services/Ebs";
import {
  LOAD_DONE, LOAD_ERROR, LOAD_PENDING, SAVE_PENDING, SAVE_DONE, SAVE_ERROR
} from "../../services/constants";

export default class Store {
  @observable token;
  @observable channels;
  @observable loadingState = LOAD_PENDING;
  @observable saveState;
  @observable name;
  @observable info;
  @observable display_name;
  @observable logo;
  @observable banner;
  @observable background;
  @observable teams;

  addChannel() {
    this.saveState = '';

    this.channels.push(ChannelModel.fromJS(this, {
      id: uuid(),
    }));
  }

  @action
  fetchTeam() {
    this.loadingState = LOAD_PENDING;
    getPanelInformation(this.token).then(
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
        this.teams = result.teams;

        this.channels = selectedTeam.users.map((channel) => {
          return new ChannelModel(this, channel);
        });

        this.loadingState = LOAD_DONE;
      }),
      // inline created action
      action("fetchError", error => {
        this.loadingState = LOAD_ERROR;
      })
    )
  }

  @action
  setTeam(selected_team) {
    this.saveState = SAVE_PENDING;
    setPanelInformation(this.token, { selected_team }).then(
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
        this.teams = result.teams;

        this.channels = selectedTeam.users.map((channel) => {
          return new ChannelModel(this, channel);
        });

        this.saveState = SAVE_DONE;
      }),
      // inline created action
      action("fetchError", error => {
        this.saveState = SAVE_ERROR;
      })
    );
  }
}
