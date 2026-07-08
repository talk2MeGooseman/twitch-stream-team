import { Box, Typography } from '@mui/material'
import React from 'react'

type ErrorStateProps = {
  sadSpockSrc: string
}

export const ErrorState = ({ sadSpockSrc }: ErrorStateProps) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h6" component="h3">
      Looks like we couldn&apos;t find your Team
    </Typography>
    <img src={sadSpockSrc} alt="Sad Spock" />
    <Typography variant="h6" component="h3" sx={{ pt: 2.5 }}>
      Join a Twitch Team or build your own Custom Team!
    </Typography>
  </Box>
)

export default ErrorState
