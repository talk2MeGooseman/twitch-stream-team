import { beforeEach, describe, expect, it, vi } from 'vitest'

import { buildTwitchTeamDetails } from '../buildTwitchTeamDetails'

vi.mock('services/TwitchAPI', () => ({
  requestChannelsById: vi.fn(),
  requestTeamInfo: vi.fn(),
}))

// eslint-disable-next-line import/first
import { requestChannelsById, requestTeamInfo } from 'services/TwitchAPI'

const mockedRequestById = vi.mocked(requestChannelsById)
const mockedRequestTeamInfo = vi.mocked(requestTeamInfo)

const helixTeam = {
  team_display_name: 'Brain Bytes',
  team_name: 'brainbytes',
  banner: 'banner.png',
  thumbnail_url: 'logo.png',
  users: [{ user_id: '1', user_name: 'Goose' }],
}

beforeEach(() => {
  mockedRequestById.mockReset()
  mockedRequestTeamInfo.mockReset()
  mockedRequestTeamInfo.mockResolvedValue({ data: [helixTeam] } as never)
})

describe('buildTwitchTeamDetails', () => {
  it('converts the Helix team and hydrates the members', async () => {
    mockedRequestById.mockImplementation(() => async () => [
      { id: '1', display_name: 'GooseLive', profile_image_url: 'pp', description: 'dd' },
    ] as never)

    const result = await buildTwitchTeamDetails('token', 'brainbytes')

    expect(mockedRequestTeamInfo).toHaveBeenCalledWith('token', 'brainbytes')
    expect(result).toEqual({
      name: 'Brain Bytes',
      url_name: 'brainbytes',
      banner: 'banner.png',
      logo: 'logo.png',
      channels: [
        { id: '1', name: 'GooseLive', profileImage: 'pp', description: 'dd', isLive: false },
      ],
    })
  })

  it('falls back to the bare team spec when member hydration fails', async () => {
    mockedRequestById.mockImplementation(() => async () => {
      throw new Error('network')
    })

    const result = await buildTwitchTeamDetails('token', 'brainbytes')

    expect(result.name).toBe('Brain Bytes')
    expect(result.channels).toEqual([
      { id: '1', name: 'Goose', profileImage: undefined, description: undefined, isLive: false },
    ])
  })
})
