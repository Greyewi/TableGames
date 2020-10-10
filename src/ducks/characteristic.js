import {appName} from '../config'
import {Record} from 'immutable'
import {createSelector} from 'reselect'
import {all, take, put} from 'redux-saga/effects'


/**
 * Constants
 * */

export const moduleName = 'characteristic'
const prefix = `${appName}/${moduleName}`
export const
    INIT_CHARACTERISTICS_DATA_REQUEST = `${prefix}/INIT_CHARACTERISTICS_DATA_REQUEST`,
    INIT_CHARACTERISTICS_DATA_SUCCESS = `${prefix}/INIT_CHARACTERISTICS_DATA_SUCCESS`,
    SET_ACTIVE_CHARACTERISTIC_REQUEST = `${prefix}/SET_ACTIVE_CHARACTERISTIC_REQUEST`,
    SET_ACTIVE_CHARACTERISTIC_SUCCESS = `${prefix}/SET_ACTIVE_CHARACTERISTIC_SUCCESS`,
    CHANGE_CHARACTERISTIC_UNIT_REQUEST = `${prefix}/CHANGE_CHARACTERISTIC_UNIT_REQUEST`,
    CHANGE_CHARACTERISTIC_UNIT_SUCCESS = `${prefix}/CHANGE_CHARACTERISTIC_UNIT_SUCCESS`,
    CHANGE_CHARACTERISTIC_NAME_REQUEST = `${prefix}/CHANGE_CHARACTERISTIC_NAME_REQUEST`,
    CHANGE_CHARACTERISTIC_NAME_SUCCESS = `${prefix}/CHANGE_CHARACTERISTIC_NAME_SUCCESS`,
    CHANGE_CHARACTERISTIC_MIN_VALUE_REQUEST = `${prefix}/CHANGE_CHARACTERISTIC_MIN_VALUE_REQUEST`,
    CHANGE_CHARACTERISTIC_MIN_VALUE_SUCCESS = `${prefix}/CHANGE_CHARACTERISTIC_MIN_VALUE_SUCCESS`,
    CHANGE_CHARACTERISTIC_MAX_VALUE_REQUEST = `${prefix}/CHANGE_CHARACTERISTIC_MAX_VALUE_REQUEST`,
    CHANGE_CHARACTERISTIC_MAX_VALUE_SUCCESS = `${prefix}/CHANGE_CHARACTERISTIC_MAX_VALUE_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
    characteristicsList: [],
    activeCharacteristic: {
        name: '',
        unit : '',
        minValue: 0,
        maxValue: 100
    }
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action
    switch (type) {
        case INIT_CHARACTERISTICS_DATA_SUCCESS:
            return state.set('characteristicsList', payload)
        case SET_ACTIVE_CHARACTERISTIC_SUCCESS:
            return state.set('activeCharacteristic', payload)
        case CHANGE_CHARACTERISTIC_NAME_SUCCESS:
            return state.setIn(['activeCharacteristic', 'name'], payload)
        case CHANGE_CHARACTERISTIC_UNIT_SUCCESS:
            return state.setIn(['activeCharacteristic', 'unit'], payload)
        case CHANGE_CHARACTERISTIC_MIN_VALUE_SUCCESS:
            return state.setIn(['activeCharacteristic', 'minValue'], payload)
        case CHANGE_CHARACTERISTIC_MAX_VALUE_SUCCESS:
            return state.setIn(['activeCharacteristic', 'maxValue'], payload)
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
export const nameCharacteristicSelector = createSelector(activeCharacteristicSelector, state => state.name)
export const unitCharacteristicSelector = createSelector(activeCharacteristicSelector, state => state.unit)
export const minValueCharacteristicSelector = createSelector(activeCharacteristicSelector, state => state.minValue)
export const maxValueCharacteristicSelector = createSelector(activeCharacteristicSelector, state => state.maxValue)

/**
 * Action Creators
 * */

export const initCharacteristicList = () => ({type: INIT_CHARACTERISTICS_DATA_REQUEST})
export const setActiveCharacteristic = characteristic => ({type: SET_ACTIVE_CHARACTERISTIC_REQUEST, payload: characteristic})
export const changeCharacteristicUnit = unit => ({type: CHANGE_CHARACTERISTIC_UNIT_REQUEST, payload: unit})
export const changeCharacteristicName = name => ({type: CHANGE_CHARACTERISTIC_NAME_REQUEST, payload: name})
export const changeCharacteristicMinValue = minValue => ({type: CHANGE_CHARACTERISTIC_MIN_VALUE_REQUEST, payload: minValue})
export const changeCharacteristicMaxValue = maxValue => ({type: CHANGE_CHARACTERISTIC_MAX_VALUE_REQUEST, payload: maxValue})

/**
 * Sagas
 * */

export const changeCharacteristicMaxValueSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_CHARACTERISTIC_MAX_VALUE_REQUEST)

        try {
            yield put({
                type: CHANGE_CHARACTERISTIC_MAX_VALUE_SUCCESS,
                payload: payload
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const changeCharacteristicMinValueSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_CHARACTERISTIC_MIN_VALUE_REQUEST)

        try {
            yield put({
                type: CHANGE_CHARACTERISTIC_MIN_VALUE_SUCCESS,
                payload: payload
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const changeCharacteristicNameSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_CHARACTERISTIC_NAME_REQUEST)

        try {
            yield put({
                type: CHANGE_CHARACTERISTIC_NAME_SUCCESS,
                payload: payload
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const changeCharacteristicUnitSaga = function* () {
    while (true) {
        const {payload} = yield take(CHANGE_CHARACTERISTIC_UNIT_REQUEST)

        try {
            yield put({
                type: CHANGE_CHARACTERISTIC_UNIT_SUCCESS,
                payload: payload
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

export const initCharacteristicListSaga = function* () {
    while (true) {
        yield take(INIT_CHARACTERISTICS_DATA_REQUEST)

        try {
            yield put({
                type: INIT_CHARACTERISTICS_DATA_SUCCESS,
                payload: [{
                    name: 'health',
                    unit : 'hp',
                    minValue: 0,
                    maxValue: 255
                }, {
                    name: 'mana',
                    unit : 'sp',
                    minValue: 0,
                    maxValue: 500
                }]
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const saga = function* () {
    yield all([
        changeCharacteristicMaxValueSaga(),
        changeCharacteristicMinValueSaga(),
        changeCharacteristicNameSaga(),
        changeCharacteristicUnitSaga(),
        setActiveCharacteristicSaga(),
        initCharacteristicListSaga(),
    ])
}