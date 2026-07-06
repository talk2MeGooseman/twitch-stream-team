import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { pluck } from 'ramda'
import React, { useState } from 'react'
import { ChannelTeamQuery, TwitchTeamMutation } from 'services/graphql'
import { hasTwitchTeam, isTwitchTeamActive, stillTeamMember } from 'utils'

type TwitchTeamFlowProps = {
  twitchTeams: HelixChannelTeam[]
  streamTeam: StreamTeam
}

const steps = [
  'Join a Twitch Team',
  'Select your team above',
  'Activate the extension in panel 1, 2 or 3',
  'Tell your chat about the extension!',
]

const TwitchTeamFlow = ({ twitchTeams, streamTeam }: TwitchTeamFlowProps) => {
  const defaultTeam = stillTeamMember(streamTeam?.twitchTeam, twitchTeams)
    ? streamTeam.twitchTeam
    : ''

  const [team, setTeam] = useState<string>(defaultTeam ?? '')
  const [mutate] = useMutation(TwitchTeamMutation, {
    refetchQueries: [ChannelTeamQuery],
  })

  const onSetTwitchTeam = () => {
    if (!team) return
    mutate({ variables: { teamName: team } }).catch(() => {})
  }

  const dropdownTeams = hasTwitchTeam(twitchTeams) ? pluck('team_name', twitchTeams) : []

  return (
    <Stack spacing={2.5}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Already part of a Twitch Team? Pick it below and save — it will show in your panel.
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel id="twitch-team-label">Twitch Team</InputLabel>
        <Select
          labelId="twitch-team-label"
          label="Twitch Team"
          value={team}
          displayEmpty
          onChange={(event) => setTeam(event.target.value)}
        >
          <MenuItem value="">{dropdownTeams.length > 0 ? 'Select a team' : 'No teams found'}</MenuItem>
          {dropdownTeams.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Button
          variant="contained"
          onClick={onSetTwitchTeam}
          disabled={isTwitchTeamActive(streamTeam) || !team}
        >
          Save and Preview in the Panel
        </Button>
      </Box>

      <Box>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          How it works
        </Typography>
        <Stack component="ol" spacing={0.5} sx={{ m: 0, pl: 2.5 }}>
          {steps.map((step) => (
            <Typography key={step} component="li" variant="body2" sx={{ color: 'text.secondary' }}>
              {step}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

export default TwitchTeamFlow
