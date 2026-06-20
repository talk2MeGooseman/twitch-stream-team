import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fireEvent, renderWithProviders, within } from '../../test/testUtils'
import CustomTeamFlow from '../CustomTeamFlow'

vi.mock('services/TwitchAPI', () => ({
  requestChannelsById: vi.fn(),
  requestChannelsByName: vi.fn(),
}))

// eslint-disable-next-line import/first
import { requestChannelsById } from 'services/TwitchAPI'

const authValue = { helixToken: 'token', channelId: 'c1' }

const streamTeam = {
  customActive: false,
  customTeam: {
    name: 'custom_team',
    teamMembers: [{ channelId: '1' }, { channelId: '2' }],
  },
}

beforeEach(() => {
  vi.mocked(requestChannelsById).mockImplementation(() => async () => [
    { id: '1', display_name: 'Talk2MeGooseman' },
    { id: '2', display_name: 'JensDuck' },
  ])
})

describe('CustomTeamFlow', () => {
  it('hydrates and displays existing team members', async () => {
    const { findByText } = renderWithProviders(<CustomTeamFlow streamTeam={streamTeam} />, {
      authValue,
    })

    expect(await findByText('Talk2MeGooseman')).toBeInTheDocument()
    expect(await findByText('JensDuck')).toBeInTheDocument()
  })

  it('removes a team member from the list when its trash icon is clicked', async () => {
    const { findByText, getByText, queryByText } = renderWithProviders(
      <CustomTeamFlow streamTeam={streamTeam} />,
      { authValue }
    )

    await findByText('Talk2MeGooseman')

    const gooseRow = getByText('Talk2MeGooseman')
    const trash = within(gooseRow).getByTestId('trash-can')
    fireEvent.click(trash)

    expect(queryByText('Talk2MeGooseman')).not.toBeInTheDocument()
    expect(queryByText('JensDuck')).toBeInTheDocument()
  })

  it('shows a placeholder when there are no members to display', async () => {
    const { findByText } = renderWithProviders(
      <CustomTeamFlow streamTeam={{ customActive: false, customTeam: null }} />,
      { authValue }
    )

    expect(await findByText('No Team Members')).toBeInTheDocument()
  })
})
