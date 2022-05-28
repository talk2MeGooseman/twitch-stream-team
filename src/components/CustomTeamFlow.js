import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { pluck } from 'ramda'
import React, { useCallback, useEffect, useState } from 'react'
import { useList, useToggle } from 'react-use'
import Button from 'react-uwp/Button'
import ListView from 'react-uwp/ListView'
import TextBox from 'react-uwp/TextBox'
import { ChannelTeamQuery, CustomTeamMutation } from 'services/graphql'

import { useActivateCustomTeam } from '../hooks/useActivateCustomTeam'
import { useFormActions } from '../hooks/useFormActions'
import { fetchCustomTeamMemberInfo } from '../utils'
import { ListItem } from './ListItem'
import Loader from './Loader'

const paddingStyle = {
  margin: '10px 0',
}

const CustomTeamFlow = ({ streamTeam }, { theme }) => {
  const { customTeam, customActive } = streamTeam
  const [isLoading, toggleLoading] = useToggle(false)
  const [teamName, setTeamName] = useState(customTeam?.name)
  const [teamMembers, { push, removeAt, set: setTeamMembers }] = useList()
  const [activateCustomTeam] = useActivateCustomTeam()

  const [saveMutation] = useMutation(CustomTeamMutation, {
    refetchQueries: [ChannelTeamQuery],
  })
  const onSave = useCallback(() => {
    saveMutation({
      variables: {
        name: teamName,
        memberIds: pluck('id', teamMembers),
      },
    })
  }, [saveMutation, teamMembers, teamName])

  useEffect(() => {
    fetchCustomTeamMemberInfo(setTeamMembers, toggleLoading, customTeam)
  }, [customTeam, customTeam.teamMembers, setTeamMembers, toggleLoading])

  const {
    onTeamNameChange,
    onChannelEnter,
    errorMessages,
    teamNameTextBoxRef,
    channelTextBoxRef,
  } = useFormActions(push, setTeamName)


  const onRemoveChannel = (event) => {
    const { channelIndex } = event.target.dataset
    if (channelIndex) {
      removeAt(channelIndex)
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
            >
              Save
            </Button>
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
              Set your Custom Team as your Panel Team
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}

CustomTeamFlow.contextTypes = { theme: PropTypes.object }
export default CustomTeamFlow
