import '../index.css'

import { MockedProvider } from '@apollo/client/testing'
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from '@mui/material'
import React from 'react'
import { createRoot } from 'react-dom/client'

import ChannelListItem from '../components/ChannelListItem'
import CustomTeamFlow from '../components/CustomTeamFlow'
import { ListItem as MemberRow } from '../components/ListItem'
import { TeamCountStripe } from '../components/TeamCountStripe'
import TeamHeader from '../components/TeamHeader'
import TwitchTeamFlow from '../components/TwitchTeamFlow'
import theme from '../theme'
import { AuthContext } from '../utils/AuthContext'

// The components reference window.Twitch; stub it so the preview can render.
;(window as unknown as { Twitch: unknown }).Twitch = {
  ext: { actions: { followChannel() {}, onFollow() {} }, onAuthorized() {} },
}

const avatar = (label: string, color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="6" fill="${color}"/><text x="50" y="60" font-size="38" fill="white" text-anchor="middle" font-family="Segoe UI, sans-serif">${label}</text></svg>`
  )}`

const channels = [
  { id: '1', name: 'Talk2MeGooseman', description: 'Building cool stuff with code', profileImage: avatar('TG', '#9147ff'), isLive: true },
  { id: '2', name: 'JensDuck', description: 'Game dev & chill vibes', profileImage: avatar('JD', '#0078d7'), isLive: false },
  { id: '3', name: 'rw_grim', description: 'Open source & libpurple', profileImage: avatar('RG', '#1f8a4c'), isLive: true },
  { id: '4', name: 'MajorThorn', description: 'Strategy and city builders', profileImage: avatar('MT', '#e0598b'), isLive: false },
] as TeamMemberSpecType[]

const banner = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6441a4"/><stop offset="1" stop-color="#9147ff"/></linearGradient></defs><rect width="600" height="120" fill="url(#g)"/><text x="120" y="74" font-size="44" fill="white" font-family="Segoe UI, sans-serif" font-weight="300">${label}</text></svg>`
  )}`

const team = {
  name: 'Brain Bytes',
  url_name: 'brainbytes',
  banner: banner('Brain Bytes'),
  logo: avatar('BB', '#1f1f23'),
  channels,
} as TeamSpecType

const twitchTeams = [{ team_name: 'brainbytes' }, { team_name: 'codeclub' }] as HelixChannelTeam[]
const twitchStreamTeam = { customActive: true, twitchTeam: 'brainbytes', customTeam: null } as StreamTeam
const customStreamTeam = { customActive: false, twitchTeam: null, customTeam: null } as StreamTeam

const memberRows = [
  { id: '1', display_name: 'Talk2MeGooseman' },
  { id: '2', display_name: 'JensDuck' },
  { id: '3', display_name: 'rw_grim' },
] as HelixUser[]

const Card = ({ title, width = 360, children }: { title: string; width?: number; children: React.ReactNode }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="overline" sx={{ color: 'primary.light' }}>
      {title}
    </Typography>
    <Box sx={{ width }}>{children}</Box>
  </Paper>
)

const ViewerPanel = () => (
  <Box
    sx={{
      width: 320,
      bgcolor: 'background.paper',
      border: 1,
      borderColor: 'divider',
      borderRadius: 1,
      overflow: 'hidden',
    }}
  >
    <TeamHeader team={team} />
    <List disablePadding sx={{ width: '100%' }}>
      <ListItem divider sx={{ px: 2, py: 1 }}>
        <TeamCountStripe count={channels.length} />
      </ListItem>
      {channels.map((channel) => (
        <ListItem
          key={channel.id}
          divider
          sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' } }}
        >
          <ChannelListItem channel={channel} />
        </ListItem>
      ))}
    </List>
  </Box>
)

const ConfigChrome = () => (
  <Box>
    <Typography variant="h5" component="h1" gutterBottom>
      Stream Team
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
      Showcase your Twitch Team or build a custom team with all your favorite streamers.
    </Typography>
    <Tabs value={0} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tab label="Twitch Team" />
      <Tab label="Custom Team" />
    </Tabs>
    <TwitchTeamFlow twitchTeams={twitchTeams} streamTeam={twitchStreamTeam} />
  </Box>
)

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MockedProvider mocks={[]} addTypename={false}>
      <AuthContext.Provider value={null}>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            bgcolor: '#0e0e10',
            minHeight: '100vh',
          }}
        >
          <Card title="Viewer panel" width={320}>
            <ViewerPanel />
          </Card>
          <Card title="Broadcaster config — Twitch Team tab" width={380}>
            <ConfigChrome />
          </Card>
          <Card title="Custom Team Builder tab" width={380}>
            <CustomTeamFlow streamTeam={customStreamTeam} />
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" color="text.secondary">
              Member rows (with remove button):
            </Typography>
            <List>
              {memberRows.map((member, index) => (
                <ListItem key={member.id} sx={{ height: 40 }}>
                  <MemberRow channel={member} index={index} onRemoveChannel={() => {}} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Box>
      </AuthContext.Provider>
    </MockedProvider>
  </ThemeProvider>
)

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
