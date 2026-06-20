import { beforeEach, describe, expect, it, vi } from 'vitest'

import { buildCustomTeamDetails } from '../buildCustomTeamDetails'

vi.mock('services/TwitchAPI', () => ({
  requestChannelsById: vi.fn(),
}))

import { requestChannelsById } from 'services/TwitchAPI'

const mockedRequestById = vi.mocked(requestChannelsById)

beforeEach(() => {
  mockedRequestById.mockReset()
})

describe('buildCustomTeamDetails', () => {
  it('builds a team spec and hydrates members from the Helix API', async () => {
    mockedRequestById.mockImplementation(() => async () => [
      { id: '1', display_name: 'Goose', profile_image_url: 'p1', description: 'd1' },
    ] as never)

    const result = await buildCustomTeamDetails('token', {
      name: 'My Team',
      teamMembers: [{ channelId: '1' }],
    } as never)

    expect(result).toEqual({
      name: 'My Team',
      channels: [
        { id: '1', name: 'Goose', profileImage: 'p1', description: 'd1', isLive: false },
      ],
    })
  })
})
