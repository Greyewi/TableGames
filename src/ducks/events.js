import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { all, take, put, select } from 'redux-saga/effects'
import { remove } from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import { SET_ACTIVE_DRAW_REQUEST } from '../shared/ui/Drawer/drawDuck'

/**
 * Constants
 * */

export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const INIT_EVENTS_REQUEST = `${prefix}/INIT_EVENTS_REQUEST`,
  INIT_EVENTS_SUCCESS = `${prefix}/INIT_EVENTS_SUCCESS`,
  REMOVE_EVENT_REQUEST = `${prefix}/REMOVE_EVENT_REQUEST`,
  REMOVE_EVENT_SUCCESS = `${prefix}/REMOVE_EVENT_SUCCESS`,
  CREATE_EVENT_REQUEST = `${prefix}/CREATE_EVENT_REQUEST`,
  CREATE_EVENT_SUCCESS = `${prefix}/CREATE_EVENT_SUCCESS`,
  SET_ACTIVE_EVENT_REQUEST = `${prefix}/SET_ACTIVE_EVENT_REQUEST`,
  SET_ACTIVE_EVENT_SUCCESS = `${prefix}/SET_ACTIVE_EVENT_SUCCESS`,
  CHANGE_ACTIVE_EVENT_REQUEST = `${prefix}/CHANGE_ACTIVE_EVENT_REQUEST`,
  CHANGE_ACTIVE_EVENT_SUCCESS = `${prefix}/CHANGE_ACTIVE_EVENT_SUCCESS`,
  COMPLETE_ACTIVE_EVENT_REQUEST = `${prefix}/COMPLETE_ACTIVE_EVENT_REQUEST`, // for narrative mode
  COMPLETE_ACTIVE_EVENT_SUCCESS = `${prefix}/COMPLETE_ACTIVE_EVENT_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  eventList: [],
  activeEvent: {
    name: '',
    conditions: [], // different states, then satisfy the conditions
    effects: [], // functions with changes others models, (with nested conditions)
    isCompleted: 0,
  },
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case INIT_EVENTS_SUCCESS:
    case REMOVE_EVENT_SUCCESS:
    case CREATE_EVENT_SUCCESS:
      return state.set('eventList', payload)
    case CHANGE_ACTIVE_EVENT_SUCCESS:
      return state.set('eventList', payload)
    case SET_ACTIVE_EVENT_SUCCESS:
      return state.set('activeEvent', payload)
    case COMPLETE_ACTIVE_EVENT_SUCCESS:
      return state.setIn(['activeEvent', 'isCompleted'], payload)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const eventsListSelector = createSelector(
  stateSelector,
  state => state.eventList
)
export const activeEventSelector = createSelector(
  stateSelector,
  state => state.activeEvent
)
export const activeEventNameSelector = createSelector(
  activeEventSelector,
  state => state.name
)
export const activeEventConditionsSelector = createSelector(
  activeEventSelector,
  state => state.conditions
)
export const activeEventEffectsSelector = createSelector(
  activeEventSelector,
  state => state.effects
)
export const activeEventIsCompletedSelector = createSelector(
  activeEventSelector,
  state => state.isCompleted
)

/**
 * Action Creators
 * */

export const initEventsList = () => ({ type: INIT_EVENTS_REQUEST })
export const addEventToList = event => ({
  type: CREATE_EVENT_REQUEST,
  payload: event,
})
export const removeEventFromList = eventName => ({
  type: REMOVE_EVENT_REQUEST,
  payload: eventName,
})
export const setActiveEvent = event => ({
  type: SET_ACTIVE_EVENT_REQUEST,
  payload: event,
})
export const changeActiveEvent = (event, id) => {
  return {
    type: CHANGE_ACTIVE_EVENT_REQUEST,
    payload: {event, id},
  }
}
export const changeEventCompleteStatus = isComplete => ({
  type: COMPLETE_ACTIVE_EVENT_REQUEST,
  payload: isComplete,
})

/**
 * Sagas
 * */

export const changeEventCompleteStatusSaga = function* () {
  while (true) {
    const { payload } = yield take(COMPLETE_ACTIVE_EVENT_REQUEST)

    try {
      yield put({
        type: COMPLETE_ACTIVE_EVENT_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const changeActiveEventSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_ACTIVE_EVENT_REQUEST)
    const events = cloneDeep(yield select(eventsListSelector))

    events.map((item, key) =>
      payload.id === key ? (events[key] = payload.event) : false
    )
    localStorage.setItem('eventList', JSON.stringify(events))

    try {
      yield put({
        type: CHANGE_ACTIVE_EVENT_SUCCESS,
        payload: events,
      })
      yield put({
        type: SET_ACTIVE_DRAW_REQUEST,
        payload: '',
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const setActiveEventSaga = function* () {
  while (true) {
    const { payload } = yield take(SET_ACTIVE_EVENT_REQUEST)

    try {
      yield put({
        type: SET_ACTIVE_DRAW_REQUEST,
        payload: payload ? payload.name : '',
      })
      yield put({
        type: SET_ACTIVE_EVENT_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeEventFromListSaga = function* () {
  while (true) {
    const { payload } = yield take(REMOVE_EVENT_REQUEST)
    const events = yield select(eventsListSelector)
    const newEvents = remove(events, item => item.name === payload.name)

    try {
      yield put({
        type: REMOVE_EVENT_SUCCESS,
        payload: newEvents,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const addEventToListSaga = function* () {
  while (true) {
    const { payload } = yield take(CREATE_EVENT_REQUEST)
    const events = cloneDeep(yield select(eventsListSelector))
    events.push(payload)

    localStorage.setItem('eventList', JSON.stringify(events))

    try {
      yield put({
        type: CREATE_EVENT_SUCCESS,
        payload: events,
      })
      yield put({
        type: SET_ACTIVE_DRAW_REQUEST,
        payload: '',
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const initEventsListSaga = function* () {
  while (true) {
    yield take(INIT_EVENTS_REQUEST)
    const eventList = localStorage.eventList || '[]'

    try {
      yield put({
        type: INIT_EVENTS_SUCCESS,
        payload: eventList,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const saga = function* () {
  yield all([
    initEventsListSaga(),
    addEventToListSaga(),
    setActiveEventSaga(),
    changeActiveEventSaga(),
    removeEventFromListSaga(),
    changeEventCompleteStatusSaga(),
  ])
}
