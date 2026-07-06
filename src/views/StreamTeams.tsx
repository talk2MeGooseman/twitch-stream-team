import { Typography } from '@mui/material'
import { useTeamInfoFetcher } from 'hooks/useTeamInfoFetcher'
import { isNil } from 'ramda'
import React from 'react'

import ChannelList from '../components/ChannelList'
import { ErrorState } from '../components/ErrorState'
import Loader from '../components/Loader'
import TeamHeader from '../components/TeamHeader'
import sadSpockSrc from '../sad-spock.svg'

const StreamTeams = () => {
  const { teamInfo, loading, error } = useTeamInfoFetcher()

  if (loading) {
    return <Loader color="white" />
  }

  if (error) {
    return <ErrorState sadSpockSrc={sadSpockSrc} />
  }

  if (isNil(teamInfo)) {
    return (
      <Typography variant="h5" component="h1">
        No team found, please set up your team in the extension configuration panel.
      </Typography>
    )
  }

  return (
    <>
      <TeamHeader team={teamInfo} />
      <ChannelList team={teamInfo} />
    </>
  )
}

export default StreamTeams
