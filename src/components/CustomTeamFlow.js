import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { IoIosTrash } from 'react-icons/io'
import Button from 'react-uwp/Button'
import Icon from 'react-uwp/Icon'
import ListView from 'react-uwp/ListView'
import TextBox from 'react-uwp/TextBox'

import { CUSTOM_TEAM_TYPE } from '../services/constants'

const paddingStyle = {
  margin: '10px 0',
}

const trashStyle = {
  fontSize: '18px',
  pointerEvents: 'none',
}

const CustomTeamFlow = ({ store }, { theme }) => {
  const { customTeam, teamType } = store

  const channelTextBoxRef = React.createRef()
  const teamNameTextBoxRef = React.createRef()

  const disableSetTeamButton = teamType === CUSTOM_TEAM_TYPE

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
    const {channel} = event.target.dataset
    if (channel) {
      customTeam.removeChannel(channel)
    }
  }

  const customTeamItems = customTeam.channels.map((channel) => (
    <div key={channel.name}>
      {channel.name}{' '}
      <Icon
        onClick={onRemoveChannel}
        data-testid="trash-can"
        data-channel={channel.name}
      >
        <IoIosTrash style={trashStyle} />
      </Icon>
    </div>
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
              defaultValue={customTeam.customName}
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
export default observer(CustomTeamFlow)
