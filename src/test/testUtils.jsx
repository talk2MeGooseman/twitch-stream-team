import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import React from 'react'

import theme from '../theme'
import { AuthContext } from '../utils/AuthContext'

/**
 * Wrap UI in the providers components rely on at runtime: Apollo (mocked),
 * the MUI theme, and the auth context.
 */
export const AllProviders = ({ children, mocks = [], authValue = null }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <AuthContext.Provider value={authValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthContext.Provider>
  </MockedProvider>
)

/**
 * Render a component inside all app providers. Extra options (`mocks`,
 * `authValue`) are forwarded to the provider wrapper.
 */
export const renderWithProviders = (ui, { mocks, authValue, ...options } = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllProviders mocks={mocks} authValue={authValue}>
        {children}
      </AllProviders>
    ),
    ...options,
  })

export * from '@testing-library/react'
