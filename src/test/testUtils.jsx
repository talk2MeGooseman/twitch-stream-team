import { MockedProvider } from '@apollo/client/testing'
import { render } from '@testing-library/react'
import PropTypes from 'prop-types'
import React from 'react'
import getTheme from 'react-uwp/styles/getTheme'

import { AuthContext } from '../utils/AuthContext'

// react-uwp components read their theme from React's *legacy* context
// (`(props, { theme }) => ...` plus `Component.contextTypes`). The usual way to
// supply it is the `Theme` provider from `react-uwp/Theme`, but that module
// eagerly imports the RevealEffect store which pulls in @juggle/resize-observer
// (an ESM package Node can't load under test). We sidestep that by building the
// theme via `react-uwp/styles/getTheme` and injecting it through a minimal
// legacy-context provider of our own.
export const testTheme = getTheme({
  themeName: 'dark',
  accent: '#0078D7',
  useFluentDesign: true,
})

class LegacyThemeProvider extends React.Component {
  getChildContext() {
    return { theme: testTheme }
  }

  render() {
    return this.props.children
  }
}

LegacyThemeProvider.childContextTypes = { theme: PropTypes.object }
LegacyThemeProvider.propTypes = { children: PropTypes.node }

/**
 * Wrap UI in the providers components rely on at runtime: Apollo (mocked),
 * the legacy react-uwp theme context, and the auth context.
 */
export const AllProviders = ({ children, mocks = [], authValue = null }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <AuthContext.Provider value={authValue}>
      <LegacyThemeProvider>{children}</LegacyThemeProvider>
    </AuthContext.Provider>
  </MockedProvider>
)

AllProviders.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  mocks: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  authValue: PropTypes.object,
}

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
