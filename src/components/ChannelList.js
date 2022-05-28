import { useFetchChannelsLiveStatus } from 'hooks/useFetchChannelsLiveStatus'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import ListView from 'react-uwp/ListView'

import ChannelListItem from './ChannelListItem'
import Loader from './Loader'
import { TeamCountStripe } from './TeamCountStripe'

const baseStyle = {
  margin: '0 0 0 0',
  minHeight: '500px',
  width: '100%',
  overflowX: 'hidden',
}

const ChannelList = ({ team }, context) => {
  const { channels, isLoading } = useFetchChannelsLiveStatus(team)

  const channelRows = useMemo(() => {
    const rows = [<TeamCountStripe count={channels.length} context={context} />]

    if (isLoading) {
      rows.push(<Loader />)
    } else {
      channels.forEach((channel) => {
        rows.push({
          itemNode: <ChannelListItem channel={channel} />,
        })
      })
    }

    return rows
  }, [channels, context, isLoading])

  return (
    <ListView
      style={baseStyle}
      listSource={channelRows}
      listItemStyle={{ borderBottom: '#6441A4  solid 1px' }}
    />
  )
}

ChannelList.contextTypes = { theme: PropTypes.object }
export default ChannelList
