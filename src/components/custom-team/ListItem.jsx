import PropTypes from 'prop-types'
import React from 'react'
import { IoIosTrash } from 'react-icons/io'
import Icon from 'react-uwp/Icon'

const trashStyle = {
  fontSize: '18px',
  pointerEvents: 'none',
}

const ListItem = ({ channel, onClick }) => <div key={channel.name}>
    {channel.name}{' '}
    <Icon onClick={onClick} data-testid="trash-can" data-channel={channel.name}>
      <IoIosTrash style={trashStyle} />
    </Icon>
  </div>

ListItem.propType = {
  channel: PropTypes.object,
  onClick: PropTypes.func,
}

export default ListItem
