import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { pluck } from 'ramda'
import React, { MouseEventHandler, useCallback, useContext, useEffect, useState } from 'react'
import { useList, useToggle } from 'react-use'
import type { Theme } from 'react-uwp'
import Button from 'react-uwp/Button'
import ListView from 'react-uwp/ListView'
import TextBox from 'react-uwp/TextBox'
import Toast from 'react-uwp/Toast'
import { ChannelTeamQuery, CustomTeamMutation } from 'services/graphql'

import { useActivateCustomTeam } from '../hooks/useActivateCustomTeam'
import { useFormActions } from '../hooks/useFormActions'
import { fetchCustomTeamMemberInfo } from '../utils'
import { AuthContext } from '../utils/AuthContext'
import { ListItem } from './ListItem'
import Loader from './Loader'

const paddingStyle = {
  margin: '10px 0',
}

type CustomTeamFlowProps = {
  streamTeam: StreamTeam
};

const CustomTeamFlow = ({ streamTeam }: CustomTeamFlowProps, { theme }: { theme: Theme }) => {
  const { customTeam, customActive } = streamTeam
  const [isLoading, toggleLoading] = useToggle(false)
  const [isSaved, setSaved] = useState(false)
  const [isDirty, toggleDirty] = useToggle(false)
  const [teamName, setTeamName] = useState(customTeam?.name)
  const [teamMembers, { push, removeAt, set: setTeamMembers }] = useList<HelixUser>()
  const [activateCustomTeam] = useActivateCustomTeam()
  const authInfo = useContext(AuthContext)

  const refetchQueries = customActive ? [ChannelTeamQuery] : []

  const [saveMutation] = useMutation(CustomTeamMutation, {
    refetchQueries,
  })
  const onSave = useCallback(() => {
    saveMutation({
      variables: {
        name: teamName,
        memberIds: pluck('id', teamMembers),
      },
    }).then(() => setSaved(true)).then(toggleDirty)
      .catch((error) => { })
  }, [saveMutation, teamMembers, teamName, toggleDirty])

  useEffect(() => {
    if (!authInfo?.helixToken || !customTeam) return

    fetchCustomTeamMemberInfo({
      token: authInfo.helixToken,
      customTeam
    }).then(setTeamMembers).then(() => toggleLoading(false)).catch(() => { })
  }, [authInfo?.helixToken, customTeam, customTeam?.teamMembers, setTeamMembers, toggleLoading])

  const addChannel = useCallback((channel: HelixUser) => {
    push(channel)
    toggleDirty(true)
  }, [push, toggleDirty])

  const changeName = useCallback((name: string) => {
    setTeamName(name)
    toggleDirty(true)
  }, [push, toggleDirty])

  const {
    onTeamNameChange,
    onChannelEnter,
    errorMessages,
    teamNameTextBoxRef,
    channelTextBoxRef,
  } = useFormActions(addChannel, changeName)

  const onRemoveChannel: MouseEventHandler<HTMLSpanElement> = (event) => {
    const { channelIndex } = event.target.dataset
    if (channelIndex) {
      toggleDirty(true)
      removeAt(parseInt(channelIndex, 10))
    }
  }

  if (isLoading) return <Loader />

  const customTeamItems = teamMembers.map((channel, index) => (
    <ListItem
      onRemoveChannel={onRemoveChannel}
      channel={channel}
      index={index}
    />
  ))

  if (customTeamItems.length === 0) {
    customTeamItems.push(<div>No Team Members</div>)
  }

  return (
    <>
      <Toast
        defaultShow={isDirty}
        title="Change Detected"
        description={['You have unsaved changes.', 'Click save to see updates.']}
        showCloseIcon
      />
      <div style={{ marginTop: '5px', ...theme.typographyStyles.subTitle }}>
        Instructions:
      </div>
      <div style={{ marginTop: '5px', ...theme.typographyStyles.baseAlt }}>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            Step 1: Name Your Team <br />
            <TextBox
              ref={teamNameTextBoxRef}
              style={paddingStyle}
              placeholder="Team Name"
              defaultValue={teamName}
              onChangeValue={onTeamNameChange}
            />
          </li>
          <li>
            Step 2: Add the Channels you want to have <br />
            <TextBox
              ref={channelTextBoxRef}
              style={paddingStyle}
              placeholder="Channel Name"
            />
            {errorMessages.channel && <div>{errorMessages.channel}</div>}
            <Button style={paddingStyle} onClick={onChannelEnter}>
              Add Channel
            </Button>
          </li>
          <li>
            <ListView
              listSource={customTeamItems}
              listItemStyle={{ height: 40 }}
            />
          </li>
          <li>
            Step 3: Save your Custom Team
            <br />
            <Button
              style={paddingStyle}
              onClick={onSave}
              background={theme.accent}
              disabled={!isDirty}
            >
              Save
            </Button>{' '}
            {isSaved && <h5 style={{ display: 'inline-block' }}>Saved!</h5>}
          </li>
          <li>
            Step 4: Display your Custom Team in the panel
            <br />
            <Button
              style={paddingStyle}
              onClick={activateCustomTeam}
              background={theme.accent}
              disabled={customActive}
            >
              Set Custom Team in Panel
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}

CustomTeamFlow.contextTypes = { theme: PropTypes.object }
export default CustomTeamFlow
