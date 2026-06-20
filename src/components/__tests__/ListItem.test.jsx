import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { fireEvent, renderWithProviders } from '../../test/testUtils'
import { ListItem } from '../ListItem'

describe('ListItem (custom team builder)', () => {
  it('renders the channel display name', () => {
    const { getByText } = renderWithProviders(
      <ListItem channel={{ display_name: 'Goose' }} onRemoveChannel={vi.fn()} index={0} />
    )

    expect(getByText('Goose')).toBeInTheDocument()
  })

  it('calls onRemoveChannel when the trash icon is clicked', () => {
    const onRemoveChannel = vi.fn()
    const { getByTestId } = renderWithProviders(
      <ListItem channel={{ display_name: 'Goose' }} onRemoveChannel={onRemoveChannel} index={2} />
    )

    fireEvent.click(getByTestId('trash-can'))

    expect(onRemoveChannel).toHaveBeenCalled()
  })
})
