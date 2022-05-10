import { observer } from 'mobx-react'
import React, { PureComponent } from 'react'

import ChannelList from '../components/ChannelList'
import Loader from '../components/Loader'
import TeamHeader from '../components/TeamHeader'
import SadSpock from '../sad-spock.svg'
import {
  LOAD_ERROR,
  SAVE_PENDING,
} from '../services/constants'

@observer
export default class StreamTeams extends PureComponent {
  render() {
    const { store: team } = this.props

    if (team && team.saveState === SAVE_PENDING) {
      return <Loader color="white" />
    }

    if (!team || team.loadingState === LOAD_ERROR || (team && !team.channels)) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h3>Looks like we couldnt find your Team</h3>
          <img src={SadSpock} alt="Sad Spock" />
          <h3>Spock is now sad</h3>
          <h3 style={{ paddingTop: '20px' }}>
            Join a Twitch Team or build your own Custom Team!
          </h3>
        </div>
      )
    }

    return (
      <>
        <TeamHeader store={team} />
        <ChannelList store={team} />
      </>
    )
  }
}
