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

const TeamHeader = (props, context) => {
  const { store } = props
  const { theme } = context

  const renderBanner = () => {
    if (store.banner) {
      return <Image style={imageBannerStyle} src={store.banner} />
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
          {store.display_name}
        </Textfit>
      </h1>
    )

  }

  return (
    <a
      style={{ textDecoration: 'none' }}
      href={`https://www.twitch.tv/team/${store.name}`}
      target="_blank" rel="noreferrer"
    >
      <Image src={store.logo} style={logoStyles} />
      {renderBanner()}
    </a>
  )
}

TeamHeader.contextTypes = { theme: PropTypes.object }
export default observer(TeamHeader)
