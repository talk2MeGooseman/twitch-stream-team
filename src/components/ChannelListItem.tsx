import FavoriteIcon from '@mui/icons-material/Favorite'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import React from 'react'

const resizeImage = (url: string) => {
  if (!url) {
    return 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_50x50.png'
  }
  return url.replace('-300x300.', '-50x50.')
}

const followChannel = (channel: string) => {
  window.Twitch.ext.actions.followChannel(channel)
}

const buildTwitchUrl = (channelName: string) => `https://www.twitch.tv/${channelName}`

type ChannelListItemProps = {
  channel: TeamMemberSpecType
}

const ChannelListItem = ({ channel }: ChannelListItemProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', textDecoration: 'none' }}>
    <Box sx={{ position: 'relative', flex: 1 }}>
      <a href={buildTwitchUrl(channel.name)} target="_blank" rel="noreferrer">
        {channel.isLive && (
          <Box
            className="pulse"
            data-testid="live-indicator"
            sx={{ position: 'absolute', bottom: 18, right: 18 }}
          />
        )}
        <Avatar
          src={resizeImage(channel.profileImage)}
          alt={channel.name}
          variant="rounded"
        />
      </a>
    </Box>
    <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', overflow: 'hidden', ml: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton
          size="small"
          color="secondary"
          aria-label={`Follow ${channel.name}`}
          onClick={() => followChannel(channel.name)}
        >
          <FavoriteIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="subtitle1"
          noWrap
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {channel.name}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        noWrap
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {channel.description}
      </Typography>
    </Box>
  </Box>
)

export default ChannelListItem
