import React from 'react'
import Button from '@material-ui/core/Button'
import { AddEventContainer } from './style'
import Typography from '@material-ui/core/Typography'
import AsideDrawer from '../../shared/ui/Drawer'
import CreateEventForm from './forms/CreateEventForm'

const CreateEvent = ({ setActiveDraw, ...props }) => {
  return (
    <AddEventContainer>
      <Typography variant="h5">Events</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setActiveDraw('createEvent')}
      >
        Create new Event
      </Button>
      <AsideDrawer anchorName={'createEvent'}>
        <CreateEventForm onClose={() => setActiveDraw('')} {...props} />
      </AsideDrawer>
    </AddEventContainer>
  )
}

export default CreateEvent
