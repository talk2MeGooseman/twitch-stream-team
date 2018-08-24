import {observable} from 'mobx';

export default class ChannelModel {
  store;
  id;
  @observable info;
  @observable isLive = false;
  @observable followed = false;

  constructor(store, channel) {
    this.store = store;
    this.id = channel._id;
    this.info = channel;
  }

  destroy() {
    // this.store.channel.remove(this);
  }

  toJSON() {
    return {
      id: this.id,
    };
  }
}