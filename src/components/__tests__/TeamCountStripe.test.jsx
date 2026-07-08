import React from 'react'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '../../test/testUtils'
import { TeamCountStripe } from '../TeamCountStripe'

describe('TeamCountStripe', () => {
  it('shows the team member label and count', () => {
    const { getByText } = renderWithProviders(<TeamCountStripe count={7} />)

    expect(getByText('Team Members')).toBeInTheDocument()
    expect(getByText('7')).toBeInTheDocument()
  })
})
