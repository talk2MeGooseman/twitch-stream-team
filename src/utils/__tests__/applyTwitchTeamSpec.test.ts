import { convertHelixToTeamSpec } from '../applyTwitchTeamSpec'

describe('convertHelixToTeamSpec', () => {
  it('converts a Helix team into a team spec with mapped members', () => {
    const helixTeam = {
      team_display_name: 'Brain Bytes',
      team_name: 'brainbytes',
      banner: 'https://banner.png',
      thumbnail_url: 'https://logo.png',
      users: [
        { user_id: '1', user_name: 'Goose' },
        { user_id: '2', user_name: 'Duck' },
      ],
    }

    expect(convertHelixToTeamSpec(helixTeam)).toEqual({
      name: 'Brain Bytes',
      url_name: 'brainbytes',
      banner: 'https://banner.png',
      logo: 'https://logo.png',
      channels: [
        { id: '1', name: 'Goose', profileImage: undefined, description: undefined, isLive: false },
        { id: '2', name: 'Duck', profileImage: undefined, description: undefined, isLive: false },
      ],
    })
  })

  it('defaults banner and logo to null and channels to an empty list', () => {
    const result = convertHelixToTeamSpec({
      team_display_name: 'Solo',
      team_name: 'solo',
    })

    expect(result.banner).toBeNull()
    expect(result.logo).toBeNull()
    expect(result.channels).toEqual([])
  })
})
