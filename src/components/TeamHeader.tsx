import { Box } from '@mui/material'
import React from 'react'

import { TextBanner } from './TextBanner'

type TeamHeaderProps = {
  team: TeamSpecType
}

const TeamHeader = ({ team }: TeamHeaderProps) => (
  <Box
    component="a"
    href={`https://www.twitch.tv/team/${team.url_name}`}
    target="_blank"
    rel="noreferrer"
    sx={{ display: 'block', position: 'relative', textDecoration: 'none', color: 'text.primary' }}
  >
    {team.logo && (
      <Box
        component="img"
        src={team.logo}
        alt=""
        sx={{ height: 50, width: 50, position: 'absolute', top: 20, left: 10 }}
      />
    )}
    {team.banner ? (
      <Box
        component="img"
        src={team.banner}
        alt={team.name}
        sx={{ height: 'auto', maxWidth: '100%' }}
      />
    ) : (
      <TextBanner text={team.name} sx={{ pl: '60px' }} />
    )}
  </Box>
)

export default TeamHeader
