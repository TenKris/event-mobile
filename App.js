import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import Home from './Components/Home'

export default class App extends React.Component {
    
    render() {
        return (
            <View style={styles.main_container}>
              <Home />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // Containers
    main_container: {
         flex: 1,
    },
})