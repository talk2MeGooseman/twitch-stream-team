import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import { ChannelTeamQuery } from 'services/graphql'
import { getStreamTeamProp } from 'utils'
import { buildCustomTeamDetails } from 'utils/buildCustomTeamDetails'
import { buildTwitchTeamDetails } from 'utils/buildTwitchTeamDetails'

export const useTeamInfoFetcher = () => {
  const [teamInfo, setTeamInfo] = useState()
  const [teamInfoLoading, toggleTeamInfoLoading] = useToggle(true)

  const { data, loading, error } = useQuery(ChannelTeamQuery)

  useEffect(() => {
    if (!loading) {
      const streamTeam = getStreamTeamProp(data)

      if (streamTeam.customActive) {
        buildCustomTeamDetails(streamTeam.customTeam).then(setTeamInfo).then(toggleTeamInfoLoading)
      } else {
        buildTwitchTeamDetails(streamTeam.twitchTeam).then(setTeamInfo).then(toggleTeamInfoLoading)
      }
    }
  }, [data, loading, toggleTeamInfoLoading])

  return { teamInfo, loading: teamInfoLoading, error }
}
