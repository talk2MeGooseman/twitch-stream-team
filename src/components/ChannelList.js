import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ListView from 'react-uwp/ListView'

import ChannelListItem from './ChannelListItem'

const baseStyle = {
  margin: '0 0 0 0',
  minHeight: '500px',
  width: '100%',
  overflowX: 'hidden',
}

@observer
export default class ChannelList extends Component {

  renderTeamCount = () => {
    const { store: { channels } } = this.props
    const { theme } = this.context

    const teamStyles = {
      display: 'inline-block',
      width: '50%',
      color: theme.chromeAltLow,
      ...theme.typographyStyles.baseAlt,
    }

    const countStyles = {
      display: 'inline-block',
      width: '50%',
      textAlign: 'right',
      color: theme.accentLighter3,
      ...theme.typographyStyles.baseAlt,
    }

    return (
      <div>
        <span style={teamStyles}>Team Members</span>
        <span style={countStyles}>{channels.length}</span>
      </div>
    )
  }

  renderChannelRows = () => {
    const { store: {channels} } = this.props
    const channelComponents = []

    channelComponents.push(this.renderTeamCount())

    channels.forEach((channel) => {
      channelComponents.push({
        itemNode: <ChannelListItem channel={channel} />,
      })
    })

    return channelComponents
  }

  render() {
    return (
      <ListView
        style={baseStyle}
        listSource={this.renderChannelRows()}
        listItemStyle={{ borderBottom: '#6441A4  solid 1px' }}
      />
    )
  }
}

ChannelList.contextTypes = { theme: PropTypes.object }
