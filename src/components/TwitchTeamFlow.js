import PropTypes from 'prop-types'
import { isEmpty, map, pluck, prop } from 'ramda'
import React, { useState } from 'react'
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

const TwitchTeamFlow = ({ twitchTeams, streamTeam }, context) => {
  const { theme } = context
  const [team, setTeam] = useState(streamTeam.twitchTeam)


  const onChange = (selection) => {
    setTeam(selection)
  }

  const onSetTwitchTeam = () => {
    // TODO Send GQL Mutation
  }

  let dropdownTeams = ['No Teams Found']
  if (!isEmpty(twitchTeams)) {
    dropdownTeams = pluck('team_name', twitchTeams)
  }

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
              defaultValue={team}
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
              disabled={streamTeam.customActive}
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
export default TwitchTeamFlow
