import { Box } from '@mui/material'
import React from 'react'

import StreamTeams from './StreamTeams'

const StreamTeamTheme = () => (
  <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100%' }}>
    <StreamTeams />
  </Box>
)

export default StreamTeamTheme
