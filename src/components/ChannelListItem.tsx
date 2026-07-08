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
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1.5 }}>
    <Box sx={{ position: 'relative', flexShrink: 0, lineHeight: 0 }}>
      <Avatar
        src={resizeImage(channel.profileImage)}
        alt={channel.name}
        sx={{
          width: 44,
          height: 44,
          border: '2px solid',
          borderColor: channel.isLive ? 'error.main' : 'transparent',
        }}
      />
      {channel.isLive && (
        <Box
          className="pulse"
          data-testid="live-indicator"
          sx={{ position: 'absolute', right: -1, bottom: -1 }}
        />
      )}
    </Box>
    <Box
      component="a"
      href={buildTwitchUrl(channel.name)}
      target="_blank"
      rel="noreferrer"
      sx={{ flex: 1, minWidth: 0, textDecoration: 'none', color: 'inherit' }}
    >
      <Typography variant="body2" noWrap sx={{ fontWeight: 700 }}>
        {channel.name}
      </Typography>
      <Typography variant="caption" noWrap sx={{ display: 'block', color: 'text.secondary' }}>
        {channel.description}
      </Typography>
    </Box>
    <IconButton
      size="small"
      aria-label={`Follow ${channel.name}`}
      onClick={() => followChannel(channel.name)}
      sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
    >
      <FavoriteIcon fontSize="small" />
    </IconButton>
  </Box>
)

export default ChannelListItem
