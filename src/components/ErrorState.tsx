import { Box, Typography } from '@mui/material'
import React from 'react'

type ErrorStateProps = {
  SadSpock: string
}

export const ErrorState = ({ SadSpock }: ErrorStateProps) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h6" component="h3">
      Looks like we couldnt find your Team
    </Typography>
    <img src={SadSpock} alt="Sad Spock" />
    <Typography variant="h6" component="h3" sx={{ pt: 2.5 }}>
      Join a Twitch Team or build your own Custom Team!
    </Typography>
  </Box>
)

export default ErrorState
