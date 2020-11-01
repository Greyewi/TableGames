import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import FolderIcon from '@material-ui/icons/Folder'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import AsideDrawer from '../Drawer'
import EditEventForm from '../../../components/Events/forms/EditEventForm'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import List from '@material-ui/core/List'
import MaterialModal from '../MaterialModal'
import { Button } from '@material-ui/core'

const MaterialDataList = ({
  setActiveItem,
  setActiveModal,
  handleChangeItem,
  onRemove,
  itemsList = [],
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return itemsList.map((item, key) => (
    <List key={key}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} />
        <ListItemSecondaryAction>
          <AsideDrawer anchorName={item.name}>
            <EditEventForm
              onSubmit={item => handleChangeItem({ ...item }, key)}
              onClose={() => setActiveItem(null)}
            />
          </AsideDrawer>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => setActiveItem(item)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setIsOpen(true)}
          >
            <DeleteIcon />
          </IconButton>

          <MaterialModal
            anchorName={item.name}
            open={isOpen}
            handleClose={() => setIsOpen(false)}
          >
            <>
              <div>Удалить с концами?</div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  onRemove(item)
                  setIsOpen(false)
                }}
              >
                Confirm
              </Button>
            </>
          </MaterialModal>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  ))
}

export default MaterialDataList
