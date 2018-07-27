import React from 'react';
import Image from "react-uwp/Image";

const imageStyle = {
  width: "93%",
  height: "auto",
  maxWidth: 300,
  margin: 10
};

const TeamHeader = (props) => {
  const { store } = props;

  return(
    <a href={`https://www.twitch.tv/team/${store.name}`} target="_blank">
      <Image
        style={imageStyle}
        src={store.banner}
      >
      </Image>
    </a>
  );
}

export default TeamHeader;