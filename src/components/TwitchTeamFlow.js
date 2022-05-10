import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import Button from 'react-uwp/Button'
import DropDownMenu from 'react-uwp/DropDownMenu'

import { CUSTOM_TEAM_TYPE } from '../services/constants'

const baseStyle = {
  margin: '10px 20px 10px 10px',
}

const marginStyle = {
  margin: '10px 0',
}

// Bits 300 rw_grim
// MajorThorn 200 MajorThorn

const TwitchTeamFlow = (props, context) => {
  const { store } = props
  const { twitchTeam, teamType } = store
  const { theme } = context

  const onChange = (team) => {
    twitchTeam.setTeam(team)
    twitchTeam.name = team
  }

  const onSetTwitchTeam = () => {
    twitchTeam.setTeam(twitchTeam.name)
  }

  let dropdownTeams = ['No Teams Found']
  if (twitchTeam.teams && twitchTeam.teams.length > 0) {
    dropdownTeams = [...twitchTeam.teams]
  }

  const disableSetTeamButton = teamType !== CUSTOM_TEAM_TYPE

  return (
    <>
      <div style={{ marginTop: '5px', ...theme.typographyStyles.subTitle }}>
        If you are already part of a Twitch Team setup is easy!
      </div>
      <div style={{ marginTop: '30px', ...theme.typographyStyles.subTitle }}>
        Instructions:
      </div>
      <div style={{ marginTop: '5px', ...theme.typographyStyles.baseAlt }}>
        <ul style={{ listStyleType: 'none' }}>
          <li>Step 1: Install the extension (which you have already done!)</li>
          <li>Step 2: Join a Twitch Team</li>
          <li>
            Step 3: Select your team (if you have multiple teams);
            <DropDownMenu
              style={baseStyle}
              values={dropdownTeams}
              defaultValue={twitchTeam.name}
              onChangeValue={onChange}
              background="black"
              itemWidth={200}
            />
          </li>
          <li>Step 4: Look at the preview to see how your team looks.</li>
          <li>Step 5: Activate the extension in panel 1, 2 or 3</li>
          <li>Step 6: Tell your chat about the extension!</li>
          <li>
            Step 7: Display your Twitch Team in the panel
            <br />
            <Button
              style={marginStyle}
              onClick={onSetTwitchTeam}
              background={theme.accent}
              disabled={disableSetTeamButton}
            >
              Set your Twitch Team as your Panel Team
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}

TwitchTeamFlow.contextTypes = { theme: PropTypes.object }
export default observer(TwitchTeamFlow)
