import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import Textfit from 'react-textfit'
import Image from 'react-uwp/Image'

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

const TeamHeader = ({ team }, context) => {
  const { theme } = context

  const renderBanner = () => {
    if (team.banner) {
      return <Image style={imageBannerStyle} src={team.banner} />
    }
    const style = {
      paddingLeft: '60px',
      color: theme.baseHigh,
      background: theme.acrylicTexture40.background,
      ...theme.typographyStyles.header,
    }
    return (
      <h1 style={style}>
        <Textfit max={24} mode="single">
          {team.name}
        </Textfit>
      </h1>
    )
  }

  return (
    <a
      style={{ textDecoration: 'none' }}
      href={`https://www.twitch.tv/team/${team.url_name}`}
      target="_blank"
      rel="noreferrer"
    >
      <Image src={team.logo} style={logoStyles} />
      {renderBanner()}
    </a>
  )
}

TeamHeader.contextTypes = { theme: PropTypes.object }
export default observer(TeamHeader)
