import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  initEventsList,
  addEventToList,
  removeEventFromList,
  setActiveEvent,
  changeActiveEvent,
  eventsListSelector,
} from 'ducks/events'

const Events = ({ initEventsList, eventsList }) => {
  useEffect(() => {
    initEventsList()
  }, [initEventsList])

  return <main>Events</main>
}

export default connect(
  state => ({
    eventsList: eventsListSelector(state),
  }),
  {
    initEventsList,
    addEventToList,
    removeEventFromList,
    setActiveEvent,
    changeActiveEvent,
  }
)(Events)
