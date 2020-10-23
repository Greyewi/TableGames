import React from 'react'
import EventCard from './EventCard'

const EventsList = ({ setActiveEvent, handleChangeEvent, onRemove, eventsList = [] }) => eventsList.map((event, key) =>
  <EventCard
    key={`${key}${event.name}`}
    setActiveEvent={() => setActiveEvent(event)}
    handleChangeEvent={event => handleChangeEvent({...event}, key)}
    onRemove={onRemove}
    onClose={() => setActiveEvent(null)}
    {...event}
  />
)

export default EventsList
