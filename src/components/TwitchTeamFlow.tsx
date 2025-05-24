import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { pluck } from 'ramda'
import React, { useState } from 'react'
import type { Theme } from 'react-uwp'
import Button from 'react-uwp/Button'
import DropDownMenu from 'react-uwp/DropDownMenu'
import { ChannelTeamQuery, TwitchTeamMutation } from 'services/graphql'
import { hasTwitchTeam, isTwitchTeamActive, stillTeamMember } from 'utils'

const baseStyle = {
  margin: '10px 20px 10px 10px',
}

const marginStyle = {
  margin: '10px 0',
}

type TwitchTeamFlowProps = {
  twitchTeams: HelixChannelTeam[]
  streamTeam: StreamTeam
};

const TwitchTeamFlow = ({ twitchTeams, streamTeam }: TwitchTeamFlowProps, { theme } : { theme: Theme } ) => {
  const defaultTeam = stillTeamMember(streamTeam?.twitchTeam, twitchTeams) ? streamTeam.twitchTeam : null

  const [team, setTeam] = useState(defaultTeam)
  const [mutate] = useMutation(TwitchTeamMutation, {
    refetchQueries: [ChannelTeamQuery],
  })

  const onChange = (selection: string) => {
    setTeam(selection)
  }

  const onSetTwitchTeam = () => {
    mutate({ variables: { teamName: team } })
    .catch((error) => {
      // error handling
    })
  }

  let dropdownTeams = ['No Teams Found']

  if (hasTwitchTeam(twitchTeams)) {
    dropdownTeams = ['Select a team', ...pluck('team_name', twitchTeams)]
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
              style={{
                ...baseStyle,
                position: 'relative', // Ensure dropdown is positioned relative to parent
                zIndex: 1000, // Higher z-index to ensure it shows above other elements
              }}
              wrapperStyle={{
                overflow: 'visible', // Ensure dropdown can expand
              }}
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
              disabled={isTwitchTeamActive(streamTeam)}
            >
              Save and Preview in the Panel
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}

TwitchTeamFlow.contextTypes = { theme: PropTypes.object }
export default TwitchTeamFlow
