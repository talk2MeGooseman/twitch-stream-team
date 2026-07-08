import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AuthContext } from '../../utils/AuthContext'
import { useLiveStatusFetcher } from '../useLiveStatusFetcher'

vi.mock('services/TwitchAPI', () => ({
  requestLiveChannels: vi.fn(),
}))

import { requestLiveChannels } from 'services/TwitchAPI'

const mockedLive = vi.mocked(requestLiveChannels)

const authValue = { helixToken: 'token', channelId: 'c1' }

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
)

const team = {
  name: 'Team',
  banner: null,
  logo: null,
  url_name: 'team',
  channels: [
    { id: '1', name: 'A', profileImage: '', description: '', isLive: false },
    { id: '2', name: 'B', profileImage: '', description: '', isLive: false },
  ],
}

beforeEach(() => {
  mockedLive.mockReset()
})

describe('useLiveStatusFetcher', () => {
  it('marks live channels with a boolean and sorts them to the front', async () => {
    // channel 2 is live
    mockedLive.mockResolvedValue([{ user_id: '2' }] as never)

    const { result } = renderHook(() => useLiveStatusFetcher(team), { wrapper })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.channels).toHaveLength(2)
    // live channel is sorted to the front and flagged with a boolean
    expect(result.current.channels[0].id).toBe('2')
    expect(result.current.channels[0].isLive).toBe(true)
    expect(result.current.channels.find((c) => c.id === '1')?.isLive).toBe(false)
  })

  it('does not fetch when there is no auth token', async () => {
    const noAuthWrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
    )

    renderHook(() => useLiveStatusFetcher(team), { wrapper: noAuthWrapper })

    expect(mockedLive).not.toHaveBeenCalled()
  })
})
