import { isLiveChannel } from '../isLiveChannel'

describe('isLiveChannel', () => {
  const channel = { id: '42' } as never

  it('returns true when the live stream belongs to the channel', () => {
    expect(isLiveChannel(channel, { user_id: '42' } as never)).toBe(true)
  })

  it('returns false when the live stream is for a different channel', () => {
    expect(isLiveChannel(channel, { user_id: '99' } as never)).toBe(false)
  })

  it('is curried', () => {
    const isChannelLive = isLiveChannel(channel)
    expect(isChannelLive({ user_id: '42' } as never)).toBe(true)
    expect(isChannelLive({ user_id: '0' } as never)).toBe(false)
  })
})
