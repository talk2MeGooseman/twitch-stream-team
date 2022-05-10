import { observable } from 'mobx'

export default class ChannelModel {
  store

  id

  @observable info

  @observable isLive = false

  @observable followed = false

  constructor(store, channel) {
    this.store = store
    this.id = channel.id || channel.user_id
    this.info = channel
  }

  get name() {
    return this.info.display_name || this.info.user_name
  }

  get description() {
    return this.info.status || this.info.bio || this.info.description
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {
    // this.store.channel.remove(this);
  }

  // eslint-disable-next-line babel/camelcase
  get profile_image() {
    return this.info.profile_image_url || this.info.logo
  }

  toJSON() {
    return {
      id: this.id,
    }
  }
}
