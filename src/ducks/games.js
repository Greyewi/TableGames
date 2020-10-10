import {appName} from '../config'
import {Record} from 'immutable'
import {createSelector} from 'reselect'
import {all, put, select, take} from 'redux-saga/effects'
import cloneDeep from 'lodash/cloneDeep'
import {SET_ACTIVE_DRAW_REQUEST} from 'shared/ui/Drawer/drawDuck'

/**
 * Constants
 * */

export const moduleName = 'games'
const prefix = `${appName}/${moduleName}`
export const
  INIT_GAMES_REQUEST = `${prefix}/INIT_GAMES_REQUEST`,
  INIT_GAMES_SUCCESS = `${prefix}/INIT_GAMES_SUCCESS`,
  SET_ACTIVE_GAME_REQUEST = `${prefix}/SET_ACTIVE_GAME_REQUEST`,
  SET_ACTIVE_GAME_SUCCESS = `${prefix}/SET_ACTIVE_GAME_SUCCESS`,
  CHANGE_ACTIVE_GAME_REQUEST = `${prefix}/CHANGE_ACTIVE_GAME_REQUEST`,
  CHANGE_ACTIVE_GAME_SUCCESS = `${prefix}/CHANGE_ACTIVE_GAME_SUCCESS`,
  REMOVE_GAME_REQUEST = `${prefix}/REMOVE_GAME_REQUEST`,
  REMOVE_GAME_SUCCESS = `${prefix}/REMOVE_GAME_SUCCESS`,
  CREATE_GAME_REQUEST = `${prefix}/CREATE_GAME_REQUEST`,
  CREATE_GAME_SUCCESS = `${prefix}/CREATE_GAME_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  gameList: [],
  activeGame: {
    name: '',
    genre: '',
    description: '',
    logo: '',
    countGamers: 0
  }
})

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action

  switch (type) {
    case INIT_GAMES_SUCCESS:
    case REMOVE_GAME_SUCCESS:
    case CREATE_GAME_SUCCESS:
      return state.set('gameList', payload)
    case SET_ACTIVE_GAME_SUCCESS:
      return state.set('activeGame', payload)
    case CHANGE_ACTIVE_GAME_SUCCESS:
      return state.set('gameList', payload)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const gamesListSelector = createSelector(stateSelector, state => state.gameList)
export const activeGameSelector = createSelector(stateSelector, state => state.activeGame)
export const activeGameNameSelector = createSelector(activeGameSelector, state => state.name)
export const activeGameGenreSelector = createSelector(activeGameSelector, state => state.genre)
export const activeGameDescriptionSelector = createSelector(activeGameSelector, state => state.description)
export const activeGameCountGamersSelector = createSelector(activeGameSelector, state => state.countGamers)

/**
 * Action Creators
 * */

export function initGamesList() {
  return {
    type: INIT_GAMES_REQUEST
  }
}

export function createGame(gameData) {
  return {
    type: CREATE_GAME_REQUEST,
    payload: gameData
  }
}

export function setActiveGame(game) {
  return {
    type: SET_ACTIVE_GAME_REQUEST,
    payload: game
  }
}

export function changeActiveGame(game, id) {
  return {
    type: CHANGE_ACTIVE_GAME_REQUEST,
    payload: {game, id}
  }
}

/**
 * Sagas
 * */

export const changeActiveGameSaga = function* () {
  while (true) {
    const {payload} = yield take(CHANGE_ACTIVE_GAME_REQUEST)

    try {
      const games = cloneDeep(yield select(gamesListSelector))
      games.map((item, key) => payload.id === key ? games[key] = payload.game : false)
      localStorage.setItem('gamesList', JSON.stringify(games))

      yield put({
        type: SET_ACTIVE_DRAW_REQUEST,
        payload: ''
      })
      yield put({
        type: CHANGE_ACTIVE_GAME_SUCCESS,
        payload: games
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const setActiveGameSaga = function* () {
  while (true) {
    const {payload} = yield take(SET_ACTIVE_GAME_REQUEST)
    try {
      yield put({
        type: SET_ACTIVE_DRAW_REQUEST,
        payload: payload ? payload.name : ''
      })
      yield put({
        type: SET_ACTIVE_GAME_SUCCESS,
        payload: payload
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const createGameSaga = function* () {
  while (true) {
    const {payload} = yield take(CREATE_GAME_REQUEST)

    const games = cloneDeep(yield select(gamesListSelector))
    games.push(payload)
    localStorage.setItem('gamesList', JSON.stringify(games))

    try {
      yield put({
        type: CREATE_GAME_SUCCESS,
        payload: games
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const initGamesListSaga = function* () {
  while (true) {
    yield take(INIT_GAMES_REQUEST)
    const gamesList = localStorage.gamesList || []

    try {
      yield put({
        type: INIT_GAMES_SUCCESS,
        payload: JSON.parse(gamesList)
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const saga = function* () {
  yield all([
    createGameSaga(),
    setActiveGameSaga(),
    initGamesListSaga(),
    changeActiveGameSaga(),
  ])
}