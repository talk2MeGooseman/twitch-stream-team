import React from 'react'
import { SAVE_PENDING } from '../services/constants'
import Loader from '../components/Loader'
import { observer } from 'mobx-react'
import StreamTeamTheme from '../views/StreamTeamTheme'

const PanelPreview = (props) => {
  const { store, viewAnchor, viewPlatform } = props

  if (store.saveState === SAVE_PENDING) {
    return <Loader />
  } else {
    return (
      <StreamTeamTheme
        store={store}
        viewAnchor={viewAnchor}
        viewPlatform={viewPlatform}
      />
    )
  }
}

export default observer(PanelPreview)
