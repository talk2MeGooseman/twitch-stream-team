import React from 'react'
import { describe, expect, it } from 'vitest'

import { render } from '../../test/testUtils'
import { TextBanner } from '../TextBanner'

describe('TextBanner', () => {
  it('renders the provided text', () => {
    const { getByText } = render(<TextBanner text="Brain Bytes" style={{}} />)

    expect(getByText('Brain Bytes')).toBeInTheDocument()
  })
})
