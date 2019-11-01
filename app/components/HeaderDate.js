import React from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import moment from 'moment';
import localization from 'moment/locale/fr';

import DefaultStyle from '../config/style'
import Colors from '../config/colors';


class HeaderDate extends React.Component {

    constructor(props) {
        super(props)

        moment.updateLocale('fr', localization)
        this.state = {
            date: this.props.date || moment(),
        }
    }

    render() {
        return (
            <View style={[DefaultStyle.default_container, styles.date_container]}>
                <Text style={[DefaultStyle.default_text, styles.day_text]}>{this.state.date.format('dddd')}</Text>
                <Text style={[DefaultStyle.default_text, styles.date_text]}>{this.state.date.format('DD')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Containers
    date_container: {
        height: 120,
        backgroundColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        elevation: 4,
    },
    date_text: {
        fontSize: 80,
        color: Colors.textSecondary,
        marginTop: -18,
    },
    day_text: {
        fontSize: 15,
        letterSpacing: 5,
        marginTop: 10,
        color: Colors.textSecondary
    },
})


export default HeaderDate