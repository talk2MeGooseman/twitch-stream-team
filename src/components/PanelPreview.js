import { observer } from 'mobx-react'
import React from 'react'

import { SAVE_PENDING } from '../services/constants'
import StreamTeamTheme from '../views/StreamTeamTheme'
import Loader from './Loader'

const PanelPreview = ({ store, viewAnchor, viewPlatform }) => {
  if (store.saveState === SAVE_PENDING) {
    return <Loader />
  }
  return (
    <StreamTeamTheme
      store={store}
      viewAnchor={viewAnchor}
      viewPlatform={viewPlatform}
    />
  )

}

export default observer(PanelPreview)
