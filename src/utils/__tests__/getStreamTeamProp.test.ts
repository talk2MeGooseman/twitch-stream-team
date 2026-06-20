import { getStreamTeamProp } from '../getStreamTeamProp'

describe('getStreamTeamProp', () => {
  it('extracts and normalises the stream team from a channel query result', () => {
    const data = {
      channel: {
        id: 'channel-1',
        streamTeam: {
          twitchTeam: 'brainbytes',
          customActive: false,
          customTeam: { id: 'ct-1', name: 'Custom' },
        },
      },
    }

    expect(getStreamTeamProp(data)).toEqual({
      twitchTeam: 'brainbytes',
      customActive: false,
      customTeam: { id: 'ct-1', name: 'Custom' },
    })
  })

  it('returns safe defaults when there is no stream team', () => {
    expect(getStreamTeamProp({ channel: {} })).toEqual({
      twitchTeam: undefined,
      customActive: undefined,
      customTeam: {},
    })
  })
})
