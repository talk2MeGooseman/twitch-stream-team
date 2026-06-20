// Mock data for the local preview (preview.html / src/preview/main.tsx).
// Edit freely to see how the UI renders against different shapes of data —
// none of this is bundled into the production build.

/** A simple coloured SVG avatar with initials, as a data URI (renders offline). */
export const avatar = (label: string, color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="6" fill="${color}"/><text x="50" y="60" font-size="38" fill="white" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif">${label}</text></svg>`
  )}`

/** A gradient banner with the team name, as a data URI. */
export const banner = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6d5efc"/><stop offset="0.5" stop-color="#a855f7"/><stop offset="1" stop-color="#2dd4bf"/></linearGradient></defs><rect width="600" height="120" fill="url(#g)"/><text x="120" y="74" font-size="44" fill="white" font-family="Inter, Segoe UI, sans-serif" font-weight="600">${label}</text></svg>`
  )}`

export const channels = [
  { id: '1', name: 'Talk2MeGooseman', description: 'Building cool stuff with code', profileImage: avatar('TG', '#6d5efc'), isLive: true },
  { id: '2', name: 'JensDuck', description: 'Game dev & chill vibes', profileImage: avatar('JD', '#2dd4bf'), isLive: false },
  { id: '3', name: 'rw_grim', description: 'Open source & libpurple', profileImage: avatar('RG', '#34d399'), isLive: true },
  { id: '4', name: 'MajorThorn', description: 'Strategy and city builders', profileImage: avatar('MT', '#fb7185'), isLive: false },
] as TeamMemberSpecType[]

export const team = {
  name: 'Brain Bytes',
  url_name: 'brainbytes',
  banner: banner('Brain Bytes'),
  logo: avatar('BB', '#11141d'),
  channels,
} as TeamSpecType

export const twitchTeams = [{ team_name: 'brainbytes' }, { team_name: 'codeclub' }] as HelixChannelTeam[]

export const twitchStreamTeam = { customActive: true, twitchTeam: 'brainbytes', customTeam: null } as StreamTeam

export const customStreamTeam = { customActive: false, twitchTeam: null, customTeam: null } as StreamTeam

export const memberRows = [
  { id: '1', display_name: 'Talk2MeGooseman' },
  { id: '2', display_name: 'JensDuck' },
  { id: '3', display_name: 'rw_grim' },
] as HelixUser[]
