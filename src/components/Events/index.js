import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setActiveDraw } from 'shared/ui/Drawer/drawDuck'
import CreateEvent from './CreateEvent'
import MaterialDataList from 'shared/ui/MaterialDataList'
import EditEventForm from './forms/EditEventForm'

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
  setActiveEvent,
  ...props
}) => {
  useEffect(() => {
    initEventsList()
  }, [initEventsList])

  const handleCreateEvent = ({ name }) => addEventToList({ name })

  return (
    <main>
      <CreateEvent onSubmit={handleCreateEvent} {...props} />
      <MaterialDataList
        setActiveItem={setActiveEvent}
        onRemove={removeEventFromList}
        itemsList={eventsList}
      >
        <EditEventForm
          onSubmit={item => changeActiveEvent({ ...item })}
          onClose={() => setActiveEvent(null)}
        />
      </MaterialDataList>
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
