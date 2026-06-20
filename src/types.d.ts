/* eslint-disable @typescript-eslint/no-unused-vars */
type Maybe<T> = T | null | undefined
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

type CustomTeam = {
  __typename: 'CustomTeam'
  id: Maybe<Scalars['ID']>
  name: Maybe<Scalars['String']>
  teamMembers: Maybe<CustomTeamMember[]>
}

type CustomTeamMember = {
  __typename?: 'CustomTeamMember'
  channelId: Scalars['String']
  id: Scalars['ID']
}

type RootMutationType = {
  __typename?: 'RootMutationType'
  /** Set is custom team is active */
  activateCustomStreamTeam?: Maybe<StreamTeam>
  /** Upsert custom team */
  upsertCustomStreamTeam?: Maybe<StreamTeam>
  /** Select twitch team */
  upsertTwitchTeam?: Maybe<StreamTeam>
}

type RootMutationTypeActivateCustomStreamTeamArgs = {
  activate: Scalars['Boolean']
}

type RootMutationTypeUpsertCustomStreamTeamArgs = {
  memberIds: Array<Maybe<Scalars['String']>>
  name: Scalars['String']
}

type RootMutationTypeUpsertTwitchTeamArgs = {
  teamName: Scalars['String']
}

type RootQueryType = {
  __typename?: 'RootQueryType'
  channel?: Maybe<TwitchChannel>
}

type StreamTeam = {
  __typename: 'StreamTeam'
  customActive: Maybe<Scalars['Boolean']>
  customTeam: Maybe<CustomTeam>
  id: Maybe<Scalars['ID']>
  twitchTeam: Maybe<Scalars['String']>
}

type TeamMember = {
  __typename: 'TeamMember'
  userId: Maybe<Scalars['String']>
  userLogin: Maybe<Scalars['String']>
  userName: Maybe<Scalars['String']>
}

type TwitchChannel = {
  __typename: 'TwitchChannel'
  channelId: Maybe<Scalars['String']>
  id: Maybe<Scalars['ID']>
  streamTeam: Maybe<StreamTeam>
}

type HelixTeamUser = {
  user_id: Scalars['String']
  user_login: Scalars['String']
  user_name: Scalars['String']
}

type HelixTeam = {
  users: HelixTeamUser[],
  background_image_url: Scalars['String']
  banner: Scalars['String']
  created_at: Scalars['String']
  updated_at: Scalars['String']
  info: Scalars['String']
  thumbnail_url: Scalars['String']
  team_name: Scalars['String']
  team_display_name: Scalars['String']
  id: Scalars['String']
}

type HelixChannelTeam = {
  broadcaster_id: Scalars['String']
  broadcaster_login: Scalars['String']
  broadcaster_name: Scalars['String']
  background_image_url: Scalars['String']
  banner: Scalars['String']
  created_at: Scalars['String']
  updated_at: Scalars['String']
  info: Scalars['String']
  thumbnail_url: Scalars['String']
  team_name: Scalars['String']
  team_display_name: Scalars['String']
  id: Scalars['String']
}

type HelixChannelTeams = {
  data: HelixChannelTeam[]
}

type HelixStream = {
  id: Scalars['String']
  user_id: Scalars['String']
  user_login: Scalars['String']
  user_name: Scalars['String']
  game_id: Scalars['String']
  game_name: Scalars['String']
  type: Scalars['String']
  title: Scalars['String']
  tags: Scalars['String'][]
  viewer_count: Scalars['Int']
  started_at: Scalars['String']
  language: Scalars['String']
  thumbnail_url: Scalars['String']
  tag_ids: Scalars['String'][]
  is_mature: Scalars['Boolean']
}

interface HelixUser {
  id: Scalars['String']
  login: Scalars['String']
  display_name: Scalars['String']
  type: Scalars['String']
  broadcaster_type: Scalars['String']
  description: Scalars['String']
  profile_image_url: Scalars['String']
  offline_image_url: Scalars['String']
  email: Scalars['String']
  created_at: Scalars['String']
}

interface TwitchTeam {
  team_name: string;
}

interface TwitchTeamUser {
  user_id: string
  user_login: string
  user_name: string
}


interface TeamSpecType {
  name: string
  banner: Maybe<string>
  logo: Maybe<string>
  url_name: Maybe<string>
  channels: TeamMemberSpecType[]
}

interface TeamMemberSpecType {
  id: string
  name: string
  profileImage: string
  description: string
  isLive: boolean
}

interface AuthContextType {
  channelId: string
  helixToken: string
}
