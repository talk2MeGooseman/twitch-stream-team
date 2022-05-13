import { AuthContext } from 'components/AuthWrapper'
import Loader from 'components/Loader'
import React, { useContext } from 'react'
import { useAsync } from 'react-use'
import { getTheme, Theme as UWPThemeProvider } from 'react-uwp/Theme'
import { requestChannelTeams } from 'services/TwitchAPI'
import { useQuery } from 'urql'

import ConfigInfo from '../components/ConfigInfo'
import PanelPreview from '../components/PanelPreview'
import { ChannelTeamQuery } from '../services/graphql'

const containerStyles = {
  width: '300px',
  height: '500px',
  overflowX: 'hidden',
  overflowY: 'scroll',
  border: 'blue solid 1px',
  position: 'relative',
}

const Config = ({ viewAnchor, viewPlatform }) => {
  const authInfo = useContext(AuthContext)
  const [result, reexecuteQuery] = useQuery({
    query: ChannelTeamQuery,
  })

  const { loading, value } = useAsync(async () => {
    const response = await requestChannelTeams(authInfo.channelId)
    return response.data
  }, [])

  const { data, fetching, error } = result

  // TODO - Fetch channels associated with twitch teams, if any

  if (fetching || loading) return <Loader />
  if (error) return <p>Oh no... {error.message}</p>

  const { channel: { streamTeam } } = data

  return (<UWPThemeProvider
    style={{ height: '100vh', display: 'flex' }}
    theme={getTheme({
      useFluentDesign: true, // sure you want use new fluent design.
      accent: '#0078D7',
    })}
  >
    <div style={{ flex: 1 }}>
      <ConfigInfo streamTeam={streamTeam} twitchTeams={value} />
    </div>
    <div style={{ flex: 1 }}>
      <h2>Panel Preview</h2>
      <div style={containerStyles}>
        <PanelPreview streamTeam={streamTeam} viewAnchor={viewAnchor} viewPlatform={viewPlatform} />
      </div>
    </div>
  </UWPThemeProvider>)
}

export default Config
