import React from 'react'

import { fireEvent, renderWithProviders } from '../../test/testUtils'
import ChannelListItem from '../ChannelListItem'

const channel = {
  id: '1',
  name: 'Talk2MeGooseman',
  display_name: 'Talk2MeGooseman',
  description: 'blah blah blah',
  profileImage: 'https://picture.here/profile-300x300.png',
  isLive: false,
}

describe('ChannelListItem', () => {
  it('renders the channel name and description', () => {
    const { queryByText } = renderWithProviders(<ChannelListItem channel={channel} />)

    expect(queryByText('Talk2MeGooseman')).toBeInTheDocument()
    expect(queryByText('blah blah blah')).toBeInTheDocument()
  })

  it('links to the channel on Twitch in a new tab', () => {
    const { container } = renderWithProviders(<ChannelListItem channel={channel} />)

    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', 'https://www.twitch.tv/Talk2MeGooseman')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('does not show the live indicator when the channel is offline', () => {
    const { container } = renderWithProviders(<ChannelListItem channel={channel} />)

    expect(container.querySelector('.pulse')).not.toBeInTheDocument()
  })

  it('shows the live indicator when the channel is live', () => {
    const { container } = renderWithProviders(
      <ChannelListItem channel={{ ...channel, isLive: true }} />
    )

    expect(container.querySelector('.pulse')).toBeInTheDocument()
  })

  it('calls the Twitch follow action when the follow button is clicked', () => {
    const { getByRole } = renderWithProviders(<ChannelListItem channel={channel} />)

    fireEvent.click(getByRole('button', { name: /follow/i }))

    expect(window.Twitch.ext.actions.followChannel).toHaveBeenCalledWith('Talk2MeGooseman')
  })
})
