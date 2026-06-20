import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

type TeamHeaderProps = {
  team: TeamSpecType
}

const TeamHeader = ({ team }: TeamHeaderProps) => (
  <Box
    component="a"
    href={`https://www.twitch.tv/team/${team.url_name}`}
    target="_blank"
    rel="noreferrer"
    sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
  >
    {team.banner ? (
      <Box sx={{ position: 'relative', lineHeight: 0 }}>
        <Box component="img" src={team.banner} alt={team.name} sx={{ width: '100%', display: 'block' }} />
        {team.logo && (
          <Avatar
            src={team.logo}
            alt=""
            variant="rounded"
            sx={{
              position: 'absolute',
              left: 12,
              bottom: 10,
              width: 48,
              height: 48,
              border: '3px solid',
              borderColor: 'background.paper',
            }}
          />
        )}
      </Box>
    ) : (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
        {team.logo && <Avatar src={team.logo} alt="" variant="rounded" sx={{ width: 44, height: 44 }} />}
        <Typography variant="h6" noWrap>
          {team.name}
        </Typography>
      </Box>
    )}
  </Box>
)

export default TeamHeader
