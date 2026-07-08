import { applyStreamTeamSpec } from '../applyStreamTeamSpec'

describe('applyStreamTeamSpec', () => {
  it('picks the stream team fields from the GraphQL payload', () => {
    const streamTeam = {
      twitchTeam: 'brainbytes',
      customActive: true,
      customTeam: { id: '1', name: 'My Team' },
      // extra fields dropped
      __typename: 'StreamTeam',
      id: '99',
    }

    expect(applyStreamTeamSpec(streamTeam)).toEqual({
      twitchTeam: 'brainbytes',
      customActive: true,
      customTeam: { id: '1', name: 'My Team' },
    })
  })

  it('defaults a missing custom team to an empty object', () => {
    expect(applyStreamTeamSpec({ twitchTeam: 'x', customActive: false })).toEqual({
      twitchTeam: 'x',
      customActive: false,
      customTeam: {},
    })
  })
})
