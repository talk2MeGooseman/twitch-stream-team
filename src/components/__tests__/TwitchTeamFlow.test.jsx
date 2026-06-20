import React from 'react'
import { ChannelTeamQuery, TwitchTeamMutation } from 'services/graphql'
import { describe, expect, it } from 'vitest'

import { fireEvent, renderWithProviders } from '../../test/testUtils'
import TwitchTeamFlow from '../TwitchTeamFlow'

const twitchTeams = [{ team_name: 'brainbytes' }]

const renderFlow = ({ streamTeam, mocks = [] }) =>
  renderWithProviders(<TwitchTeamFlow twitchTeams={twitchTeams} streamTeam={streamTeam} />, { mocks })

const refetchMock = {
  request: { query: ChannelTeamQuery },
  result: {
    data: {
      channel: {
        id: 'c1',
        streamTeam: { id: 'st1', customActive: false, customTeam: null, twitchTeam: 'brainbytes' },
      },
    },
  },
}

describe('TwitchTeamFlow', () => {
  it('renders the setup instructions', () => {
    const { getByText } = renderFlow({ streamTeam: { customActive: true, twitchTeam: null } })

    expect(getByText('Step 2: Join a Twitch Team')).toBeInTheDocument()
  })

  it('saves the selected team when the panel is not already showing a twitch team', async () => {
    let mutateCalled = false
    const mocks = [
      {
        request: { query: TwitchTeamMutation, variables: { teamName: 'brainbytes' } },
        result: () => {
          mutateCalled = true
          return {
            data: {
              upsertTwitchTeam: {
                id: 'st1',
                twitchTeam: 'brainbytes',
                customActive: false,
                customTeam: null,
              },
            },
          }
        },
      },
      refetchMock,
    ]

    const { getByText } = renderFlow({
      // customActive: true -> isTwitchTeamActive is false -> save enabled
      streamTeam: { customActive: true, twitchTeam: 'brainbytes' },
      mocks,
    })

    fireEvent.click(getByText('Save and Preview in the Panel'))

    await new Promise((r) => setTimeout(r, 0))
    expect(mutateCalled).toBe(true)
  })

  it('does not save when a twitch team is already active', async () => {
    let mutateCalled = false
    const mocks = [
      {
        request: { query: TwitchTeamMutation, variables: { teamName: 'brainbytes' } },
        result: () => {
          mutateCalled = true
          return { data: { upsertTwitchTeam: null } }
        },
      },
    ]

    const { getByText } = renderFlow({
      // customActive: false -> isTwitchTeamActive is true -> save disabled
      streamTeam: { customActive: false, twitchTeam: 'brainbytes' },
      mocks,
    })

    fireEvent.click(getByText('Save and Preview in the Panel'))

    await new Promise((r) => setTimeout(r, 0))
    expect(mutateCalled).toBe(false)
  })
})
