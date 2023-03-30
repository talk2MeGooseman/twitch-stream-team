import React from 'react'
import { IoIosTrash } from 'react-icons/io'
import Icon from 'react-uwp/Icon'

const trashStyle = {
  fontSize: '18px',
  pointerEvents: 'none',
}

type ListItemProps = {
  channel: TeamMemberSpecType,
  onClick: (e: React.MouseEvent) => void,
}

const ListItem = ({ channel, onClick }: ListItemProps) => <div key={channel.name}>
  {channel.name}{' '}
  <Icon onClick={onClick} data-testid="trash-can" data-channel={channel.name}>
    <IoIosTrash style={trashStyle} />
  </Icon>
</div>

export default ListItem
