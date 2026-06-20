import React from 'react'
import { describe, expect, it } from 'vitest'

import { render } from '../../test/testUtils'
import Loader from '../Loader'

describe('Loader', () => {
  it('renders an element by default', () => {
    const { container } = render(<Loader />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('accepts a custom color', () => {
    const { container } = render(<Loader color="white" />)

    expect(container.firstChild).toBeInTheDocument()
  })
})
