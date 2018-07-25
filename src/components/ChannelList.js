import React, { Component } from 'react';
import PropTypes from "prop-types";
import ListView from "react-uwp/ListView";
import { observer } from 'mobx-react';
import Separator from "react-uwp/Separator";

const baseStyle = {
  margin: "10px 10px 10px 0"
};

@observer
export default class ChannelList extends Component {
  static contextTypes = { theme: PropTypes.object };

  renderChannelRows = () => {
    const { channels } = this.props.store
    let channelComponents = [];
    channels.forEach((channel) => {
      channelComponents.push({ itemNode: <div key={channel.info._id}>{channel.info.display_name}</div> });
      channelComponents.push({ itemNode: <Separator />, disabled: true });
    });

    return channelComponents;
  }

  render() {
    return(
      <ListView
        style={baseStyle}
        listSource={Array(15).fill(0).map((numb, index) => index)}
      />
    );
  }
}