import { useQuery } from '@apollo/client'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CUSTOM_TEAM_PANEL_ACTIVE, TWITCH_TEAM_PANEL_ACTIVE } from 'services/constants'
import { ChannelTeamQuery } from 'services/graphql'
import { requestChannelTeams } from 'services/TwitchAPI'
import { getStreamTeamProp, hasTwitchTeam } from 'utils'

import { AuthContext } from '../utils/AuthContext'
import CustomTeamFlow from './CustomTeamFlow'
import Loader from './Loader'
import TwitchTeamFlow from './TwitchTeamFlow'

const ConfigInfo = () => {
  const authInfo = useContext(AuthContext)
  const { data, loading: fetching } = useQuery<RootQueryType>(ChannelTeamQuery)
  const [twitchTeams, setTwitchTeams] = useState<HelixChannelTeam[] | undefined>()
  const [loadingTeams, setLoadingTeams] = useState(true)
  const [selectedTab, setSelectedTab] = useState<number | null>(null)

  useEffect(() => {
    let active = true

    if (!authInfo?.helixToken || !authInfo?.channelId) {
      setTwitchTeams([])
      setLoadingTeams(false)
      return undefined
    }

    setLoadingTeams(true)
    requestChannelTeams(authInfo.helixToken, authInfo.channelId).then((response) => {
      if (active) {
        setTwitchTeams(response?.data)
        setLoadingTeams(false)
      }
    })

    return () => {
      active = false
    }
  }, [authInfo?.helixToken, authInfo?.channelId])

  if (fetching || loadingTeams) return <Loader />

  const streamTeam = getStreamTeamProp(data)
  const defaultTab =
    !hasTwitchTeam(twitchTeams) || streamTeam?.customActive
      ? CUSTOM_TEAM_PANEL_ACTIVE
      : TWITCH_TEAM_PANEL_ACTIVE
  const currentTab = selectedTab ?? defaultTab

  return (
    <Box sx={{ p: 3, maxWidth: 520 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Stream Team
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Showcase your Twitch Team or build a custom team with all your favorite streamers.
      </Typography>
      <Tabs
        value={currentTab}
        onChange={(_event, value: number) => setSelectedTab(value)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab label="Twitch Team" />
        <Tab label="Custom Team" />
      </Tabs>
      {currentTab === TWITCH_TEAM_PANEL_ACTIVE && (
        <TwitchTeamFlow twitchTeams={twitchTeams || []} streamTeam={streamTeam} />
      )}
      {currentTab === CUSTOM_TEAM_PANEL_ACTIVE && <CustomTeamFlow streamTeam={streamTeam} />}
    </Box>
  )
}

export default ConfigInfo
