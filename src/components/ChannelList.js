import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { ascend, descend, pluck, prop, sort, tap } from 'ramda'
import React, { Component, useEffect, useState } from 'react'
import ListView from 'react-uwp/ListView'
import { requestLiveChannels } from 'services/TwitchAPI'

import ChannelListItem from './ChannelListItem'
import { TeamCountStripe } from './TeamCountStripe'

const baseStyle = {
  margin: '0 0 0 0',
  minHeight: '500px',
  width: '100%',
  overflowX: 'hidden',
}

const ChannelList = ({ team }, context) => {
  const [channels, setChannels] = useState([])
  const channelsRows = []

  useEffect(() => {
    const ids = pluck('id', team.channels)
    // eslint-disable-next-line promise/catch-or-return
    requestLiveChannels(ids)
      .then((liveChannels) => {
        const updatedChannels = [...team.channels]

        liveChannels.forEach((liveChannel) => {
          const channel = updatedChannels.find(
            (foundChannel) => foundChannel.id === liveChannel.user_id
          )
          if (channel) {
            channel.isLive = true
          }
        })

        return updatedChannels
      })
      .then(sort(descend(prop('isLive'))))
      .then(setChannels)
  }, [team.channels])

  channelsRows.push(<TeamCountStripe channels={channels} context={context} />)

  channels.forEach((channel) => {
    channelsRows.push({
      itemNode: <ChannelListItem channel={channel} />,
    })
  })

  return (
    <ListView
      style={baseStyle}
      listSource={channelsRows}
      listItemStyle={{ borderBottom: '#6441A4  solid 1px' }}
    />
  )
}

ChannelList.contextTypes = { theme: PropTypes.object }
export default ChannelList
