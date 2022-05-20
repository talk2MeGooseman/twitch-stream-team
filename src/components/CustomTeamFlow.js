import PropTypes from 'prop-types'
import { andThen, isNil, pipe, pluck } from 'ramda'
import React, { useEffect, useRef, useState } from 'react'
import { useList, useToggle } from 'react-use'
import Button from 'react-uwp/Button'
import ListView from 'react-uwp/ListView'
import TextBox from 'react-uwp/TextBox'
import { CustomTeamMutation } from 'services/graphql'
import { requestChannelsById, requestChannelsByName } from 'services/TwitchAPI'
import { useMutation } from 'urql'

import { ListItem } from './ListItem'
import Loader from './Loader'

const paddingStyle = {
  margin: '10px 0',
}

const CustomTeamFlow = ({ streamTeam }, { theme }) => {
  const { customTeam, customActive } = streamTeam
  const channelTextBoxRef = useRef()
  const teamNameTextBoxRef = useRef()

  const [saveResult, mutate] = useMutation(CustomTeamMutation)
  const [isLoading, toggleLoading] = useToggle(false)
  const [teamName, setTeamName] = useState(customTeam.name)
  const [teamMembers, { push, removeAt, set: setTeamMembers }] = useList()
  const [channelErrorMessage, setChannelErrorMessage] = useState()

  useEffect(() => {
    pipe(
      pluck('channelId'),
      requestChannelsById,
      andThen(setTeamMembers),
      andThen(() => toggleLoading(false))
    )(customTeam.customTeamMembers)
  }, [customTeam.customTeamMembers, setTeamMembers, toggleLoading])

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
    mutate({
      name: teamName,
      memberIds: pluck('id', teamMembers),
    })
  }

  const onRemoveChannel = (event) => {
    const { channel } = event.target.dataset
    if (channel) {
      customTeam.removeChannel(channel)
    }
  }

  if (isLoading) return <Loader />

  const customTeamItems = teamMembers.map((channel) => (
    <ListItem onRemoveChannel={onRemoveChannel} channel={channel} />
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
              onClick={onSave}
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
