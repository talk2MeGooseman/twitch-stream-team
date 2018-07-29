import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import AuthWrapper from './components/AuthWrapper'
import {CONFIG_MODE, VIEWER_MODE, DASHBOARD_MODE} from './services/constants'
import StreamTeams from './views/StreamTeams';
import Store from './mobx/state/Store';
import Config from './views/Config';

// Get the params from the url
const params = new URLSearchParams(window.location.search)
let viewComponent;

// Init the Store
let store = new Store();

// Anchor: to tell us if its rendered as "panel", "component"
const viewAnchor = params.get('anchor');
// Platform: Tells if the extension is loaded on "web" or "mobile"
const viewPlatform = params.get('platform');

// Check which mode were in to know which component to render
switch (params.get('mode')) {
  case CONFIG_MODE:
    viewComponent = <AuthWrapper store={store}><Config store={store} viewAnchor={viewAnchor} viewPlatform={viewPlatform} /></AuthWrapper>;
    break;
  case VIEWER_MODE:
    viewComponent = <AuthWrapper store={store}><StreamTeams store={store} viewAnchor={viewAnchor} viewPlatform={viewPlatform} /></AuthWrapper>;
    break;
  case DASHBOARD_MODE:
    break;
  default:
    viewComponent = <div>Nothing Loaded</div>;
    break;
}

ReactDOM.render(
  viewComponent
  , document.getElementById('root'));
registerServiceWorker();

