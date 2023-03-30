import { QueryResult, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useAsync } from 'react-use'
import type { Theme } from 'react-uwp'
import Separator from 'react-uwp/Separator'
import Tabs, { Tab } from 'react-uwp/Tabs'
import { CUSTOM_TEAM_PANEL_ACTIVE, TWITCH_TEAM_PANEL_ACTIVE } from 'services/constants'
import { ChannelTeamQuery } from 'services/graphql'
import { requestChannelTeams } from 'services/TwitchAPI'
import { getStreamTeamProp, hasTwitchTeam } from 'utils'

import { AuthContext } from '../utils/AuthContext'
import CustomTeamFlow from './CustomTeamFlow'
import Loader from './Loader'
import TwitchTeamFlow from './TwitchTeamFlow'

type ConfigInfoProps = Record<string, never>;

const ConfigInfo = (_props: ConfigInfoProps, { theme }: { theme: Theme }) => {
  let focusTabIndex = TWITCH_TEAM_PANEL_ACTIVE

  const authInfo = useContext(AuthContext)
  const { data, loading: fetching } : QueryResult<RootQueryType> = useQuery(ChannelTeamQuery)

  const { loading, value: twitchTeams } = useAsync(async () => {
    if(!authInfo?.helixToken || !authInfo?.channelId) return []

    const response = await requestChannelTeams(authInfo?.helixToken, authInfo.channelId)
    return response?.data
  }, [authInfo?.helixToken, authInfo?.channelId])

  if (fetching || loading) return <Loader />

  const streamTeam = getStreamTeamProp(data)
  console.log({ twitchTeams, streamTeam })
  if (!hasTwitchTeam(twitchTeams) || streamTeam?.customActive) {
    focusTabIndex = CUSTOM_TEAM_PANEL_ACTIVE
  }

  return (
    <div style={{ marginLeft: '30px' }}>
      <h1 style={theme.typographyStyles.header}>Stream Team</h1>
      <Separator />
      <div
        style={{
          marginTop: '5px',
          marginBottom: '5px',
          ...theme.typographyStyles.subTitle,
        }}
      >
        Select if you want to show case your Twitch Team or build a custom team
        with all your favorite streamers
      </div>
      <Tabs defaultFocusTabIndex={focusTabIndex}>
        <Tab title="Twitch Team Selection">
          <TwitchTeamFlow twitchTeams={twitchTeams || []} streamTeam={streamTeam} />
        </Tab>

        <Tab title="Custom Team Builder">
          <CustomTeamFlow streamTeam={streamTeam} />
        </Tab>
      </Tabs>
    </div>
  )
}

ConfigInfo.contextTypes = { theme: PropTypes.object }

export default ConfigInfo
