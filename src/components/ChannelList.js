import React, { Component } from 'react';
import PropTypes from "prop-types";
import ListView from "react-uwp/ListView";
import Separator from "react-uwp/Separator";

const baseStyle = {
  margin: "0 0 0 0",
  minHeight: '500px',
  width: '100%',
  overflowX: 'hidden',
};

// @observer
export default class ChannelList extends Component {
  static contextTypes = { theme: PropTypes.object };

  renderChannelRows = () => {
    const { channels } = this.props.store
    let channelComponents = [];
    channels.forEach((channel) => {
      channelComponents.push({ itemNode: <div key={channel.info._id}>{channel.info.display_name}</div> });
    });

    return channelComponents;
  }

  render() {
    return(
      <ListView
        style={baseStyle}
        listSource={this.renderChannelRows()}
      />
    );
  }
}