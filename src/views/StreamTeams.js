import { head, isNil, mergeRight, prop, T } from 'ramda'
import React, { useEffect, useState } from 'react'
import { ChannelTeamQuery } from 'services/graphql'
import { requestTeamInfo } from 'services/TwitchAPI'
import { useQuery } from 'urql'
import {
  applyCustomTeamSpec,
  applyTwitchTeamSpec,
  fetchCustomMembersInfo,
  fetchTwitchTeamMemberInfo,
} from 'utils'

import ChannelList from '../components/ChannelList'
import { ErrorState } from '../components/ErrorState'
import Loader from '../components/Loader'
import TeamHeader from '../components/TeamHeader'
import SadSpock from '../sad-spock.svg'

const buildCustomTeamDetails = (customTeam) => {
  const customTeamSpec = applyCustomTeamSpec(customTeam)
  return fetchCustomMembersInfo(customTeam.customTeamMembers)
    .then((data) => ({
      channels: data,
    }))
    .then(mergeRight(customTeamSpec))
}

const buildTwitchTeamDetails = async (twitchTeam) => {
  const teamSpec = await requestTeamInfo(twitchTeam)
    .then(prop('data'))
    .then(head)
    .then(applyTwitchTeamSpec)
    .catch(T)

  return fetchTwitchTeamMemberInfo(teamSpec.channels)
    .then((data) => ({
      channels: data,
    }))
    .then(mergeRight(teamSpec))
}

const StreamTeams = () => {
  const [result] = useQuery({
    query: ChannelTeamQuery,
  })
  const [teamInfo, setTeamInfo] = useState()

  const { data, fetching, error } = result

  useEffect(() => {
    if (!fetching) {
      const {
        channel: { streamTeam },
      } = data

      if (streamTeam.customActive) {
        buildCustomTeamDetails(streamTeam.customTeam).then(setTeamInfo).catch(T)
      } else {
        buildTwitchTeamDetails(streamTeam.twitchTeam).then(setTeamInfo).catch(T)
      }
    }
  }, [data, fetching])

  if (fetching || isNil(teamInfo)) {
    return <Loader color="white" />
  }

  if (error) {
    return <ErrorState SadSpock={SadSpock} />
  }

  return (
    <>
      <TeamHeader team={teamInfo} />
      <ChannelList team={teamInfo} />
    </>
  )
}

export default StreamTeams
