import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { all, take, put, select } from 'redux-saga/effects'
import cloneDeep from 'lodash/cloneDeep'

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
  CHANGE_ACTIVE_CHARACTER_REQUEST = `${prefix}/CHANGE_ACTIVE_CHARACTER_REQUEST`,
  CHANGE_ACTIVE_CHARACTER_SUCCESS = `${prefix}/CHANGE_ACTIVE_CHARACTER_SUCCESS`

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
    case CHANGE_ACTIVE_CHARACTER_SUCCESS:
      return state.set('charactersList', payload)
    case SET_ACTIVE_CHARACTER_SUCCESS:
      return state.set('activeCharacter', payload)
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

export function changeCharacter(character, id) {
  return {
    type: CHANGE_ACTIVE_CHARACTER_REQUEST,
    payload: { character, id },
  }
}

/**
 * Sagas
 * */

export const changeActiveCharacterSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_ACTIVE_CHARACTER_REQUEST)

    try {
      const characters = cloneDeep(yield select(charactersListSelector))
      characters.map((item, key) =>
        payload.id === key ? (characters[key] = payload.character) : false
      )
      localStorage.setItem('charactersList', JSON.stringify(characters))

      yield put({
        type: CHANGE_ACTIVE_CHARACTER_SUCCESS,
        payload: characters,
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
      const characters = cloneDeep(yield select(charactersListSelector))
      characters.splice(payload.id, 1)
      localStorage.setItem('charactersList', JSON.stringify(characters))

      yield put({
        type: REMOVE_CHARACTER_REQUEST,
        payload: characters,
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
      const characters = cloneDeep(yield select(charactersListSelector))
      characters.push(payload)
      localStorage.setItem('charactersList', JSON.stringify(characters))

      yield put({
        type: CREATE_CHARACTER_SUCCESS,
        payload: characters,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const initCharactersListSaga = function* () {
  while (true) {
    yield take(INIT_CHARACTERS_DATA_REQUEST)

    // [{
    //   name: 'Chrono',
    //   stats: [],
    //   history: '',
    //   equipment: ['sword', 'rainbowHelm'],
    // },
    // {
    //   name: 'Lucca',
    //   stats: [],
    //   history: '',
    //   equipment: ['gun', 'rainbowHelm'],
    // }]

    try {
      const charactersList = localStorage.charactersList || '[]'

      yield put({
        type: INIT_CHARACTERS_DATA_SUCCESS,
        payload: JSON.parse(charactersList),
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
    changeActiveCharacterSaga(),
  ])
}
