import React from "react";
import Image from "react-uwp/Image";
import PropTypes from 'prop-types';
import Textfit from 'react-textfit';
import IconButton from "react-uwp/IconButton";
import TransformCard from "react-uwp/TransformCard";
import Icon from "react-uwp/Icon";
import { green600 } from "react-uwp/styles/accentColors";
import { observer } from 'mobx-react';
import { IoIosHeart, IoIosRadioButtonOn } from 'react-icons/io';

const Twitch = window['Twitch'];

const container = {
  position: 'relative',
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  textDecoration: 'none',
}

const textContainer = {
  flex: 3,
  display: 'flex',
  flexDirection: "column",
  overflow: 'hidden',
  whiteSpace: 'nowrap'
};

const displayNameContainerStyles = {
  display: 'inline-block',
  width: '80%',
  marginLeft: '4px',
};

const resizeImage= (url) => {
  if (!url) {
    return "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_50x50.png";
  }
  return url.replace('-300x300.', '-50x50.')
}

const followChannel = (channel) => {
  Twitch.ext.actions.followChannel(channel);
}

const ChannelListItem = (props, context) => {
  const { channel } = props;
  const { info } = channel;
  const { theme } = context;

  const displayNameStyles = {
    color: theme.baseHigh,
    marginBottom: '5px',
    ...theme.typographyStyles.title
  };
  const subTextStyles = {
    color: theme.baseMediumHigh,
    ...theme.typographyStyles.caption
  };

  let followIconBG;
  if(channel.followed) {
    followIconBG = green600;
  } else {
    followIconBG = theme.listAccentLow;
  } 

  const followButtonStyles = { 
    display: 'inline-block',
    background: followIconBG,
    color: "#fff",
    verticalAlign: 'top'
  };

  const liveIconStyles = {
    position: 'absolute',
    fontSize: '24px',
    color: '#ec1313',
    bottom: '12px',
    right: '14px',
  };

  let liveIconComp = null;
  if (channel.isLive) {
    liveIconComp = <Icon key="0" alt="Live" style={liveIconStyles}><IoIosRadioButtonOn /></Icon>;
  }

  return (
    <div key={info._id} style={container}>
      <div style={{ flex: 1 }}>
        <TransformCard xMaxRotate={50} yMaxRotate={50} perspective={240}>
          <a href={info.url} target="_blank">
            { liveIconComp }
            <Image src={resizeImage(info.logo)} />
          </a>
        </TransformCard>
      </div>
      <div style={textContainer}>
        <span style={displayNameStyles}>
          <IconButton size={26} style={followButtonStyles} hoverStyle={{ background: theme.listAccentHigh }} activeStyle={{ background: theme.accent }} onClick={() => followChannel(info.name)}>
            <IoIosHeart />
          </IconButton>
          <span style={displayNameContainerStyles}>
            <Textfit max={24} mode="single">
              {info.display_name}
            </Textfit>
          </span>
        </span>
        <span style={subTextStyles}>{info.status || info.bio}</span>
      </div>
    </div>
  );
}

ChannelListItem.contextTypes = { theme: PropTypes.object };
export default observer(ChannelListItem);