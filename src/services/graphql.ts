import { gql } from '@apollo/client'

export const ChannelTeamQuery = gql`
  query getChannelStreamTeam {
    channel {
      id
      streamTeam {
        id
        customActive
        customTeam {
          id
          teamMembers {
            channelId
          }
          name
        }
        twitchTeam
      }
    }
  }
`

export const CustomTeamMutation = gql`
  mutation CustomTeamMutation($memberIds: [String]!, $name: String!) {
    upsertCustomStreamTeam(memberIds: $memberIds, name: $name) {
      id
      twitchTeam
      customActive
      customTeam {
        id
        name
        teamMembers {
          channelId
        }
      }
    }
  }
`

export const TwitchTeamMutation = gql`
  mutation UpsertTwitchTeam($teamName: String!) {
    upsertTwitchTeam(teamName: $teamName) {
      id
      twitchTeam
      customActive
      customTeam {
        id
        name
        teamMembers {
          channelId
        }
      }
    }
  }
`

export const ActivateCustomTeamMutation = gql`
  mutation ActivateCustomStreamTeam($activate: Boolean!) {
    activateCustomStreamTeam(activate: $activate) {
      id
      twitchTeam
      customActive
      customTeam {
        id
        name
        teamMembers {
          channelId
        }
      }
    }
  }
`
