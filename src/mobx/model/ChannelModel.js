import {observable} from 'mobx';

export default class ChannelModel {
  store;
  id;
  @observable info;
  @observable isLive = false;
  @observable followed = false;

  constructor(store, channel) {
    this.store = store;
    this.id = channel._id || channel.id;
    this.info = channel;
  }

  get name() {
    return this.info.display_name;
  }

  get description() {
    return this.info.status || this.info.bio || this.info.description;
  }

  destroy() {
    // this.store.channel.remove(this);
  }


  get profile_image() {
    return this.info.profile_image_url || this.info.logo;
  }

  toJSON() {
    return {
      id: this.id,
    };
  }
}
