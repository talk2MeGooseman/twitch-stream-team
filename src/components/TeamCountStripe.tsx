import { Box, Typography } from '@mui/material'
import React from 'react'

type TeamCountStripeProps = {
  count: number
}

export const TeamCountStripe = ({ count }: TeamCountStripeProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <Typography
      variant="caption"
      sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}
    >
      Team Members
    </Typography>
    <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 700 }}>
      {count}
    </Typography>
  </Box>
)

export default TeamCountStripe
