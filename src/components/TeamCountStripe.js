import PropTypes from 'prop-types'
import React from 'react'

export const TeamCountStripe = ({ channels }, context) => {
  const { theme } = context

  const teamStyles = {
    display: 'inline-block',
    width: '50%',
    color: theme.chromeAltLow,
    ...theme.typographyStyles.baseAlt,
  }

  const countStyles = {
    display: 'inline-block',
    width: '50%',
    textAlign: 'right',
    color: theme.accentLighter3,
    ...theme.typographyStyles.baseAlt,
  }

  return (
    <div>
      <span style={teamStyles}>Team Members</span>
      <span style={countStyles}>{channels.length}</span>
    </div>
  )
}
TeamCountStripe.contextTypes = { theme: PropTypes.object }
