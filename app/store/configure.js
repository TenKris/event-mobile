import { createStore } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import addEvent from './reducers/eventReducer'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage
}

const store = createStore(persistCombineReducers(persistConfig, { addEvent }))

export default store
export const persistor = persistStore(store)
