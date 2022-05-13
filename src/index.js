import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import AuthWrapper from './components/AuthWrapper'
import { CONFIG_MODE, DASHBOARD_MODE,VIEWER_MODE } from './services/constants'
import Config from './views/Config'
import StreamTeamTheme from './views/StreamTeamTheme'

// Bits 100 - csharpfritz

// Get the params from the url
const params = new URLSearchParams(window.location.search)
let viewComponent

// Anchor: to tell us if its rendered as "panel", "component"
const viewAnchor = params.get('anchor')
// Platform: Tells if the extension is loaded on "web" or "mobile"
const viewPlatform = params.get('platform')

const mode = params.get('mode')

// Check which mode were in to know which component to render
switch (mode) {
case CONFIG_MODE:
  viewComponent = (
    <AuthWrapper mode={mode}>
      <Config
        viewAnchor={viewAnchor}
        viewPlatform={viewPlatform}
      />
    </AuthWrapper>
  )
  break

case VIEWER_MODE:
case DASHBOARD_MODE:
  viewComponent = (
    <AuthWrapper mode={mode}>
      <StreamTeamTheme
        viewAnchor={viewAnchor}
        viewPlatform={viewPlatform}
      />
    </AuthWrapper>
  )
  break

default:
  viewComponent = <div>Nothing Loaded</div>
  break
}

ReactDOM.render(viewComponent, document.querySelector('#root'))
