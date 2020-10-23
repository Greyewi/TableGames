import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AsideDrawer from '../../shared/ui/Drawer'
import EditEventForm from './forms/EditEventForm'

const EventCard = props => {
  const {
    handleChangeEvent,
    setActiveEvent,
    onClose,
    onRemove,
    name = 'name of event',
    isCompleted,
  } = props

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={isCompleted}/>
        <ListItemSecondaryAction>
          <AsideDrawer anchorName={name}>
            <EditEventForm onSubmit={handleChangeEvent} onClose={onClose}  />
          </AsideDrawer>
          <IconButton edge="end" aria-label="edit" onClick={setActiveEvent}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default EventCard
