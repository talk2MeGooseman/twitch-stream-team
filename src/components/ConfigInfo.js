import PropTypes from 'prop-types'
import React from 'react'
import Separator from 'react-uwp/Separator'
import Tabs, { Tab } from 'react-uwp/Tabs'

import { CUSTOM_TEAM_TYPE } from '../services/constants'
import CustomTeamFlow from './CustomTeamFlow'
import TwitchTeamFlow from './TwitchTeamFlow'

const ConfigInfo = (props, context) => {
  const { store } = props
  const { theme } = context
  let focusTabIndex = 0

  if (
    !store.twitchTeam.teams ||
    store.twitchTeam.teams.length === 0 ||
    store.teamType === CUSTOM_TEAM_TYPE
  ) {
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
          <TwitchTeamFlow store={store} />
        </Tab>

        <Tab title="Custom Team Builder">
          <CustomTeamFlow store={store} />
        </Tab>
      </Tabs>
    </div>
  )
}

ConfigInfo.contextTypes = { theme: PropTypes.object }
ConfigInfo.propTypes = {
  store: PropTypes.object.isRequired,
}
export default ConfigInfo
