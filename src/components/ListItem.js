import React from 'react'
import { IoIosTrash } from 'react-icons/io'
import Icon from 'react-uwp/Icon'

const trashStyle = {
  fontSize: '18px',
  pointerEvents: 'none',
}

export const ListItem = ({ channel, onRemoveChannel, index }) => (
  <div key={index}>
    {channel.display_name}{' '}
    <Icon
      onClick={onRemoveChannel}
      data-testid="trash-can"
      data-channel-index={index}
    >
      <IoIosTrash style={trashStyle} />
    </Icon>
  </div>
)
