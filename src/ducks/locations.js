import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { all, take, put, select } from 'redux-saga/effects'
import cloneDeep from 'lodash/cloneDeep'

/**
 * Constants
 * */

export const moduleName = 'locations'
const prefix = `${appName}/${moduleName}`
export const INIT_LOCATIONS_REQUEST = `${prefix}/INIT_LOCATIONS_REQUEST`,
  INIT_LOCATIONS_SUCCESS = `${prefix}/INIT_LOCATIONS_SUCCESS`,
  SET_ACTIVE_LOCATION_REQUEST = `${prefix}/SET_ACTIVE_LOCATION_REQUEST`,
  SET_ACTIVE_LOCATION_SUCCESS = `${prefix}/SET_ACTIVE_LOCATION_SUCCESS`,
  ADD_LOCATION_TO_LIST_REQUEST = `${prefix}/ADD_LOCATION_TO_LIST_REQUEST`,
  ADD_LOCATION_TO_LIST_SUCCESS = `${prefix}/ADD_LOCATION_TO_LIST_SUCCESS`,
  CHANGE_ACTIVE_LOCATION_REQUEST = `${prefix}/CHANGE_ACTIVE_LOCATION_REQUEST`, // actions with active location
  CHANGE_ACTIVE_LOCATION_SUCCESS = `${prefix}/CHANGE_ACTIVE_LOCATION_SUCCESS`,
  REMOVE_LOCATION_REQUEST = `${prefix}/REMOVE_LOCATION_REQUEST`, // actions with active location
  REMOVE_LOCATION_SUCCESS = `${prefix}/REMOVE_LOCATION_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  locationList: [],
  activeLocation: {
    name: '',
    movements: [], // other location names
    events: [], // names, from event model
    map: '', // url to img
    backMusic: '', // url to background music
  },
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case INIT_LOCATIONS_SUCCESS:
    case ADD_LOCATION_TO_LIST_SUCCESS:
    case CHANGE_ACTIVE_LOCATION_SUCCESS:
      return state.set('locationList', payload)
    case SET_ACTIVE_LOCATION_SUCCESS:
      return state.set('activeLocation', payload)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const locationsListSelector = createSelector(
  stateSelector,
  state => state.locationList
)
export const activeLocationSelector = createSelector(
  stateSelector,
  state => state.activeLocation
)
/**
 * Action Creators
 * */

export const initLocationsList = () => ({ type: INIT_LOCATIONS_REQUEST })

export function setActiveLocation(name) {
  return {
    type: SET_ACTIVE_LOCATION_REQUEST,
    payload: name,
  }
}

export function addNewLocation(location) {
  return {
    type: ADD_LOCATION_TO_LIST_REQUEST,
    payload: location,
  }
}

export function changeActiveLocation(location) {
  return {
    type: CHANGE_ACTIVE_LOCATION_REQUEST,
    payload: location,
  }
}

export const removeActiveLocation = () => ({ type: REMOVE_LOCATION_REQUEST })

/**
 * Sagas
 * */

export const removeActiveLocationSaga = function* () {
  while (true) {
    yield take(REMOVE_LOCATION_REQUEST)

    try {
      const activeLocation = cloneDeep(yield select(activeLocationSelector))

      yield put({
        type: REMOVE_LOCATION_SUCCESS,
        payload: activeLocation,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const changeActiveLocationSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_ACTIVE_LOCATION_REQUEST)
    try {
      yield put({
        type: CHANGE_ACTIVE_LOCATION_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const addNewLocationSaga = function* () {
  while (true) {
    const { payload } = yield take(ADD_LOCATION_TO_LIST_REQUEST)

    try {
      const locationsList = cloneDeep(yield select(locationsListSelector))
      locationsList.push(payload)
      localStorage.setItem('locationsList', JSON.stringify(locationsList))

      yield put({
        type: ADD_LOCATION_TO_LIST_SUCCESS,
        payload: locationsList,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const initLocationsListSaga = function* () {
  while (true) {
    yield take(INIT_LOCATIONS_REQUEST)

    try {
      const locationsList = localStorage.locationsList || '[]'

      // [{
      //   name: 'Fair_1000',
      //   movements: ['world_1000', 'canyon_400'],
      //   events: [1, 2, 3],
      //   map: 'https://desktopgaming.com/desktops/thumbnails/101.jpg',
      // }]

      yield put({
        type: INIT_LOCATIONS_SUCCESS,
        payload: JSON.parse(locationsList),
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const saga = function* () {
  yield all([
    addNewLocationSaga(),
    initLocationsListSaga(),
    removeActiveLocationSaga(),
    changeActiveLocationSaga(),
  ])
}
