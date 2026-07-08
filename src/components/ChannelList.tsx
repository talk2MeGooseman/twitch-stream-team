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
    <List disablePadding sx={{ width: '100%' }}>
      <ListItem divider sx={{ px: 2, py: 1 }}>
        <TeamCountStripe count={channels.length} />
      </ListItem>
      {isLoading ? (
        <ListItem>
          <Loader />
        </ListItem>
      ) : (
        channels.map((channel) => (
          <ListItem
            key={channel.id}
            divider
            sx={{ px: 2, py: 1, transition: 'background-color 0.15s', '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' } }}
          >
            <ChannelListItem channel={channel} />
          </ListItem>
        ))
      )}
    </List>
  )
}

export default ChannelList
