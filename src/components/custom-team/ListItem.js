import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-uwp/Icon'
import { IoIosTrash } from 'react-icons/io'

const trashStyle = {
  fontSize: '18px',
  pointerEvents: 'none',
}

const ListItem = ({ channel, onClick }) => (
  <div key={channel.name}>
    {channel.name}{' '}
    <Icon onClick={onClick} data-testid="trash-can" data-channel={channel.name}>
      <IoIosTrash style={trashStyle} />
    </Icon>
  </div>
)

ListItem.propType = {
  channel: PropTypes.object,
  onClick: PropTypes.func,
}

export default ListItem
