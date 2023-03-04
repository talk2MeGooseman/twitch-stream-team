type Maybe<T> = T | null
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
  __typename?: "CustomTeam"
  id?: Maybe<Scalars["ID"]>
  name?: Maybe<Scalars["String"]>
  teamMembers?: Maybe<Array<Maybe<CustomTeamMember>>>
}

type CustomTeamMember = {
  __typename?: "CustomTeamMember"
  channelId?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["ID"]>
}

type RootMutationType = {
  __typename?: "RootMutationType"
  /** Set is custom team is active */
  activateCustomStreamTeam?: Maybe<StreamTeam>
  /** Upsert custom team */
  upsertCustomStreamTeam?: Maybe<StreamTeam>
  /** Select twitch team */
  upsertTwitchTeam?: Maybe<StreamTeam>
}

type RootMutationTypeActivateCustomStreamTeamArgs = {
  activate: Scalars["Boolean"]
}

type RootMutationTypeUpsertCustomStreamTeamArgs = {
  memberIds: Array<Maybe<Scalars["String"]>>
  name: Scalars["String"]
}

type RootMutationTypeUpsertTwitchTeamArgs = {
  teamName: Scalars["String"]
}

type RootQueryType = {
  __typename?: "RootQueryType"
  channel?: Maybe<TwitchChannel>
}

type StreamTeam = {
  __typename?: "StreamTeam"
  customActive?: Maybe<Scalars["Boolean"]>
  customTeam?: Maybe<CustomTeam>
  id?: Maybe<Scalars["ID"]>
  twitchTeam?: Maybe<Scalars["String"]>
}

type TeamMember = {
  __typename?: "TeamMember"
  userId?: Maybe<Scalars["String"]>
  userLogin?: Maybe<Scalars["String"]>
  userName?: Maybe<Scalars["String"]>
}

type TwitchChannel = {
  __typename?: "TwitchChannel"
  channelId?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["ID"]>
  streamTeam?: Maybe<StreamTeam>
}


interface TwitchTeam {
  team_name: string;
}

type TwitchTeams = TwitchTeam[] | undefined;

type CurrentTeam = string;
