import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  List,
  ListItem as MuiListItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { pluck } from 'ramda'
import React, { MouseEventHandler, useCallback, useContext, useEffect, useState } from 'react'
import { ChannelTeamQuery, CustomTeamMutation } from 'services/graphql'

import { useActivateCustomTeam } from '../hooks/useActivateCustomTeam'
import { useFormActions } from '../hooks/useFormActions'
import { fetchCustomTeamMemberInfo } from '../utils'
import { AuthContext } from '../utils/AuthContext'
import { ListItem } from './ListItem'
import Loader from './Loader'

const fieldStyle = { my: 1 }

type CustomTeamFlowProps = {
  streamTeam: StreamTeam
}

const CustomTeamFlow = ({ streamTeam }: CustomTeamFlowProps) => {
  const { customTeam, customActive } = streamTeam
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setSaved] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [teamName, setTeamName] = useState(customTeam?.name)
  const [teamMembers, setTeamMembers] = useState<HelixUser[]>([])
  const [activateCustomTeam] = useActivateCustomTeam()
  const authInfo = useContext(AuthContext)

  const markDirty = useCallback(() => setIsDirty(true), [])
  const push = useCallback(
    (channel: HelixUser) => setTeamMembers((prev) => [...prev, channel]),
    []
  )
  const removeAt = useCallback(
    (index: number) => setTeamMembers((prev) => prev.filter((_, i) => i !== index)),
    []
  )

  const refetchQueries = customActive ? [ChannelTeamQuery] : []
  const [saveMutation] = useMutation(CustomTeamMutation, { refetchQueries })

  const onSave = useCallback(() => {
    saveMutation({
      variables: {
        name: teamName,
        memberIds: pluck('id', teamMembers),
      },
    })
      .then(() => {
        setSaved(true)
        setIsDirty(false)
      })
      .catch(() => {})
  }, [saveMutation, teamMembers, teamName])

  useEffect(() => {
    if (!authInfo?.helixToken || !customTeam) return

    fetchCustomTeamMemberInfo({ token: authInfo.helixToken, customTeam })
      .then(setTeamMembers)
      .then(() => setIsLoading(false))
      .catch(() => {})
  }, [authInfo?.helixToken, customTeam])

  const addChannel = useCallback(
    (channel: HelixUser) => {
      push(channel)
      markDirty()
    },
    [push, markDirty]
  )

  const changeName = useCallback(
    (name: string) => {
      setTeamName(name)
      markDirty()
    },
    [markDirty]
  )

  const { onTeamNameChange, onChannelEnter, errorMessages, teamNameTextBoxRef, channelTextBoxRef } =
    useFormActions(addChannel, changeName)

  const onRemoveChannel: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { channelIndex } = event.currentTarget.dataset
    if (channelIndex) {
      markDirty()
      removeAt(parseInt(channelIndex, 10))
    }
  }

  if (isLoading) return <Loader />

  return (
    <>
      <Snackbar open={isDirty} message="You have unsaved changes. Click save to see updates." />
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Instructions:
      </Typography>
      <Box component="ul" sx={{ listStyleType: 'none', pl: 0 }}>
        <li>
          Step 1: Name Your Team
          <TextField
            inputRef={teamNameTextBoxRef}
            fullWidth
            size="small"
            placeholder="Team Name"
            defaultValue={teamName ?? ''}
            onChange={onTeamNameChange}
            sx={fieldStyle}
          />
        </li>
        <li>
          Step 2: Add the Channels you want to have
          <TextField
            inputRef={channelTextBoxRef}
            fullWidth
            size="small"
            placeholder="Channel Name"
            error={Boolean(errorMessages.channel)}
            helperText={errorMessages.channel}
            sx={fieldStyle}
          />
          <Button variant="outlined" onClick={onChannelEnter} sx={fieldStyle}>
            Add Channel
          </Button>
        </li>
        <li>
          <List>
            {teamMembers.length === 0 ? (
              <MuiListItem>No Team Members</MuiListItem>
            ) : (
              teamMembers.map((channel, index) => (
                <MuiListItem key={channel.id ?? index} sx={{ height: 40 }}>
                  <ListItem onRemoveChannel={onRemoveChannel} channel={channel} index={index} />
                </MuiListItem>
              ))
            )}
          </List>
        </li>
        <li>
          Step 3: Save your Custom Team
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            disabled={!isDirty}
            sx={fieldStyle}
          >
            Save
          </Button>{' '}
          {isSaved && (
            <Typography component="span" variant="subtitle2" sx={{ display: 'inline-block' }}>
              Saved!
            </Typography>
          )}
        </li>
        <li>
          Step 4: Display your Custom Team in the panel
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={activateCustomTeam}
            disabled={Boolean(customActive)}
            sx={fieldStyle}
          >
            Set Custom Team in Panel
          </Button>
        </li>
      </Box>
    </>
  )
}

export default CustomTeamFlow
