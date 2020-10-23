import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setActiveDraw } from 'shared/ui/Drawer/drawDuck'
import CreateEvent from './CreateEvent'
import EventsList from './EventsList'
import {
  initEventsList,
  addEventToList,
  removeEventFromList,
  setActiveEvent,
  changeActiveEvent,
  eventsListSelector,
} from 'ducks/events'

const Events = ({
  initEventsList,
  changeActiveEvent,
  addEventToList,
  removeEventFromList,
  eventsList,
  ...props
}) => {

  useEffect(() => {
    initEventsList()
  }, [initEventsList])

  const handleCreateEvent = ({ name }) => addEventToList({ name })

  return (
    <main>
      <CreateEvent onSubmit={handleCreateEvent} {...props} />
      <EventsList
        handleChangeEvent={changeActiveEvent}
        onRemove={removeEventFromList}
        eventsList={eventsList}
        {...props}
      />
    </main>
  )
}

export default connect(
  state => ({
    eventsList: eventsListSelector(state),
  }),
  {
    setActiveDraw,
    initEventsList,
    addEventToList,
    removeEventFromList,
    setActiveEvent,
    changeActiveEvent,
  }
)(Events)
