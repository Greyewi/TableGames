import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {reducer as form} from 'redux-form'
import history from '../history'

import charactersReducer, {moduleName as charactersModule} from '../ducks/characters'
import gamesReducer, {moduleName as gamesModule} from '../ducks/games'
import locationsReducer, {moduleName as locationsModule} from '../ducks/locations'
import eventsReducer, {moduleName as eventsModule} from '../ducks/events'
import characteristicReducer, {moduleName as characteristicModule} from '../ducks/characteristic'
import itemsReducer, {moduleName as itemsModule} from '../ducks/items'
import drawReducer, {moduleName as drawModule} from '../shared/ui/Drawer/drawDuck'

export default combineReducers({
    form,
    router: connectRouter(history),
    [characteristicModule]: characteristicReducer,
    [charactersModule]: charactersReducer,
    [locationsModule]: locationsReducer,
    [eventsModule]: eventsReducer,
    [gamesModule]: gamesReducer,
    [itemsModule]: itemsReducer,
    [drawModule]: drawReducer,
})