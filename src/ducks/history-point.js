import { appName } from 'config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { all, put, select, take } from 'redux-saga/effects'
import cloneDeep from 'lodash/cloneDeep'
import { SET_ACTIVE_DRAW_REQUEST } from 'shared/ui/Drawer/drawDuck'

/**
 * Constants
 * */

export const moduleName = 'history-point'
const prefix = `${appName}/${moduleName}`
export const INIT_HISTORY_REQUEST = `${prefix}/INIT_HISTORY_REQUEST`,
  INIT_HISTORY_SUCCESS = `${prefix}/INIT_HISTORY_SUCCESS`,
  SET_ACTIVE_HISTORY_REQUEST = `${prefix}/SET_ACTIVE_HISTORY_REQUEST`,
  SET_ACTIVE_HISTORY_SUCCESS = `${prefix}/SET_ACTIVE_HISTORY_SUCCESS`,
  CREATE_HISTORY_REQUEST = `${prefix}/CREATE_HISTORY_REQUEST`,
  CREATE_HISTORY_SUCCESS = `${prefix}/CREATE_HISTORY_SUCCESS`,
  UPDATE_ACTIVE_HISTORY_SUCCESS = `${prefix}/UPDATE_ACTIVE_HISTORY_SUCCESS`,
  CHANGE_TEXT_HISTORY_REQUEST = `${prefix}/CHANGE_TEXT_HISTORY_REQUEST`,
  CHANGE_TEXT_HISTORY_SUCCESS = `${prefix}/CHANGE_TEXT_HISTORY_SUCCESS`,
  ADD_STORY_POINT_REQUEST = `${prefix}/ADD_STORY_POINT_REQUEST`,
  ADD_STORY_POINT_SUCCESS = `${prefix}/ADD_STORY_POINT_SUCCESS`,
  CHANGE_STORY_POINT_POSITION_REQUEST = `${prefix}/CHANGE_STORY_POINT_POSITION_REQUEST`,
  CHANGE_STORY_POINT_POSITION_SUCCESS = `${prefix}/CHANGE_STORY_POINT_POSITION_SUCCESS`,
  DELETE_STORY_POINT_REQUEST = `${prefix}/DELETE_STORY_POINT_REQUEST`,
  DELETE_STORY_POINT_SUCCESS = `${prefix}/DELETE_STORY_POINT_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  gameId: null,
  historyPointsList: [],
  activeHistoryPoint: {
    id: null, // hash
    prevHistoryId: null,
    text: '', // long grid
    storyPoints: new Map({}),
  },
})

export const ReducerStoryPoint = Record({
  position: null,
  eventId: null,
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case INIT_HISTORY_SUCCESS:
    case CREATE_HISTORY_SUCCESS:
    case UPDATE_ACTIVE_HISTORY_SUCCESS:
      return state.set('historyPointsList', payload)
    case SET_ACTIVE_HISTORY_SUCCESS:
      return state.set('activeHistoryPoint', payload)
    case CHANGE_TEXT_HISTORY_SUCCESS:
      return state.updateIn(['activeHistoryPoint', 'text'], () => payload)
    case ADD_STORY_POINT_SUCCESS:
      return state.updateIn(['activeHistoryPoint', 'storyPoints'], point =>
        point.set(payload.id, new ReducerStoryPoint(payload))
      )
    case CHANGE_STORY_POINT_POSITION_SUCCESS:
      return state.updateIn(['activeHistoryPoint', 'storyPoints'], point =>
        point.set(payload.id, new ReducerStoryPoint(payload))
      )
    case DELETE_STORY_POINT_SUCCESS:
      return state.updateIn(['activeHistoryPoint', 'storyPoints'], point =>
        point.delete(payload.id)
      )
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const historyPointsListSelector = createSelector(
  stateSelector,
  state => state.historyPointsList
)
export const activeHistoryPointSelector = createSelector(
  stateSelector,
  state => state.activeHistoryPoint
)
export const storyPointsSelector = createSelector(
  activeHistoryPointSelector,
  state => state.storyPoints
)

/**
 * Action Creators
 * */

export function initHistoryList() {
  return {
    type: INIT_HISTORY_REQUEST,
  }
}

export function createHistory(historyData) {
  return {
    type: CREATE_HISTORY_REQUEST,
    payload: historyData,
  }
}

export function setActiveHistory(history) {
  return {
    type: SET_ACTIVE_HISTORY_REQUEST,
    payload: history,
  }
}

export function changeActiveHistoryText(text) {
  return {
    type: CHANGE_TEXT_HISTORY_REQUEST,
    payload: text,
  }
}

export function addStoryPoint(position, eventId) {
  return {
    type: ADD_STORY_POINT_REQUEST,
    payload: { position, eventId },
  }
}

export function changeStoryPointPosition(position, eventId) {
  return {
    type: CHANGE_STORY_POINT_POSITION_REQUEST,
    payload: { position, eventId },
  }
}

export function deleteStoryPoint(position, eventId) {
  return {
    type: DELETE_STORY_POINT_REQUEST,
    payload: { position, eventId },
  }
}

/**
 * Sagas
 * */

export const deleteStoryPointSaga = function* () {
  while (true) {
    const { payload } = yield take(DELETE_STORY_POINT_REQUEST)
    // TODO доделать

    try {
      const history = cloneDeep(yield select(historyPointsListSelector))
      history.map((item, key) =>
        payload.id === key ? (history[key] = payload.history) : false
      )
      localStorage.setItem('historyList', JSON.stringify(history))

      yield put({
        type: DELETE_STORY_POINT_SUCCESS,
        payload: history,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const changeStoryPointPositionSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_STORY_POINT_POSITION_REQUEST)
    // TODO доделать

    try {
      const history = cloneDeep(yield select(historyPointsListSelector))
      history.map((item, key) =>
        payload.id === key ? (history[key] = payload.history) : false
      )
      localStorage.setItem('historyList', JSON.stringify(history))

      yield put({
        type: CHANGE_STORY_POINT_POSITION_SUCCESS,
        payload: history,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const addStoryPointSaga = function* () {
  while (true) {
    const { payload } = yield take(ADD_STORY_POINT_REQUEST)
    // TODO доделать
    try {
      const history = cloneDeep(yield select(historyPointsListSelector))
      history.map((item, key) =>
        payload.id === key ? (history[key] = payload.history) : false
      )
      localStorage.setItem('historyList', JSON.stringify(history))

      yield put({
        type: ADD_STORY_POINT_SUCCESS,
        payload: history,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const changeActiveHistoryTextSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_TEXT_HISTORY_REQUEST)
    // TODO доделать
    try {
      const history = cloneDeep(yield select(historyPointsListSelector))
      history.map((item, key) =>
        payload.id === key ? (history[key] = payload.history) : false
      )
      localStorage.setItem('historyList', JSON.stringify(history))

      yield put({
        type: CHANGE_TEXT_HISTORY_SUCCESS,
        payload: history,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const setActiveHistorySaga = function* () {
  while (true) {
    const { payload } = yield take(SET_ACTIVE_HISTORY_REQUEST)
    try {
      yield put({
        type: SET_ACTIVE_HISTORY_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const createHistorySaga = function* () {
  while (true) {
    const { payload } = yield take(CREATE_HISTORY_REQUEST)

    const history = cloneDeep(yield select(historyPointsListSelector))
    history.push(payload)
    localStorage.setItem('historyList', JSON.stringify(history))

    try {
      yield put({
        type: CREATE_HISTORY_SUCCESS,
        payload: history,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const initHistoryListSaga = function* () {
  while (true) {
    yield take(INIT_HISTORY_REQUEST)
    const historyPointsList = localStorage.historyPointsList || '[]'

    try {
      yield put({
        type: INIT_HISTORY_SUCCESS,
        payload: JSON.parse(historyPointsList),
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const saga = function* () {
  yield all([
    createHistorySaga(),
    setActiveHistorySaga(),
    initHistoryListSaga(),
    addStoryPointSaga(),
    deleteStoryPointSaga(),
    changeActiveHistoryTextSaga(),
    changeStoryPointPositionSaga(),
  ])
}
