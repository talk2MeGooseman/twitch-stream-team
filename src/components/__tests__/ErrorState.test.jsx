import React from 'react'
import { describe, expect, it } from 'vitest'

import { render } from '../../test/testUtils'
import { ErrorState } from '../ErrorState'

describe('ErrorState', () => {
  it('renders the not-found messaging and the sad spock image', () => {
    const { getByText, getByAltText } = render(<ErrorState sadSpockSrc="sad-spock.svg" />)

    expect(getByText("Looks like we couldn't find your Team")).toBeInTheDocument()
    expect(getByText('Join a Twitch Team or build your own Custom Team!')).toBeInTheDocument()
    expect(getByAltText('Sad Spock')).toHaveAttribute('src', 'sad-spock.svg')
  })
})
