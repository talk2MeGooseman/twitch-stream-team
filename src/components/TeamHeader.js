import PropTypes from 'prop-types'
import React from 'react'
import Image from 'react-uwp/Image'

import { TextBanner } from './TextBanner'

const imageBannerStyle = {
  height: 'auto',
  maxWidth: '100%',
}

const logoStyles = {
  height: '50px',
  width: '50px',
  position: 'absolute',
  top: '20px',
  left: '10px',
}

const TeamHeader = ({ team }, { theme }) => {
  const style = {
    paddingLeft: '60px',
    color: theme.baseHigh,
    background: theme.acrylicTexture40.background,
    ...theme.typographyStyles.header,
  }

  return (
    <a
      style={{ textDecoration: 'none' }}
      href={`https://www.twitch.tv/team/${team.url_name}`}
      target="_blank"
      rel="noreferrer"
    >
      <Image src={team.logo} style={logoStyles} />
      {team.banner ? (
        <Image style={imageBannerStyle} src={team.banner} />
      ) : (
        <TextBanner text={team.name} style={style} />
      )}
    </a>
  )
}

TeamHeader.contextTypes = { theme: PropTypes.object }
export default TeamHeader
