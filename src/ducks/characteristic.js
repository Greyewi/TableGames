import {appName} from '../config'
import {Record} from 'immutable'
import {createSelector} from 'reselect'
import {all, take, put, select} from 'redux-saga/effects'
import cloneDeep from "lodash/cloneDeep"

/**
 * Constants
 * */

export const moduleName = 'characteristic'
const prefix = `${appName}/${moduleName}`
export const
  INIT_CHARACTERISTICS_DATA_REQUEST = `${prefix}/INIT_CHARACTERISTICS_DATA_REQUEST`,
  INIT_CHARACTERISTICS_DATA_SUCCESS = `${prefix}/INIT_CHARACTERISTICS_DATA_SUCCESS`,
  CREATE_CHARACTERISTIC_DATA_REQUEST = `${prefix}/CREATE_CHARACTERISTIC_DATA_REQUEST`,
  CREATE_CHARACTERISTIC_DATA_SUCCESS = `${prefix}/CREATE_CHARACTERISTIC_DATA_SUCCESS`,
  SET_ACTIVE_CHARACTERISTIC_REQUEST = `${prefix}/SET_ACTIVE_CHARACTERISTIC_REQUEST`,
  SET_ACTIVE_CHARACTERISTIC_SUCCESS = `${prefix}/SET_ACTIVE_CHARACTERISTIC_SUCCESS`,
  REMOVE_ACTIVE_CHARACTERISTIC_REQUEST = `${prefix}/REMOVE_ACTIVE_CHARACTERISTIC_REQUEST`,
  REMOVE_ACTIVE_CHARACTERISTIC_SUCCESS = `${prefix}/REMOVE_ACTIVE_CHARACTERISTIC_SUCCESS`,
  CHANGE_ACTIVE_CHARACTERISTIC_REQUEST = `${prefix}/CHANGE_ACTIVE_CHARACTERISTIC_REQUEST`,
  CHANGE_ACTIVE_CHARACTERISTIC_SUCCESS = `${prefix}/CHANGE_ACTIVE_CHARACTERISTIC_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  characteristicsList: [],
  activeCharacteristic: {
    name: '',
    unit: '',
    minValue: 0,
    maxValue: 100
  }
})

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action
  switch (type) {
    case INIT_CHARACTERISTICS_DATA_SUCCESS:
    case CHANGE_ACTIVE_CHARACTERISTIC_SUCCESS:
    case REMOVE_ACTIVE_CHARACTERISTIC_SUCCESS:
      return state.set('characteristicsList', payload)
    case SET_ACTIVE_CHARACTERISTIC_SUCCESS:
      return state.set('activeCharacteristic', payload)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const characteristicsListSelector = createSelector(stateSelector, state => state.characteristicsList)
export const activeCharacteristicSelector = createSelector(stateSelector, state => state.activeCharacteristic)

/**
 * Action Creators
 * */

export const initCharacteristicList = () => ({type: INIT_CHARACTERISTICS_DATA_REQUEST})
export const setActiveCharacteristic = characteristic => ({
  type: SET_ACTIVE_CHARACTERISTIC_REQUEST,
  payload: characteristic
})
export const changeActiveCharacteristic = characteristic => ({
  type: CHANGE_ACTIVE_CHARACTERISTIC_REQUEST,
  payload: characteristic
})
export const removeCharacteristic = characteristicId => ({
  type: REMOVE_ACTIVE_CHARACTERISTIC_REQUEST,
  payload: characteristicId
})
export const createCharacteristic = characteristic => ({
  type: CREATE_CHARACTERISTIC_DATA_REQUEST,
  payload: characteristic
})

/**
 * Sagas
 * */

export const removeCharacteristicSaga = function* () {
  while (true) {
    const {payload} = yield take(CHANGE_ACTIVE_CHARACTERISTIC_REQUEST)
    const characteristics = cloneDeep(yield select(characteristicsListSelector))
    characteristics.filter(f => payload !== f.key)

    try {
      yield put({
        type: CHANGE_ACTIVE_CHARACTERISTIC_SUCCESS,
        payload: characteristics
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const changeActiveCharacteristicSaga = function* () {
  while (true) {
    const {payload} = yield take(CHANGE_ACTIVE_CHARACTERISTIC_REQUEST)

    const characteristics = cloneDeep(yield select(characteristicsListSelector))
    characteristics.map((item, key) => payload.id === key ? characteristics[key] = payload.game : false)
    localStorage.setItem('characteristicList', JSON.stringify(characteristics))

    try {
      yield put({
        type: CHANGE_ACTIVE_CHARACTERISTIC_SUCCESS,
        payload: characteristics
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const setActiveCharacteristicSaga = function* () {
  while (true) {
    const {payload} = yield take(SET_ACTIVE_CHARACTERISTIC_REQUEST)

    try {
      yield put({
        type: SET_ACTIVE_CHARACTERISTIC_SUCCESS,
        payload: payload
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const createCharacteristicSaga = function* () {
  while (true) {
    const {payload} = yield take(CREATE_CHARACTERISTIC_DATA_REQUEST)

    try {
      const characteristics = cloneDeep(yield select(characteristicsListSelector))
      characteristics.push(payload)
      localStorage.setItem('characteristicList', JSON.stringify(characteristics))
      yield put({
        type: CREATE_CHARACTERISTIC_DATA_SUCCESS,
        payload: characteristics
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const initCharacteristicListSaga = function* () {
  while (true) {
    yield take(INIT_CHARACTERISTICS_DATA_REQUEST)
    const characteristicList = localStorage.characteristicList || "[]"
    try {
      yield put({
        type: INIT_CHARACTERISTICS_DATA_SUCCESS,
        payload: [JSON.parse(characteristicList)]
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const saga = function* () {
  yield all([
    changeActiveCharacteristicSaga(),
    setActiveCharacteristicSaga(),
    initCharacteristicListSaga(),
    createCharacteristicSaga(),
    removeCharacteristicSaga(),
  ])
}