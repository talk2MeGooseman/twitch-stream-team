import { useEffect, useState } from 'react'
import { ChannelTeamQuery } from 'services/graphql'
import { useQuery } from 'urql'
import { getStreamTeamProp } from 'utils'
import { buildCustomTeamDetails } from 'utils/buildCustomTeamDetails'
import { buildTwitchTeamDetails } from 'utils/buildTwitchTeamDetails'

export const useTeamInfoFetcher = () => {
  const [teamInfo, setTeamInfo] = useState()

  const [{ data, fetching, error }] = useQuery({
    query: ChannelTeamQuery,
  })

  useEffect(() => {
    if (!fetching) {
      const streamTeam = getStreamTeamProp(data)

      if (streamTeam.customActive) {
        buildCustomTeamDetails(streamTeam.customTeam).then(setTeamInfo)
      } else {
        buildTwitchTeamDetails(streamTeam.twitchTeam).then(setTeamInfo)
      }
    }
  }, [data, fetching])

  return { teamInfo, fetching, error }
}
