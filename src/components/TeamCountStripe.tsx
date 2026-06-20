import { Box, Typography } from '@mui/material'
import React from 'react'

type TeamCountStripeProps = {
  count: number
}

export const TeamCountStripe = ({ count }: TeamCountStripeProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <Typography variant="body2" component="span">
      Team Members
    </Typography>
    <Typography variant="body2" component="span" sx={{ color: 'secondary.light' }}>
      {count}
    </Typography>
  </Box>
)

export default TeamCountStripe
