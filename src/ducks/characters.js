import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { all, take, put } from 'redux-saga/effects'

/**
 * Constants
 * */

export const moduleName = 'сharacters'
const prefix = `${appName}/${moduleName}`
export const INIT_CHARACTERS_DATA_REQUEST = `${prefix}/INIT_CHARACTERS_DATA_REQUEST`,
  INIT_CHARACTERS_DATA_SUCCESS = `${prefix}/INIT_CHARACTERS_DATA_SUCCESS`,
  REMOVE_CHARACTER_REQUEST = `${prefix}/REMOVE_CHARACTER_REQUEST`,
  REMOVE_CHARACTER_SUCCESS = `${prefix}/REMOVE_CHARACTER_SUCCESS`,
  CREATE_CHARACTER_REQUEST = `${prefix}/CREATE_CHARACTER_REQUEST`,
  CREATE_CHARACTER_SUCCESS = `${prefix}/CREATE_CHARACTER_SUCCESS`,
  SET_ACTIVE_CHARACTER_REQUEST = `${prefix}/SET_ACTIVE_CHARACTER_REQUEST`,
  SET_ACTIVE_CHARACTER_SUCCESS = `${prefix}/SET_ACTIVE_CHARACTER_SUCCESS`,
  CHANGE_CHARACTER_STATS_REQUEST = `${prefix}/CHANGE_CHARACTER_STATS_REQUEST`,
  CHANGE_CHARACTER_STATS_SUCCESS = `${prefix}/CHANGE_CHARACTER_STATS_SUCCESS`,
  CHANGE_CHARACTER_NAME_REQUEST = `${prefix}/CHANGE_CHARACTER_NAME_REQUEST`,
  CHANGE_CHARACTER_NAME_SUCCESS = `${prefix}/CHANGE_CHARACTER_NAME_SUCCESS`,
  CHANGE_CHARACTER_HISTORY_REQUEST = `${prefix}/CHANGE_CHARACTER_HISTORY_REQUEST`,
  CHANGE_CHARACTER_HISTORY_SUCCESS = `${prefix}/CHANGE_CHARACTER_HISTORY_SUCCESS`,
  CHANGE_CHARACTER_EQUIPMENT_REQUEST = `${prefix}/CHANGE_CHARACTER_EQUIPMENT_REQUEST`,
  CHANGE_CHARACTER_EQUIPMENT_SUCCESS = `${prefix}/CHANGE_CHARACTER_EQUIPMENT_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  charactersList: [],
  activeCharacter: {
    name: '',
    stats: [],
    history: '',
    equipment: [],
  },
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case INIT_CHARACTERS_DATA_SUCCESS:
    case REMOVE_CHARACTER_SUCCESS:
    case CREATE_CHARACTER_SUCCESS:
      return state.set('charactersList', payload)
    case SET_ACTIVE_CHARACTER_SUCCESS:
      return state.set('activeCharacter', payload)
    case CHANGE_CHARACTER_NAME_SUCCESS:
      return state.setIn(['activeCharacter', 'name'], payload)
    case CHANGE_CHARACTER_STATS_SUCCESS:
      return state.setIn(['activeCharacter', 'stats'], payload)
    case CHANGE_CHARACTER_HISTORY_SUCCESS:
      return state.setIn(['activeCharacter', 'history'], payload)
    case CHANGE_CHARACTER_EQUIPMENT_SUCCESS:
      return state.setIn(['activeCharacter', 'equipment'], payload)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const charactersListSelector = createSelector(
  stateSelector,
  state => state.charactersList
)
export const activeCharacterSelector = createSelector(
  stateSelector,
  state => state.activeCharacter
)
export const nameCharacterSelector = createSelector(
  activeCharacterSelector,
  state => state.name
)
export const statsCharacterSelector = createSelector(
  activeCharacterSelector,
  state => state.stats
)
export const historyCharacterSelector = createSelector(
  activeCharacterSelector,
  state => state.history
)
export const equipmentCharacterSelector = createSelector(
  activeCharacterSelector,
  state => state.equipment
)

/**
 * Action Creators
 * */

export function initCharactersList() {
  return {
    type: INIT_CHARACTERS_DATA_REQUEST,
  }
}

export function removeCharacter(name) {
  return {
    type: REMOVE_CHARACTER_REQUEST,
    payload: name,
  }
}

export function createCharacter(character) {
  return {
    type: CREATE_CHARACTER_REQUEST,
    payload: character,
  }
}

export function changeCharacterState(state) {
  return {
    type: CHANGE_CHARACTER_STATS_REQUEST,
    payload: state,
  }
}

export function changeCharacterName(state) {
  return {
    type: CHANGE_CHARACTER_NAME_REQUEST,
    payload: state,
  }
}

export function changeCharacterHistory(state) {
  return {
    type: CHANGE_CHARACTER_HISTORY_REQUEST,
    payload: state,
  }
}

export function changeCharacterEquipment(equipment) {
  return {
    type: CHANGE_CHARACTER_EQUIPMENT_REQUEST,
    payload: equipment,
  }
}

/**
 * Sagas
 * */

export const changeCharacterEquipmentSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_CHARACTER_EQUIPMENT_REQUEST)

    try {
      yield put({
        type: CHANGE_CHARACTER_EQUIPMENT_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const changeCharacterHistorySaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_CHARACTER_HISTORY_REQUEST)

    try {
      yield put({
        type: CHANGE_CHARACTER_HISTORY_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const changeCharacterNameSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_CHARACTER_NAME_REQUEST)

    try {
      yield put({
        type: CHANGE_CHARACTER_NAME_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const changeCharacterStateSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_CHARACTER_STATS_REQUEST)

    try {
      yield put({
        type: CHANGE_CHARACTER_STATS_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeCharacterSaga = function* () {
  while (true) {
    const { payload } = yield take(REMOVE_CHARACTER_REQUEST)

    try {
      yield put({
        type: REMOVE_CHARACTER_REQUEST,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const createCharacterSaga = function* () {
  while (true) {
    const { payload } = yield take(CREATE_CHARACTER_REQUEST)

    try {
      yield put({
        type: CREATE_CHARACTER_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const initCharactersListSaga = function* () {
  while (true) {
    yield take(INIT_CHARACTERS_DATA_REQUEST)

    try {
      yield put({
        type: INIT_CHARACTERS_DATA_SUCCESS,
        payload: [
          {
            name: 'Chrono',
            stats: [],
            history: '',
            equipment: ['sword', 'rainbowHelm'],
          },
          {
            name: 'Lucca',
            stats: [],
            history: '',
            equipment: ['gun', 'rainbowHelm'],
          },
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const saga = function* () {
  yield all([
    createCharacterSaga(),
    removeCharacterSaga(),
    initCharactersListSaga(),
    changeCharacterNameSaga(),
    changeCharacterStateSaga(),
    changeCharacterHistorySaga(),
    changeCharacterEquipmentSaga(),
  ])
}
