import {observable} from 'mobx';

export default class ChannelModel {
  store;
  id;
  @observable info;

  constructor(store, channel) {
    this.store = store;
    this.info = channel;
  }

  static fromJS(store, {id, title, textColor, bgColor, body}) {
    return new ChannelModel(store, id, title, textColor, bgColor, body);
  }

  canDestroy() {
    return this.store.channel.length > 1;
  }

  destroy() {
    this.store.channel.remove(this);
  }

  toJSON() {
    return {
      id: this.id,
    };
  }
}