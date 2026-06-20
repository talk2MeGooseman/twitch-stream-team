import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AuthContext } from '../../utils/AuthContext'
import { useFormActions } from '../useFormActions'

vi.mock('services/TwitchAPI', () => ({
  requestChannelsByName: vi.fn(),
}))

// eslint-disable-next-line import/first
import { requestChannelsByName } from 'services/TwitchAPI'

const mockedByName = vi.mocked(requestChannelsByName)

const authValue = { helixToken: 'token', channelId: 'c1' }

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
)

beforeEach(() => {
  mockedByName.mockReset()
})

describe('useFormActions', () => {
  it('adds a found channel, clears the input and resets errors', async () => {
    const channel = { id: '1', display_name: 'Goose' }
    mockedByName.mockResolvedValue([channel] as never)
    const push = vi.fn()
    const setName = vi.fn()

    const { result } = renderHook(() => useFormActions(push, setName), { wrapper })

    const setValue = vi.fn()
    result.current.channelTextBoxRef.current = {
      getValue: () => 'Goose',
      setValue,
    } as never

    await act(async () => {
      await result.current.onChannelEnter()
    })

    expect(mockedByName).toHaveBeenCalledWith('token', ['goose'])
    expect(push).toHaveBeenCalledWith(channel)
    expect(setValue).toHaveBeenCalledWith('')
    expect(result.current.errorMessages.channel).toBeUndefined()
  })

  it('sets an error message when the channel is not found', async () => {
    mockedByName.mockResolvedValue([] as never)
    const push = vi.fn()

    const { result } = renderHook(() => useFormActions(push, vi.fn()), { wrapper })

    result.current.channelTextBoxRef.current = {
      getValue: () => 'ghost',
      setValue: vi.fn(),
    } as never

    await act(async () => {
      await result.current.onChannelEnter()
    })

    expect(push).not.toHaveBeenCalled()
    expect(result.current.errorMessages.channel).toBe(
      'Channel not found, please check your spelling'
    )
  })

  it('does nothing when the channel input is empty', async () => {
    const push = vi.fn()
    const { result } = renderHook(() => useFormActions(push, vi.fn()), { wrapper })

    result.current.channelTextBoxRef.current = {
      getValue: () => '',
      setValue: vi.fn(),
    } as never

    await act(async () => {
      await result.current.onChannelEnter()
    })

    expect(mockedByName).not.toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()
  })

  it('reports the team name from the text box on change', () => {
    const setName = vi.fn()
    const { result } = renderHook(() => useFormActions(vi.fn(), setName), { wrapper })

    result.current.teamNameTextBoxRef.current = {
      getValue: () => 'My Team',
    } as never

    act(() => {
      result.current.onTeamNameChange()
    })

    expect(setName).toHaveBeenCalledWith('My Team')
  })
})
