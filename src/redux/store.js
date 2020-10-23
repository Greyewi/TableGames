import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import rootSaga from './saga'

const logger = createLogger({
  predicate: (getState, action) => action.type.includes('SUCCESS'),
})

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  logger
)
const store = createStore(reducer, enhancer)

sagaMiddleware.run(rootSaga)

export default store
