import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, renderWithProviders } from '../../test/testUtils'
import ListItem from '../custom-team/ListItem'

describe('custom-team/ListItem', () => {
  it('renders the channel name', () => {
    const { getByText } = renderWithProviders(<ListItem channel={{ name: 'Goose' }} onClick={vi.fn()} />)

    expect(getByText('Goose')).toBeInTheDocument()
  })

  it('calls onClick when the trash icon is clicked', () => {
    const onClick = vi.fn()
    const { getByTestId } = renderWithProviders(<ListItem channel={{ name: 'Goose' }} onClick={onClick} />)

    fireEvent.click(getByTestId('trash-can'))

    expect(onClick).toHaveBeenCalled()
  })
})
