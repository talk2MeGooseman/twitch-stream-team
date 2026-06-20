import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fetchCustomMembersInfo, fetchTwitchTeamMemberInfo } from '../fetchChannelsInfo'

vi.mock('services/TwitchAPI', () => ({
  requestChannelsById: vi.fn(),
}))

// eslint-disable-next-line import/first
import { requestChannelsById } from 'services/TwitchAPI'

const mockedRequestById = vi.mocked(requestChannelsById)

const helixUsers = [
  { id: '1', display_name: 'Goose', profile_image_url: 'p1', description: 'd1' },
]

beforeEach(() => {
  mockedRequestById.mockReset()
  // ramda-curried: requestChannelsById(token) returns a fn called with ids
  mockedRequestById.mockImplementation(() => async () => helixUsers as never)
})

describe('fetchCustomMembersInfo', () => {
  it('looks up the channel ids and maps them to member specs', async () => {
    const result = await fetchCustomMembersInfo('token', [{ id: '1' }] as never)

    expect(mockedRequestById).toHaveBeenCalledWith('token')
    expect(result).toEqual([
      { id: '1', name: 'Goose', profileImage: 'p1', description: 'd1', isLive: false },
    ])
  })
})

describe('fetchTwitchTeamMemberInfo', () => {
  it('looks up the channel ids and maps them to member specs', async () => {
    const result = await fetchTwitchTeamMemberInfo('token', [{ id: '1' }] as never)

    expect(result).toEqual([
      { id: '1', name: 'Goose', profileImage: 'p1', description: 'd1', isLive: false },
    ])
  })
})
