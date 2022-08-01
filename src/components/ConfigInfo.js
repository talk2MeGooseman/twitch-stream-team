import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useAsync } from 'react-use'
import Separator from 'react-uwp/Separator'
import Tabs, { Tab } from 'react-uwp/Tabs'
import { CUSTOM_TEAM_PANEL_ACTIVE, TWITCH_TEAM_PANEL_ACTIVE } from 'services/constants'
import { ChannelTeamQuery } from 'services/graphql'
import { requestChannelTeams } from 'services/TwitchAPI'
import { getStreamTeamProp, hasTwitchTeam } from 'utils'

import { AuthContext } from './AuthWrapper'
import CustomTeamFlow from './CustomTeamFlow'
import Loader from './Loader'
import TwitchTeamFlow from './TwitchTeamFlow'

const ConfigInfo = (props, { theme }) => {
  let focusTabIndex = TWITCH_TEAM_PANEL_ACTIVE

  const authInfo = useContext(AuthContext)
  const { data, loading: fetching } = useQuery(ChannelTeamQuery)

  const { loading, value: twitchTeams } = useAsync(async () => {
    const response = await requestChannelTeams(authInfo.channelId)
    return response.data
  }, [authInfo.channelId])

  if (fetching || loading) return <Loader />

  const streamTeam = getStreamTeamProp(data)

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
          <TwitchTeamFlow twitchTeams={twitchTeams} streamTeam={streamTeam} />
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
