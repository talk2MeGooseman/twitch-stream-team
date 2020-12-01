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
import ChannelModel from "../mobx/model/ChannelModel";

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
  whiteSpace: 'nowrap',
};

const liveIconStyles = {
  position: 'absolute',
  fontSize: '24px',
  color: '#ec1313',
  bottom: '18px',
  right: '18px',
};

const displayNameContainerStyles = {
  display: 'inline-block',
  width: '80%',
  marginLeft: '4px',
};

const resizeImage = (url) => {
  if (!url) {
    return "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_50x50.png";
  }
  return url.replace('-300x300.', '-50x50.');
}

const followChannel = (channel) => {
  Twitch.ext.actions.followChannel(channel);
};

const buildTwitchUrl = (channelName) => {
  return `https://www.twitch.tv/${channelName}`;
};

const ChannelListItem = ({ channel }, { theme }) => {
  let followIconHoverColor = theme.listAccentHigh;

    const displayNameStyles = {
    color: theme.baseHigh,
    marginBottom: '5px',
    ...theme.typographyStyles.title,
  };

  const subTextStyles = {
    color: theme.baseMediumHigh,
    ...theme.typographyStyles.caption,
  };

  let followIconBG;
    if (channel.followed) {
    followIconBG = followIconHoverColor = green600;
    } else {
    followIconBG = theme.listAccentLow;
    }

  const followButtonStyles = {
    display: 'inline-block',
    background: followIconBG,
    color: "#fff",
    verticalAlign: 'top',
  };

  return (
    <div key={channel.id} style={container}>
      <div style={{ flex: 1 }}>
        <TransformCard xMaxRotate={50} yMaxRotate={50} perspective={240}>
          <a href={buildTwitchUrl(channel.name)} target="_blank">
            {channel.isLive && (
                            <div className="pulse" style={liveIconStyles}></div>
                        )}
            <Image src={resizeImage(channel.profile_image)} />
          </a>
        </TransformCard>
      </div>
      <div style={textContainer}>
        <span style={displayNameStyles}>
          <IconButton
                        size={26}
                        style={followButtonStyles}
                        hoverStyle={{ background: followIconHoverColor }}
                        activeStyle={{ background: theme.accent }}
                        onClick={() => followChannel(channel.name)}
                    >
            <IoIosHeart />
          </IconButton>
          <span style={displayNameContainerStyles}>
            <Textfit max={24} mode="single">
              {channel.name}
            </Textfit>
          </span>
        </span>
        <span style={subTextStyles}>{channel.description}</span>
      </div>
    </div>
  );
}

ChannelListItem.contextTypes = { theme: PropTypes.object };
ChannelListItem.propTypes = {
  channel: PropTypes.any,
};
export default observer(ChannelListItem);
