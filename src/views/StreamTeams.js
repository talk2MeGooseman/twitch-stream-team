import React, { Component } from 'react';
import ChannelList from '../components/ChannelList';
import { observer } from 'mobx-react';

@observer
export default class StreamTeams extends Component {
  render(){
    const { store } = this.props;
    return(
      <ChannelList store={store} />
    );
  }
}
