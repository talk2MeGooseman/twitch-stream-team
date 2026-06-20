import { Box } from '@mui/material'
import { keyframes } from '@mui/system'
import React from 'react'

const flip = keyframes`
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
`

type LoaderProps = {
  color?: string
}

/**
 * Loader
 *
 * Component that displays an animated loading square.
 */
const Loader = ({ color = '#6441A4' }: LoaderProps) => (
  <Box
    data-testid="loader"
    sx={{
      width: 40,
      height: 40,
      margin: '100px auto',
      backgroundColor: color,
      animation: `${flip} 1.2s infinite ease-in-out`,
    }}
  />
)

export default Loader
