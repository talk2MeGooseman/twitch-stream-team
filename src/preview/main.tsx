// Local visual preview of the app's components against mock data — no Twitch
// auth or GraphQL backend required. Run `yarn mock` and open /preview.html.
// Tweak the mock data in ./mockData.ts.
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
import {
  channels,
  customStreamTeam,
  memberRows,
  team,
  twitchStreamTeam,
  twitchTeams,
} from './mockData'

// The components reference window.Twitch; stub it so the preview can render.
;(window as unknown as { Twitch: unknown }).Twitch = {
  ext: { actions: { followChannel() {}, onFollow() {} }, onAuthorized() {} },
}

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
