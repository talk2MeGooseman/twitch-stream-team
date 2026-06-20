import { List, ListItem } from '@mui/material'
import { useLiveStatusFetcher } from 'hooks/useLiveStatusFetcher'
import React from 'react'

import ChannelListItem from './ChannelListItem'
import Loader from './Loader'
import { TeamCountStripe } from './TeamCountStripe'

type ChannelListProps = {
  team: TeamSpecType
}

const ChannelList = ({ team }: ChannelListProps) => {
  const { channels, isLoading } = useLiveStatusFetcher(team)

  return (
    <List sx={{ width: '100%', minHeight: 500, overflowX: 'hidden' }}>
      <ListItem divider>
        <TeamCountStripe count={channels.length} />
      </ListItem>
      {isLoading ? (
        <ListItem>
          <Loader />
        </ListItem>
      ) : (
        channels.map((channel) => (
          <ListItem key={channel.id} divider>
            <ChannelListItem channel={channel} />
          </ListItem>
        ))
      )}
    </List>
  )
}

export default ChannelList
