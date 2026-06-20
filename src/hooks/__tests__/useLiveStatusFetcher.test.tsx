import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AuthContext } from '../../utils/AuthContext'
import { useLiveStatusFetcher } from '../useLiveStatusFetcher'

vi.mock('services/TwitchAPI', () => ({
  requestLiveChannels: vi.fn(),
}))

// eslint-disable-next-line import/first
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
  it('marks channels with their matching live stream', async () => {
    // channel 2 is live
    mockedLive.mockImplementation(() => async () => [{ user_id: '2' }] as never)

    const { result } = renderHook(() => useLiveStatusFetcher(team), { wrapper })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.channels).toHaveLength(2)
    const live = result.current.channels.find((c) => c.id === '2')
    const offline = result.current.channels.find((c) => c.id === '1')
    // NOTE: current code assigns the matched stream object (truthy) to `isLive`,
    // not a boolean. Because of that, the `descend(prop('isLive'))` sort comparing
    // an object against `undefined` is a no-op and does not reorder live-first.
    expect(live?.isLive).toEqual({ user_id: '2' })
    expect(offline?.isLive).toBeUndefined()
  })

  it('does not fetch when there is no auth token', async () => {
    const noAuthWrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
    )

    renderHook(() => useLiveStatusFetcher(team), { wrapper: noAuthWrapper })

    expect(mockedLive).not.toHaveBeenCalled()
  })
})
