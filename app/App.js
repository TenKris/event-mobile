import React from 'react'
import { View } from 'react-native'
import Navigation from './components/navigation/Navigation'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Store, { persistor } from './store/configure'

//TODO: Add loading for PersistGate
export default class App extends React.Component {
	render() {
		return (
			<Provider store={Store}>
				<PersistGate persistor={persistor}>
					<View style={{ flex: 1 }}>
						<Navigation />
					</View>
				</PersistGate>
			</Provider>
		)
	}
}
