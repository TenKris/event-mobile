import React from 'react'
import { View } from 'react-native';
import Navigation from './views/navigation/Navigation'


export default class App extends React.Component {
    
    render() {
        return (
            <View style={{flex: 1}}>
              <Navigation />
            </View>
        )
    }
}