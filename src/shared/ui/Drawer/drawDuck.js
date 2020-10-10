import {appName} from '../../../config'
import {Record} from 'immutable'
import {createSelector} from 'reselect'
import {all, take, put} from 'redux-saga/effects'

/**
 * Constants
 * */

export const moduleName = 'draw'
const prefix = `${appName}/${moduleName}`
export const
  SET_ACTIVE_DRAW_REQUEST = `${prefix}/SET_ACTIVE_DRAW_REQUEST`,
  SET_ACTIVE_DRAW_SUCCESS = `${prefix}/SET_ACTIVE_DRAW_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  anchor: '',
})

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action
  switch (type) {
    case SET_ACTIVE_DRAW_SUCCESS:
      return state.set('anchor', payload)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const anchorSelector = createSelector(stateSelector, state => state.anchor)

/**
 * Action Creators
 * */

export const setActiveDraw = anchor => ({type: SET_ACTIVE_DRAW_REQUEST, payload: anchor})

/**
 * Sagas
 * */

export const setActiveDrawSaga = function* () {
  while (true) {
    const {payload} = yield take(SET_ACTIVE_DRAW_REQUEST)

    try {
      yield put({
        type: SET_ACTIVE_DRAW_SUCCESS,
        payload: payload
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const saga = function* () {
  yield all([
    setActiveDrawSaga()
  ])
}