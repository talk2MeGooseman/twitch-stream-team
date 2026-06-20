import { MockedProvider } from '@apollo/client/testing'
import { act, renderHook, waitFor } from '@testing-library/react'
import React from 'react'
import { ActivateCustomTeamMutation, ChannelTeamQuery } from 'services/graphql'
import { describe, expect, it } from 'vitest'

import { useActivateCustomTeam } from '../useActivateCustomTeam'

const streamTeamResult = {
  id: 'st1',
  twitchTeam: null,
  customActive: true,
  customTeam: { id: 'ct1', name: 'My Team', teamMembers: [] },
}

describe('useActivateCustomTeam', () => {
  it('fires the activate mutation with activate: true', async () => {
    let activateCalled = false

    const mocks = [
      {
        request: { query: ActivateCustomTeamMutation, variables: { activate: true } },
        result: () => {
          activateCalled = true
          return { data: { activateCustomStreamTeam: streamTeamResult } }
        },
      },
      // the mutation refetches the channel team query
      {
        request: { query: ChannelTeamQuery },
        result: {
          data: { channel: { id: 'c1', streamTeam: streamTeamResult } },
        },
      },
    ]

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    )

    const { result } = renderHook(() => useActivateCustomTeam(), { wrapper })

    act(() => {
      result.current[0]()
    })

    await waitFor(() => expect(activateCalled).toBe(true))
  })
})
