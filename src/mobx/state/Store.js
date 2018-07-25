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
  LOAD_DONE, LOAD_ERROR, LOAD_PENDING
} from "../../services/constants";

export default class Store {
  @observable token;
  @observable channels;
  @observable loadingState;
  @observable name;
  @observable info;
  @observable display_name;
  @observable logo;
  @observable banner;
  @observable background;

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
        this.channel = result.channel;
        this.name = result.name;
        this.info = result.info;
        this.display_name = result.display_name;
        this.logo = result.logo;
        this.banner= result.banner;
        this.background = result.background

        this.channels = result.users.map((channel) => {
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

  toJSON() {
    let jChannels = this.channels.map((channel) => {
      return channel.toJSON();
    });

    return {
      // tabs: jTabs,
    };
  }
}
