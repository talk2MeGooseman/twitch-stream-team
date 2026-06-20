import { MockedProvider } from '@apollo/client/testing'
import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'
import { ChannelTeamQuery } from 'services/graphql'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AuthContext } from '../../utils/AuthContext'
import { useTeamInfoFetcher } from '../useTeamInfoFetcher'

vi.mock('utils/buildTwitchTeamDetails', () => ({
  buildTwitchTeamDetails: vi.fn(),
}))
vi.mock('utils/buildCustomTeamDetails', () => ({
  buildCustomTeamDetails: vi.fn(),
}))

// eslint-disable-next-line import/first
import { buildCustomTeamDetails } from 'utils/buildCustomTeamDetails'
// eslint-disable-next-line import/first
import { buildTwitchTeamDetails } from 'utils/buildTwitchTeamDetails'

const mockedBuildTwitch = vi.mocked(buildTwitchTeamDetails)
const mockedBuildCustom = vi.mocked(buildCustomTeamDetails)

const authValue = { helixToken: 'token', channelId: 'c1' }

const renderWithStreamTeam = (streamTeam: unknown) => {
  const mocks = [
    {
      request: { query: ChannelTeamQuery },
      result: { data: { channel: { id: 'c1', streamTeam } } },
    },
  ]

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    </MockedProvider>
  )

  return renderHook(() => useTeamInfoFetcher(), { wrapper })
}

beforeEach(() => {
  mockedBuildTwitch.mockReset()
  mockedBuildCustom.mockReset()
})

describe('useTeamInfoFetcher', () => {
  it('builds twitch team details when a twitch team is selected', async () => {
    const teamInfo = { name: 'Brain Bytes', banner: null, logo: null, url_name: 'bb', channels: [] }
    mockedBuildTwitch.mockResolvedValue(teamInfo as never)

    const { result } = renderWithStreamTeam({
      id: 'st1',
      customActive: false,
      customTeam: null,
      twitchTeam: 'brainbytes',
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(mockedBuildTwitch).toHaveBeenCalledWith('token', 'brainbytes')
    expect(mockedBuildCustom).not.toHaveBeenCalled()
    expect(result.current.teamInfo).toEqual(teamInfo)
  })

  it('builds custom team details when a custom team is active', async () => {
    const teamInfo = { name: 'Custom', banner: null, logo: null, url_name: null, channels: [] }
    mockedBuildCustom.mockResolvedValue(teamInfo as never)

    const customTeam = { id: 'ct1', name: 'Custom', teamMembers: [{ channelId: '1' }] }

    const { result } = renderWithStreamTeam({
      id: 'st1',
      customActive: true,
      customTeam,
      twitchTeam: null,
    })

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(mockedBuildCustom).toHaveBeenCalledWith('token', customTeam)
    expect(mockedBuildTwitch).not.toHaveBeenCalled()
    expect(result.current.teamInfo).toEqual(teamInfo)
  })
})
