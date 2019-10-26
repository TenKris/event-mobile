import React from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import DefaultStyle from './Style/Style'

import moment from 'moment';
import localization from 'moment/locale/fr';
import Palette from './Style/Palette';


class NewEvent extends React.Component {

    constructor(props) {
        super(props)

        moment.updateLocale('fr', localization)
        this.state = {
            date: moment().startOf('month'),
            selectedDate: moment()
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={[DefaultStyle.default_container, styles.date_container]}>
                    <Text style={[DefaultStyle.default_text, styles.day_text]}>{this.state.selectedDate.format('dddd')}</Text>
                    <Text style={[DefaultStyle.default_text, styles.date_text]}>{this.state.selectedDate.format('DD')}</Text>
                </View>

                <View style={[DefaultStyle.default_container, styles.month_container]}>
                    <Text style={[DefaultStyle.default_text, styles.month_text]}>{this.state.date.format('MMMM YYYY')}</Text>
                </View>

                <View style={[DefaultStyle.default_container, styles.inputs_container]}>
                    <Text style={[DefaultStyle.default_text, styles.inputs_title_text]}>Nouvel Événement</Text>
                    <ScrollView>
                        <View style={styles.inputs_list}>
                            <View>
                                
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Containers
    main_container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Palette.backgroundPrimary
    },


    date_container: {
        height: 120,
        backgroundColor: Palette.primary,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        elevation: 4,
    },
    date_text: {
        fontSize: 80,
        color: Palette.textSecondary,
        marginTop: -18,
    },
    day_text: {
        fontSize: 15,
        letterSpacing: 5,
        marginTop: 10,
        color: Palette.textSecondary
    },


    month_container: {
        backgroundColor: Palette.secondary,
        elevation: 2,
        justifyContent: 'center'
    },
    month_text: {
        fontSize: 10,
        margin: 12,
        textShadowRadius: 0,
        color: Palette.textSecondary
    },

    inputs_container: {
        flex: 1,
        backgroundColor: Palette.backgroundSeconday,
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 10,
        paddingBottom: 0
    },
    inputs_title_text: {
        fontSize: 14,
        color: Palette.textMuted,
        textShadowRadius: 0,
        letterSpacing: 6,
        marginBottom: 10
    },
    events_list: {
        justifyContent: "center",
        alignItems: "stretch",
        alignContent: 'stretch',
    },
})


export default NewEvent