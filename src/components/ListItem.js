import React from 'react'
import { IoIosTrash } from 'react-icons/io'
import Icon from 'react-uwp/Icon'

const trashStyle = {
  fontSize: '18px',
  pointerEvents: 'none',
}

export const ListItem = ({ channel, onRemoveChannel }) => (
  <div key={channel.display_name}>
    {channel.display_name}{' '}
    <Icon
      onClick={onRemoveChannel}
      data-testid="trash-can"
      data-channel={channel.id}
    >
      <IoIosTrash style={trashStyle} />
    </Icon>
  </div>
)
