import React from 'react'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '../../test/testUtils'
import TeamHeader from '../TeamHeader'

describe('TeamHeader', () => {
  it('links to the team page on Twitch', () => {
    const team = { url_name: 'brainbytes', logo: 'logo.png', banner: 'banner.png', name: 'Brain Bytes' }
    const { container } = renderWithProviders(<TeamHeader team={team} />)

    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', 'https://www.twitch.tv/team/brainbytes')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('falls back to a text banner with the team name when there is no banner image', () => {
    const team = { url_name: 'brainbytes', logo: 'logo.png', banner: null, name: 'Brain Bytes' }
    const { getByText } = renderWithProviders(<TeamHeader team={team} />)

    expect(getByText('Brain Bytes')).toBeInTheDocument()
  })
})
