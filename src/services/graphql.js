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
