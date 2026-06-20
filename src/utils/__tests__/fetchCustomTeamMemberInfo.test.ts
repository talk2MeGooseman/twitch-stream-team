import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fetchCustomTeamMemberInfo } from '../fetchCustomTeamMemberInfo'

vi.mock('services/TwitchAPI', () => ({
  requestChannelsById: vi.fn(),
}))

import { requestChannelsById } from 'services/TwitchAPI'

const mockedRequestById = vi.mocked(requestChannelsById)

beforeEach(() => {
  mockedRequestById.mockReset()
})

describe('fetchCustomTeamMemberInfo', () => {
  it('extracts channel ids from the custom team and fetches their users', async () => {
    let receivedIds: string[] = []
    const users = [{ id: '1', display_name: 'Goose' }]
    mockedRequestById.mockImplementation(() => async (ids: string[]) => {
      receivedIds = ids
      return users as never
    })

    const result = await fetchCustomTeamMemberInfo({
      token: 'token',
      customTeam: { teamMembers: [{ channelId: '1' }, { channelId: '2' }] } as never,
    })

    expect(mockedRequestById).toHaveBeenCalledWith('token')
    expect(receivedIds).toEqual(['1', '2'])
    // returns the raw Helix users (no member-spec mapping here)
    expect(result).toEqual(users)
  })

  it('handles a custom team with no members', async () => {
    let receivedIds: string[] = []
    mockedRequestById.mockImplementation(() => async (ids: string[]) => {
      receivedIds = ids
      return [] as never
    })

    await fetchCustomTeamMemberInfo({ token: 'token', customTeam: {} as never })

    expect(receivedIds).toEqual([])
  })
})
