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
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
    <Box sx={{ flexShrink: 0 }}>
      <Box
        component="a"
        href={buildTwitchUrl(channel.name)}
        target="_blank"
        rel="noreferrer"
        sx={{ display: 'inline-block', position: 'relative' }}
      >
        {channel.isLive && (
          <Box
            className="pulse"
            data-testid="live-indicator"
            sx={{ position: 'absolute', bottom: -2, right: -2 }}
          />
        )}
        <Avatar src={resizeImage(channel.profileImage)} alt={channel.name} variant="rounded" />
      </Box>
    </Box>
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton
          size="small"
          aria-label={`Follow ${channel.name}`}
          onClick={() => followChannel(channel.name)}
          sx={{ color: 'common.white' }}
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
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(255,255,255,0.85)' }}
        noWrap
      >
        {channel.description}
      </Typography>
    </Box>
  </Box>
)

export default ChannelListItem
