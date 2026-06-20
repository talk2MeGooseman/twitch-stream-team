import { useMutation } from '@apollo/client'
import {
  Box,
  Button,
  List,
  ListItem as MuiListItem,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
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
  const push = useCallback((channel: HelixUser) => setTeamMembers((prev) => [...prev, channel]), [])
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
      <Stack spacing={2.5}>
        <TextField
          inputRef={teamNameTextBoxRef}
          label="Team name"
          fullWidth
          size="small"
          defaultValue={teamName ?? ''}
          onChange={onTeamNameChange}
        />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <TextField
            inputRef={channelTextBoxRef}
            label="Add a channel"
            fullWidth
            size="small"
            error={Boolean(errorMessages.channel)}
            helperText={errorMessages.channel}
          />
          <Button variant="outlined" onClick={onChannelEnter} sx={{ flexShrink: 0, height: 40 }}>
            Add
          </Button>
        </Box>

        <Paper variant="outlined" sx={{ maxHeight: 220, overflowY: 'auto' }}>
          <List dense disablePadding>
            {teamMembers.length === 0 ? (
              <MuiListItem>
                <ListItemText
                  primary="No Team Members"
                  slotProps={{ primary: { variant: 'body2', color: 'text.secondary' } }}
                />
              </MuiListItem>
            ) : (
              teamMembers.map((channel, index) => (
                <MuiListItem key={channel.id ?? index} divider>
                  <ListItem onRemoveChannel={onRemoveChannel} channel={channel} index={index} />
                </MuiListItem>
              ))
            )}
          </List>
        </Paper>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button variant="contained" onClick={onSave} disabled={!isDirty}>
            Save
          </Button>
          <Button variant="outlined" onClick={activateCustomTeam} disabled={Boolean(customActive)}>
            Set in Panel
          </Button>
          {isSaved && (
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              Saved!
            </Typography>
          )}
        </Box>
      </Stack>
    </>
  )
}

export default CustomTeamFlow
