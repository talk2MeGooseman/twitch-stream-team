import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton } from '@mui/material'
import React, { MouseEventHandler } from 'react'

type ListItemProps = {
  channel: HelixUser
  onRemoveChannel: MouseEventHandler<HTMLButtonElement>
  index: number
}

export const ListItem = ({ channel, onRemoveChannel, index }: ListItemProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {channel.display_name}
    <IconButton
      size="small"
      aria-label={`Remove ${channel.display_name}`}
      data-testid="trash-can"
      data-channel-index={index}
      onClick={onRemoveChannel}
    >
      <DeleteIcon fontSize="small" sx={{ pointerEvents: 'none' }} />
    </IconButton>
  </Box>
)

export default ListItem
