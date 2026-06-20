interface TwitchAuthData {
  channelId: string
  clientId: string
  token: string
  helixToken: string
  userId: string
}

interface TwitchExtActions {
  followChannel(channelName: string): void
  onFollow(callback: (didFollow: boolean, channelName: string) => void): void
}

interface TwitchExt {
  onAuthorized(callback: (auth: TwitchAuthData) => void): void
  actions: TwitchExtActions
}

interface Window {
  Twitch: { ext: TwitchExt }
}
