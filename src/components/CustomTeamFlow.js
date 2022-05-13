import PropTypes from 'prop-types'
import { pluck } from 'ramda'
import React from 'react'
import { IoIosTrash } from 'react-icons/io'
import { useAsync } from 'react-use'
import Button from 'react-uwp/Button'
import Icon from 'react-uwp/Icon'
import ListView from 'react-uwp/ListView'
import TextBox from 'react-uwp/TextBox'
import { requestChannelsById } from 'services/TwitchAPI'

import Loader from './Loader'


const paddingStyle = {
  margin: '10px 0',
}

const trashStyle = {
  fontSize: '18px',
  pointerEvents: 'none',
}

const ListItem = ({ channel, onRemoveChannel }) => (
  <div key={channel.display_name}>
    {channel.display_name}{' '}
    <Icon onClick={onRemoveChannel} data-testid="trash-can" data-channel={channel.id}>
      <IoIosTrash style={trashStyle} />
    </Icon>
  </div>
)

const CustomTeamFlow = ({ streamTeam }, { theme }) => {
  const { customTeam, customActive } = streamTeam

  const { loading, value } = useAsync(async () => {
    const channelIds = pluck('channelId', customTeam.customTeamMembers)
    return requestChannelsById(channelIds)
  }, [customTeam.customTeamMembers])

  const channelTextBoxRef = React.createRef()
  const teamNameTextBoxRef = React.createRef()

  const disableSetTeamButton = customActive

  const onChannelEnter = () => {
    const channel = channelTextBoxRef.current.getValue()
    if (!channel || channel.length === 0) {
      return
    }
    customTeam.addChannel(channel)
    channelTextBoxRef.current.setValue('')
  }

  const onTeamNameChange = () => {
    customTeam.setName(teamNameTextBoxRef.current.getValue())
  }

  const onSave = () => {
    customTeam.setTeam()
  }

  const onRemoveChannel = (event) => {
    const { channel } = event.target.dataset
    if (channel) {
      customTeam.removeChannel(channel)
    }
  }

  if (loading) return <Loader />

  const customTeamItems = value.map((channel) => (
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
              defaultValue={customTeam.name}
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
              disabled={disableSetTeamButton}
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
