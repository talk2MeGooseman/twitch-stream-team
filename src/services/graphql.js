import { gql } from '@urql/core'

export const ChannelTeamQuery = gql`
  query getChannelStreamTeam {
    channel {
      streamTeam {
        customActive
        customTeam {
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
      customTeam {
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
      customActive
    }
  }
`
