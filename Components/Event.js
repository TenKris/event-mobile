import React from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import DefaultStyle from './Style/Style'

import moment from 'moment';
import localization from 'moment/locale/fr';
import Palette from './Style/Palette';


class Event extends React.Component {

    constructor(props) {
        super(props)

        moment.updateLocale('fr', localization)
    }

    render() {
        return (
            <View style={styles.event}>
                <Text numberOfLines={1} style={styles.event_text}>Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie Aurélie</Text>
                <View style={styles.event_hours}>
                    <Text style={styles.event_hour}>14:30</Text>
                    <Text style={styles.event_hour}>16:30</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    event: {
        height: 32,
        backgroundColor: Palette.backgroundPrimary,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderLeftWidth: 8,
        borderLeftColor: Palette.primary,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginBottom: 6,

        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 1.25,
        elevation: 1.25,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
    event_text: {
        color: Palette.text,
        fontSize: 14,
        fontFamily: 'Ubuntu-Medium',
        flex: 1
    },

    event_hours: {
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    event_hour: {
        color: Palette.textMuted,
        fontSize: 10,
        fontFamily: 'Ubuntu-Bold'
    }
})

export default Event