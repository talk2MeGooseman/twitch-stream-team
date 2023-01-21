import { useTeamInfoFetcher } from 'hooks/useTeamInfoFetcher'
import { isNil } from 'ramda'
import React from 'react'

import ChannelList from '../components/ChannelList'
import { ErrorState } from '../components/ErrorState'
import Loader from '../components/Loader'
import TeamHeader from '../components/TeamHeader'
import SadSpock from '../sad-spock.svg'

const StreamTeams = () => {
  const { teamInfo, loading, error } = useTeamInfoFetcher()

  if (loading) {
    return <Loader color="white" />
  }

  if (error) {
    return <ErrorState SadSpock={SadSpock} />
  }

  if (isNil(teamInfo)) {
    return <h1>No team found, please setup your team in the extension configuration panel.</h1>
  }

  return (
    <>
      <TeamHeader team={teamInfo} />
      <ChannelList team={teamInfo} />
    </>
  )
}

export default StreamTeams
