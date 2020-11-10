import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import FolderIcon from '@material-ui/icons/Folder'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import AsideDrawer from '../Drawer'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import List from '@material-ui/core/List'
import MaterialModal from '../MaterialModal'
import { Button } from '@material-ui/core'

const MaterialDataList = ({
  setActiveItem,
  onRemove,
  itemsList = [],
  children,
}) => {
  const [isOpen, setIsOpen] = useState(null)

  return itemsList.map(item => {
    const handleRemove = () => {
      setIsOpen(() => {
        onRemove(isOpen)
        return null
      })
    }

    return (
      <List key={item.name}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} />
          <ListItemSecondaryAction>
            <AsideDrawer anchorName={item.name}>{children}</AsideDrawer>
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
              onClick={() => setIsOpen(item)}
            >
              <DeleteIcon />
            </IconButton>
            <MaterialModal
              anchorName={item.name}
              open={!!isOpen}
              handleClose={() => setIsOpen(null)}
            >
              <>
                <div>Seriously?</div>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setIsOpen(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleRemove}
                >
                  Confirm
                </Button>
              </>
            </MaterialModal>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    )
  })
}

export default MaterialDataList
