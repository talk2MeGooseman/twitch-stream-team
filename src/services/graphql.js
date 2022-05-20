import { gql } from '@urql/core'

export const ChannelTeamQuery = gql`
  query getChannelStreamTeam {
    channel {
      streamTeam {
        customActive
        customTeam {
          customTeamMembers {
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
        customTeamMembers {
          channelId
        }
      }
    }
  }
`
