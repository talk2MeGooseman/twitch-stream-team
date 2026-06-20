import { Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import React from 'react'

type TextBannerProps = {
  text?: string
  sx?: SxProps<Theme>
}

export const TextBanner = ({ text, sx }: TextBannerProps) => (
  <Typography
    variant="h4"
    component="h1"
    noWrap
    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', ...sx }}
  >
    {text}
  </Typography>
)

export default TextBanner
