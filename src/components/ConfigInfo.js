import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import React, { useContext } from 'react'
import { useAsync } from 'react-use'
import Separator from 'react-uwp/Separator'
import Tabs, { Tab } from 'react-uwp/Tabs'
import { ChannelTeamQuery } from 'services/graphql'
import { requestChannelTeams } from 'services/TwitchAPI'
import { useQuery } from 'urql'

import { AuthContext } from './AuthWrapper'
import CustomTeamFlow from './CustomTeamFlow'
import Loader from './Loader'
import TwitchTeamFlow from './TwitchTeamFlow'

const ConfigInfo = (props, { theme }) => {
  let focusTabIndex = 0

  const authInfo = useContext(AuthContext)
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: ChannelTeamQuery,
  })

  const { loading, value: twitchTeams } = useAsync(async () => {
    const response = await requestChannelTeams(authInfo.channelId)
    return response.data
  }, [])

  if (fetching || loading) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  const {
    channel: { streamTeam },
  } = data

  // Check if we need to switch to custom team tab
  if (isEmpty(twitchTeams) || streamTeam.customActive) {
    focusTabIndex = 1
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
