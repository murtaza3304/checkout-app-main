import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import RootReducers from '../../redux/reducers/RootReducers'

const Store = createStore(RootReducers, applyMiddleware(thunk));

export default Store;