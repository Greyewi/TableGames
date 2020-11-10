import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setActiveDraw } from 'shared/ui/Drawer/drawDuck'
import CreateEvent from './CreateEvent'
import MaterialDataList from '../../shared/ui/MaterialDataList'
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
        handleChangeItem={changeActiveEvent}
        onRemove={removeEventFromList}
        itemsList={eventsList}
        setActiveItem={setActiveEvent}
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
