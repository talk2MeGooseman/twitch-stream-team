import React, { Component } from 'react'
import ChannelList from '../components/ChannelList'
import TeamHeader from '../components/TeamHeader'
import {
  LOAD_ERROR,
  CUSTOM_TEAM_TYPE,
  SAVE_PENDING,
} from '../services/constants'
import SadSpock from '../sad-spock.svg'
import Loader from '../components/Loader'
import { observer } from 'mobx-react'

@observer
export default class StreamTeams extends Component {
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
      <React.Fragment>
        <TeamHeader store={team} />
        <ChannelList store={team} />
      </React.Fragment>
    )
  }
}
