import { Box, Typography } from '@mui/material'
import React from 'react'

import ConfigInfo from '../components/ConfigInfo'
import StreamTeamTheme from './StreamTeamTheme'

const Config = () => (
  <Box sx={{ height: '100vh', display: 'flex' }}>
    <Box sx={{ flex: 1 }}>
      <ConfigInfo />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="h5" component="h2">
        Panel Preview
      </Typography>
      <Box
        sx={{
          width: 300,
          height: 500,
          overflowX: 'hidden',
          overflowY: 'scroll',
          border: '1px solid',
          borderColor: 'primary.main',
          position: 'relative',
        }}
      >
        <StreamTeamTheme />
      </Box>
    </Box>
  </Box>
)

export default Config
