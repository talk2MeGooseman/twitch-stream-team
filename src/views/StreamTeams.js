import { useTeamInfoFetcher } from 'hooks/useTeamInfoFetcher'
import { isNil } from 'ramda'
import React from 'react'

import ChannelList from '../components/ChannelList'
import { ErrorState } from '../components/ErrorState'
import Loader from '../components/Loader'
import TeamHeader from '../components/TeamHeader'
import SadSpock from '../sad-spock.svg'

const StreamTeams = () => {
  const { teamInfo, fetching, error } = useTeamInfoFetcher()

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
