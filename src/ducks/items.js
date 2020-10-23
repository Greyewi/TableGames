import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import { all, take, put } from 'redux-saga/effects'

/**
 * Constants
 * */

export const moduleName = 'items'
const prefix = `${appName}/${moduleName}`
export const INIT_ITEMS_DATA_REQUEST = `${prefix}/INIT_ITEMS_DATA_REQUEST`,
  INIT_ITEMS_DATA_SUCCESS = `${prefix}/INIT_ITEMS_DATA_SUCCESS`,
  SET_ACTIVE_ITEM_REQUEST = `${prefix}/SET_ACTIVE_ITEM_REQUEST`,
  SET_ACTIVE_ITEM_SUCCESS = `${prefix}/SET_ACTIVE_ITEM_SUCCESS`,
  CHANGE_ACTIVE_ITEM_REQUEST = `${prefix}/CHANGE_ACTIVE_ITEM_REQUEST`,
  CHANGE_ACTIVE_ITEM_SUCCESS = `${prefix}/CHANGE_ACTIVE_ITEM_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  itemsList: [],
  activeItem: {
    name: '',
    cost: 0,
    isUnique: false,
    type: [], // equipment, disposable, event
    place: '',
    effect: [],
  },
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case INIT_ITEMS_DATA_SUCCESS:
    case CHANGE_ACTIVE_ITEM_SUCCESS:
      return state.set('itemsList', payload)
    case SET_ACTIVE_ITEM_SUCCESS:
      return state.set('activeItem', payload)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const itemsListSelector = createSelector(
  stateSelector,
  state => state.itemsList
)
export const activeItemSelector = createSelector(
  stateSelector,
  state => state.activeItem
)
export const nameItemSelector = createSelector(
  activeItemSelector,
  state => state.name
)
export const costItemSelector = createSelector(
  activeItemSelector,
  state => state.cost
)
export const isUniqueItemSelector = createSelector(
  activeItemSelector,
  state => state.isUnique
)
export const typeItemSelector = createSelector(
  activeItemSelector,
  state => state.type
)
export const effectItemSelector = createSelector(
  activeItemSelector,
  state => state.effect
)
export const placeItemSelector = createSelector(
  activeItemSelector,
  state => state.place
)

/**
 * Action Creators
 * */

export const initItemList = () => ({ type: INIT_ITEMS_DATA_REQUEST })

export const setActiveItem = item => ({
  type: SET_ACTIVE_ITEM_REQUEST,
  payload: item,
})

export const changeActiveItem = item => ({
  type: CHANGE_ACTIVE_ITEM_REQUEST,
  payload: item,
})

/**
 * Sagas
 * */

export const changeActiveItemSaga = function* () {
  while (true) {
    const { payload } = yield take(CHANGE_ACTIVE_ITEM_REQUEST)

    try {
      yield put({
        type: CHANGE_ACTIVE_ITEM_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const setActiveItemSaga = function* () {
  while (true) {
    const { payload } = yield take(SET_ACTIVE_ITEM_REQUEST)

    try {
      yield put({
        type: SET_ACTIVE_ITEM_SUCCESS,
        payload: payload,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const initItemListSaga = function* () {
  while (true) {
    yield take(INIT_ITEMS_DATA_REQUEST)

    try {
      yield put({
        type: INIT_ITEMS_DATA_SUCCESS,
        payload: [
          {
            name: 'sword',
            cost: 255,
            isUnique: false,
            type: ['equipment'],
            place: 'store',
            effect: () => true,
          },
          {
            name: 'bow',
            cost: 100,
            isUnique: false,
            type: ['equipment'],
            place: 'store',
            effect: () => true,
          },
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export const saga = function* () {
  yield all([changeActiveItemSaga(), setActiveItemSaga(), initItemListSaga()])
}
