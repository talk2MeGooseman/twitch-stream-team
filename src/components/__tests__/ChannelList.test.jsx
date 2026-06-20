import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithProviders } from '../../test/testUtils'
import ChannelList from '../ChannelList'

vi.mock('services/TwitchAPI', () => ({
  requestLiveChannels: vi.fn(),
}))

// eslint-disable-next-line import/first
import { requestLiveChannels } from 'services/TwitchAPI'

const authValue = { helixToken: 'token', channelId: 'c1' }

const team = {
  name: 'Team',
  banner: null,
  logo: null,
  url_name: 'team',
  channels: [
    { id: '1', name: 'Goose', profileImage: 'p-300x300.png', description: 'd', isLive: false },
  ],
}

beforeEach(() => {
  vi.mocked(requestLiveChannels).mockResolvedValue([])
})

describe('ChannelList', () => {
  it('renders the member count stripe and the channel rows', async () => {
    const { findByText, getByText } = renderWithProviders(<ChannelList team={team} />, {
      authValue,
    })

    expect(await findByText('Goose')).toBeInTheDocument()
    expect(getByText('Team Members')).toBeInTheDocument()
  })
})
