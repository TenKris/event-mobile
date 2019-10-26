import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import Home from './Components/Home'
import Navigation from './Navigation/Navigation'


export default class App extends React.Component {
    
    render() {
        return (
            <View style={styles.main_container}>
              {/* <Home /> */}
              <Navigation />
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