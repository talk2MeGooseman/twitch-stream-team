import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import { andThen, isNil, pipe, pluck, propOr } from 'ramda'
import React, { useEffect, useRef, useState } from 'react'
import { useList, useToggle } from 'react-use'
import Button from 'react-uwp/Button'
import ListView from 'react-uwp/ListView'
import TextBox from 'react-uwp/TextBox'
import {
  ActivateCustomTeamMutation,
  ChannelTeamQuery,
  CustomTeamMutation,
} from 'services/graphql'
import { requestChannelsById, requestChannelsByName } from 'services/TwitchAPI'

import { ListItem } from './ListItem'
import Loader from './Loader'

const paddingStyle = {
  margin: '10px 0',
}

const CustomTeamFlow = ({ streamTeam }, { theme }) => {
  const { customTeam, customActive } = streamTeam
  const channelTextBoxRef = useRef()
  const teamNameTextBoxRef = useRef()

  const [saveMutation] = useMutation(CustomTeamMutation, {
    refetchQueries: [ChannelTeamQuery],
  })
  const [activateMutation] = useMutation(ActivateCustomTeamMutation, {
    refetchQueries: [ChannelTeamQuery],
  })
  const [isLoading, toggleLoading] = useToggle(false)
  const [teamName, setTeamName] = useState(customTeam?.name)
  const [teamMembers, { push, removeAt, set: setTeamMembers }] = useList()
  const [channelErrorMessage, setChannelErrorMessage] = useState()

  useEffect(() => {
    pipe(
      propOr([], 'teamMembers'),
      pluck('channelId'),
      requestChannelsById,
      andThen(setTeamMembers),
      andThen(() => toggleLoading(false))
    )(customTeam)
  }, [customTeam, customTeam.teamMembers, setTeamMembers, toggleLoading])

  const onChannelEnter = async () => {
    const channelName = channelTextBoxRef.current.getValue()
    if (!channelName || channelName.length === 0) {
      return
    }

    const [channel] = await requestChannelsByName([channelName])

    if (!isNil(channel)) {
      push(channel)
      channelTextBoxRef.current.setValue('')
      setChannelErrorMessage()
    } else {
      setChannelErrorMessage('Channel not found, please check your spelling')
    }
  }

  const onTeamNameChange = () => {
    setTeamName(teamNameTextBoxRef.current.getValue())
  }

  const onSave = () => {
    saveMutation({
      variables: {
        name: teamName,
        memberIds: pluck('id', teamMembers),
      },
    })
  }

  const activateCustomTeam = () => {
    activateMutation({
      variables: {
        activate: true,
      },
    })
  }

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
            {channelErrorMessage && <div>{channelErrorMessage}</div>}
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
