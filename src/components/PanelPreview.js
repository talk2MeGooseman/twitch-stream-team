import { observer } from 'mobx-react'
import React from 'react'

import { SAVE_PENDING } from '../services/constants'
import StreamTeamTheme from '../views/StreamTeamTheme'
import Loader from './Loader'

const PanelPreview = ({ streamTeam, viewAnchor, viewPlatform }) => (
  <StreamTeamTheme
    streamTeam={streamTeam}
    viewAnchor={viewAnchor}
    viewPlatform={viewPlatform}
  />
)

export default observer(PanelPreview)
