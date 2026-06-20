import { useMutation } from '@apollo/client'
import { Box, Button, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { pluck } from 'ramda'
import React, { useState } from 'react'
import { ChannelTeamQuery, TwitchTeamMutation } from 'services/graphql'
import { hasTwitchTeam, isTwitchTeamActive, stillTeamMember } from 'utils'

type TwitchTeamFlowProps = {
  twitchTeams: HelixChannelTeam[]
  streamTeam: StreamTeam
}

const TwitchTeamFlow = ({ twitchTeams, streamTeam }: TwitchTeamFlowProps) => {
  const defaultTeam = stillTeamMember(streamTeam?.twitchTeam, twitchTeams)
    ? streamTeam.twitchTeam
    : ''

  const [team, setTeam] = useState<string>(defaultTeam ?? '')
  const [mutate] = useMutation(TwitchTeamMutation, {
    refetchQueries: [ChannelTeamQuery],
  })

  const onSetTwitchTeam = () => {
    mutate({ variables: { teamName: team } }).catch(() => {})
  }

  const dropdownTeams = hasTwitchTeam(twitchTeams) ? pluck('team_name', twitchTeams) : []

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        If you are already part of a Twitch Team setup is easy!
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 4 }}>
        Instructions:
      </Typography>
      <Box component="ul" sx={{ listStyleType: 'none', pl: 0 }}>
        <li>Step 1: Install the extension (which you have already done!)</li>
        <li>Step 2: Join a Twitch Team</li>
        <li>
          Step 3: Select your team (if you have multiple teams);
          <FormControl size="small" sx={{ m: 1, minWidth: 200 }}>
            <Select
              value={team}
              displayEmpty
              onChange={(event) => setTeam(event.target.value)}
            >
              <MenuItem value="">
                {dropdownTeams.length > 0 ? 'Select a team' : 'No Teams Found'}
              </MenuItem>
              {dropdownTeams.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </li>
        <li>Step 4: Look at the preview to see how your team looks.</li>
        <li>Step 5: Activate the extension in panel 1, 2 or 3</li>
        <li>Step 6: Tell your chat about the extension!</li>
        <li>
          Step 7: Display your Twitch Team in the panel
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={onSetTwitchTeam}
            disabled={isTwitchTeamActive(streamTeam)}
            sx={{ my: 1 }}
          >
            Save and Preview in the Panel
          </Button>
        </li>
      </Box>
    </Box>
  )
}

export default TwitchTeamFlow
