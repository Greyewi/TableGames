import { all } from 'redux-saga/effects'
import { saga as charactersSaga } from '../ducks/characters'
import { saga as gamesSaga } from '../ducks/games'
import { saga as locationsSaga } from '../ducks/locations'
import { saga as eventsSaga } from '../ducks/events'
import { saga as characteristicSaga } from '../ducks/characteristic'
import { saga as itemsSaga } from '../ducks/items'
import { saga as drawSaga } from '../shared/ui/Drawer/drawDuck'

export default function* rootSaga() {
  yield all([
    drawSaga(),
    itemsSaga(),
    gamesSaga(),
    eventsSaga(),
    locationsSaga(),
    charactersSaga(),
    characteristicSaga(),
  ])
}
