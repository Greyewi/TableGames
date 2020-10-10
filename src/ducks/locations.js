import {appName} from '../config'
import {Record} from 'immutable'
import {createSelector} from 'reselect'
import {all, take, put} from 'redux-saga/effects'

/**
 * Constants
 * */

export const moduleName = 'locations'
const prefix = `${appName}/${moduleName}`
export const
    INIT_LOCATIONS_REQUEST = `${prefix}/INIT_LOCATIONS_REQUEST`,
    INIT_LOCATIONS_SUCCESS = `${prefix}/INIT_LOCATIONS_SUCCESS`,
    SET_ACTIVE_LOCATION_REQUEST = `${prefix}/SET_ACTIVE_LOCATION_REQUEST`,
    SET_ACTIVE_LOCATION_SUCCESS = `${prefix}/SET_ACTIVE_LOCATION_SUCCESS`,
    ADD_LOCATION_TO_LIST_REQUEST = `${prefix}/ADD_LOCATION_TO_LIST_REQUEST`,
    ADD_LOCATION_TO_LIST_SUCCESS = `${prefix}/ADD_LOCATION_TO_LIST_SUCCESS`,
    CHANGE_LOCATION_NAME_REQUEST = `${prefix}/CHANGE_LOCATION_NAME_REQUEST`, // actions with active location
    CHANGE_LOCATION_NAME_SUCCESS = `${prefix}/CHANGE_LOCATION_NAME_SUCCESS`,
    CHANGE_LOCATION_MOVEMENTS_REQUEST = `${prefix}/CHANGE_LOCATION_MOVEMENTS_REQUEST`,
    CHANGE_LOCATION_MOVEMENTS_SUCCESS = `${prefix}/CHANGE_LOCATION_MOVEMENTS_SUCCESS`,
    CHANGE_LOCATION_EVENTS_REQUEST =  `${prefix}/CHANGE_LOCATION_EVENTS_REQUEST`,
    CHANGE_LOCATION_EVENTS_SUCCESS = `${prefix}/CHANGE_LOCATION_EVENTS_SUCCESS`,
    CHANGE_LOCATION_MAP_REQUEST = `${prefix}/CHANGE_LOCATION_MAP_REQUEST`,
    CHANGE_LOCATION_MAP_SUCCESS = `${prefix}/CHANGE_LOCATION_MAP_SUCCESS`,
    CHANGE_LOCATION_BACKGROUND_MUSIC_REQUEST = `${prefix}/CHANGE_LOCATION_BACKGROUND_MUSIC_REQUEST`,
    CHANGE_LOCATION_BACKGROUND_MUSIC_SUCCESS = `${prefix}/CHANGE_LOCATION_BACKGROUND_MUSIC_SUCCESS`

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
        backMusic: '' // url to background music
    }
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case INIT_LOCATIONS_SUCCESS:
        case ADD_LOCATION_TO_LIST_SUCCESS:
            return state.set('locationList', payload)
        case CHANGE_LOCATION_NAME_SUCCESS:
            return state.setIn(['activeLocation', 'name'], payload)
        case CHANGE_LOCATION_MOVEMENTS_SUCCESS:
            return state.setIn(['activeLocation', 'movements'], payload)
        case CHANGE_LOCATION_EVENTS_SUCCESS:
            return state.setIn(['activeLocation', 'events'], payload)
        case CHANGE_LOCATION_MAP_SUCCESS:
            return state.setIn(['activeLocation', 'map'], payload)
        case CHANGE_LOCATION_BACKGROUND_MUSIC_SUCCESS:
            return state.setIn(['activeLocation', 'backMusic'], payload)
        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName] && state[moduleName]
export const locationsListSelector = createSelector(stateSelector, state => state.locationList)
export const activeLocationSelector = createSelector(stateSelector, state => state.activeLocation)
export const activeLocationNameSelector = createSelector(activeLocationSelector, state => state.name)
export const activeLocationMovementsSelector = createSelector(activeLocationSelector, state => state.movements)
export const activeLocationEventsSelector = createSelector(activeLocationSelector, state => state.events)
export const activeLocationMapSelector = createSelector(activeLocationSelector, state => state.map)
export const activeLocationMusicSelector = createSelector(activeLocationSelector, state => state.backMusic)


/**
 * Action Creators
 * */

export const initLocationsList = () => ({type: INIT_LOCATIONS_REQUEST})

export function changeActiveLocation(name) {
    return {
        type: SET_ACTIVE_LOCATION_REQUEST,
        payload: name
    }
}

export function addNewLocation(location) {
    return {
        type: ADD_LOCATION_TO_LIST_REQUEST,
        payload: location
    }
}

export function changeLocationName(name) {
    return {
        type: CHANGE_LOCATION_NAME_REQUEST,
        payload: name
    }
}

export function changeLocationMovements(movements) {
    return {
        type: CHANGE_LOCATION_MOVEMENTS_REQUEST,
        payload: movements
    }
}

export function changeLocationEvents(events) {
    return {
        type: CHANGE_LOCATION_EVENTS_REQUEST,
        payload: events
    }
}


export function changeLocationMap(map) {
    return {
        type: CHANGE_LOCATION_MAP_REQUEST,
        payload: map
    }
}

export function changeLocationBackMusic(music) {
    return {
        type: CHANGE_LOCATION_BACKGROUND_MUSIC_REQUEST,
        payload: music
    }
}


/**
 * Sagas
 * */

export const changeLocationBackMusicSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_LOCATION_BACKGROUND_MUSIC_REQUEST)
        try {
            yield put({
                type: CHANGE_LOCATION_BACKGROUND_MUSIC_SUCCESS,
                payload: payload
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const changeLocationMapSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_LOCATION_MAP_REQUEST)
        try {
            yield put({
                type: CHANGE_LOCATION_MAP_SUCCESS,
                payload: payload
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const changeLocationEventsSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_LOCATION_EVENTS_REQUEST)
        try {
            yield put({
                type: CHANGE_LOCATION_EVENTS_SUCCESS,
                payload: payload
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const changeLocationMovementsSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_LOCATION_MOVEMENTS_REQUEST)
        try {
            yield put({
                type: CHANGE_LOCATION_MOVEMENTS_SUCCESS,
                payload: payload
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const changeLocationNameSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_LOCATION_NAME_REQUEST)
        try {
            yield put({
                type: CHANGE_LOCATION_NAME_SUCCESS,
                payload: payload
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const addNewLocationSaga = function* () {
    while (true) {
        const {payload} = yield take(ADD_LOCATION_TO_LIST_REQUEST)
        try {
            yield put({
                type: ADD_LOCATION_TO_LIST_SUCCESS,
                payload: payload
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
            yield put({
                type: INIT_LOCATIONS_SUCCESS,
                payload: [{
                    name: 'Fair_1000',
                    movements: ['world_1000', 'canyon_400'],
                    events: [1,2,3],
                    map: 'https://desktopgaming.com/desktops/thumbnails/101.jpg'
                }]
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
        changeLocationMapSaga(),
        changeLocationNameSaga(),
        changeLocationEventsSaga(),
        changeLocationMovementsSaga(),
        changeLocationBackMusicSaga(),
    ])
}