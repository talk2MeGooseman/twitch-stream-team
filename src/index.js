import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AuthWrapper from './components/AuthWrapper';
import { CONFIG_MODE, VIEWER_MODE, DASHBOARD_MODE } from './services/constants';
import StreamTeamTheme from './views/StreamTeamTheme';
import Store from './mobx/state/Store';
import Config from './views/Config';

// Bits 100 - csharpfritz

// Get the params from the url
const params = new URLSearchParams(window.location.search)
let viewComponent;

// Init the Store
let store = new Store();

// Anchor: to tell us if its rendered as "panel", "component"
const viewAnchor = params.get('anchor');
// Platform: Tells if the extension is loaded on "web" or "mobile"
const viewPlatform = params.get('platform');

const mode = params.get('mode');

// Check which mode were in to know which component to render
switch (mode) {
  case CONFIG_MODE:
    viewComponent = (
        <AuthWrapper mode={mode} store={store}>
            <Config
                store={store}
                viewAnchor={viewAnchor}
                viewPlatform={viewPlatform}
            />
        </AuthWrapper>
    )
    break
case VIEWER_MODE:
    viewComponent = (
        <AuthWrapper mode={mode} store={store}>
            <StreamTeamTheme
                store={store}
                viewAnchor={viewAnchor}
                viewPlatform={viewPlatform}
            />
        </AuthWrapper>
    )
    break
case DASHBOARD_MODE:
    viewComponent = (
        <AuthWrapper mode={mode} store={store}>
            <StreamTeamTheme
                store={store}
                viewAnchor={viewAnchor}
                viewPlatform={viewPlatform}
            />
        </AuthWrapper>
    )
    break
default:
    viewComponent = <div>Nothing Loaded</div>;
    break
}

ReactDOM.render(viewComponent, document.getElementById('root'));
