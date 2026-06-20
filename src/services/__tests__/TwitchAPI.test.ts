import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  requestChannelsById,
  requestChannelsByName,
  requestChannelTeams,
  requestLiveChannels,
  requestTeamInfo,
} from '../TwitchAPI'

vi.mock('axios', () => ({ default: vi.fn() }))

const mockedAxios = vi.mocked(axios as unknown as ReturnType<typeof vi.fn>)

beforeEach(() => {
  mockedAxios.mockReset()
})

describe('requestLiveChannels', () => {
  it('requests the streams endpoint with auth headers and returns the data', async () => {
    mockedAxios.mockResolvedValue({ data: { data: [{ user_id: '1' }] } })

    const result = await requestLiveChannels('jwt-token', ['1'])

    expect(result).toEqual([{ user_id: '1' }])
    expect(mockedAxios).toHaveBeenCalledTimes(1)
    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: expect.stringContaining('/streams'),
        headers: expect.objectContaining({
          Authorization: 'Extension jwt-token',
          'Client-ID': expect.any(String),
        }),
      })
    )
    expect(mockedAxios.mock.calls[0][0].url).toContain('user_id=1')
  })

  it('batches requests in groups of 100 and concatenates the results', async () => {
    mockedAxios
      .mockResolvedValueOnce({ data: { data: [{ user_id: 'a' }] } })
      .mockResolvedValueOnce({ data: { data: [{ user_id: 'b' }] } })

    const channels = Array.from({ length: 150 }, (_, i) => String(i))
    const result = await requestLiveChannels('token', channels)

    expect(mockedAxios).toHaveBeenCalledTimes(2)
    expect(result).toEqual([{ user_id: 'a' }, { user_id: 'b' }])
  })
})

describe('requestChannelsById', () => {
  it('preserves the input channel ordering regardless of API ordering', async () => {
    mockedAxios.mockResolvedValue({
      data: {
        data: [
          { id: 'a', display_name: 'A' },
          { id: 'b', display_name: 'B' },
        ],
      },
    })

    const result = await requestChannelsById('token', ['b', 'a'])

    expect(result.map((u) => u.id)).toEqual(['b', 'a'])
    expect(mockedAxios.mock.calls[0][0].url).toContain('/users')
    expect(mockedAxios.mock.calls[0][0].url).toContain('id=b')
  })
})

describe('requestChannelsByName', () => {
  it('queries the users endpoint by login name', async () => {
    mockedAxios.mockResolvedValue({
      data: { data: [{ login: 'goose', display_name: 'Goose' }] },
    })

    const result = await requestChannelsByName('token', ['goose'])

    expect(result[0].display_name).toBe('Goose')
    expect(mockedAxios.mock.calls[0][0].url).toContain('login=goose')
  })
})

describe('requestChannelTeams', () => {
  it('returns the channel teams payload', async () => {
    mockedAxios.mockResolvedValue({ data: { data: [{ broadcaster_id: '1' }] } })

    const result = await requestChannelTeams('token', '1')

    expect(result).toEqual({ data: [{ broadcaster_id: '1' }] })
    expect(mockedAxios.mock.calls[0][0].url).toContain('broadcaster_id=1')
  })

  it('swallows errors and returns undefined', async () => {
    mockedAxios.mockRejectedValue(new Error('network'))

    await expect(requestChannelTeams('token', '1')).resolves.toBeUndefined()
  })
})

describe('requestTeamInfo', () => {
  it('returns the team payload on success', async () => {
    mockedAxios.mockResolvedValue({ data: { data: [{ team_name: 'brainbytes' }] } })

    const result = await requestTeamInfo('token', 'brainbytes')

    expect(result).toEqual({ data: [{ team_name: 'brainbytes' }] })
    expect(mockedAxios.mock.calls[0][0].url).toContain('name=brainbytes')
  })

  it('returns an empty data list on error', async () => {
    mockedAxios.mockRejectedValue(new Error('network'))

    await expect(requestTeamInfo('token', 'brainbytes')).resolves.toEqual({ data: [] })
  })
})
