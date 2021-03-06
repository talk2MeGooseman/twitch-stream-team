import React from 'react'
import PropTypes from 'prop-types'
import TextBox from 'react-uwp/TextBox'
import Button from 'react-uwp/Button'
import ListView from 'react-uwp/ListView'
import { observer } from 'mobx-react'
import Icon from 'react-uwp/Icon'
import { CUSTOM_TEAM_TYPE } from '../services/constants'
import { IoIosTrash } from 'react-icons/io'

const paddingStyle = {
  margin: '10px 0',
}

const trashStyle = {
  fontSize: '18px',
  pointerEvents: 'none',
}

const CustomTeamFlow = ({ store }, { theme }) => {
  let { customTeam, teamType } = store

  let channelTextBoxRef = React.createRef()
  let teamNameTextBoxRef = React.createRef()
  let logoTextBoxRef = React.createRef()
  let bannerTextBoxRef = React.createRef()

  let disableSetTeamButton = teamType === CUSTOM_TEAM_TYPE

  let onChannelEnter = (event) => {
    let channel = channelTextBoxRef.current.getValue()
    if (!channel || !channel.length) {
      return
    }
    customTeam.addChannel(channel)
    channelTextBoxRef.current.setValue('')
  }

  let onTeamNameChange = (event) => {
    customTeam.setName(teamNameTextBoxRef.current.getValue())
  }

  let onBannerChange = (event) => {
    customTeam.setBanner(bannerTextBoxRef.current.getValue())
  }

  let onLogoChange = (event) => {
    customTeam.setLogo(logoTextBoxRef.current.getValue())
  }

  let onSave = (event) => {
    customTeam.setTeam()
  }

  let onRemoveChannel = (event) => {
    let channel = event.target.getAttribute('data-channel')
    if (channel) {
      customTeam.removeChannel(channel)
    }
  }

  let customTeamItems = customTeam.channels.map((channel) => (
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

  if (!customTeamItems.length) {
    customTeamItems.push(<div>No Team Members</div>)
  }

  return (
    <React.Fragment>
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
            Step 3: Set your banner and logo
            <br />
            <br />
            Logo:{' '}
            <TextBox
              ref={logoTextBoxRef}
              style={paddingStyle}
              placeholder="Team Logo Image URL"
              defaultValue={customTeam.logo}
              onChangeValue={onLogoChange}
            />
            Banner:{' '}
            <TextBox
              ref={bannerTextBoxRef}
              style={paddingStyle}
              placeholder="Team Banner Image URL"
              defaultValue={customTeam.banner}
              onChangeValue={onBannerChange}
            />
          </li>
          <li>
            Step 4: Save your Custom Team
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
            Step 5: Display your Custom Team in the panel
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
    </React.Fragment>
  )
}

CustomTeamFlow.contextTypes = { theme: PropTypes.object }
export default observer(CustomTeamFlow)
