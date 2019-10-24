import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    _displayDates() {

        var weeks = [];

        for (let day = 0; day < 7; day++) {
            var dates = [];
            for (let week = 0; week < 5; week++) {
                dates.push(
                    <Text style={[styles.default_text, styles.days_text]}>{day + 1 + week * 7}</Text>
                )
            }
            weeks.push(
                <View style={[styles.default_container, styles.weeks_container]}>{dates}</View>
            )

        }

        return weeks
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={[styles.default_container, styles.date_container]}>
                    <Text style={[styles.default_text, styles.date_text]}>30</Text>
                    <Text style={[styles.default_text, styles.day_text]}>Mardi</Text>
                </View>

                <View style={[styles.default_container, styles.month_container]}>
                    <Text style={[styles.default_text, styles.month_text]}>Octobre 2019</Text>
                </View>

                <View style={[styles.default_container, styles.daysname_container]}>
                    <Text style={[styles.default_text, styles.daysname_text]}>Lun</Text>
                    <Text style={[styles.default_text, styles.daysname_text]}>Mar</Text>
                    <Text style={[styles.default_text, styles.daysname_text]}>Mer</Text>
                    <Text style={[styles.default_text, styles.daysname_text]}>Jeu</Text>
                    <Text style={[styles.default_text, styles.daysname_text]}>Ven</Text>
                    <Text style={[styles.default_text, styles.daysname_text]}>Sam</Text>
                    <Text style={[styles.default_text, styles.daysname_text]}>Dim</Text>
                </View>

                <View style={[styles.default_container, styles.days_container]}>
                    {this._displayDates()}
                </View>

                <View style={[styles.default_container, styles.events_container]}>
                    <Text style={[styles.default_text, styles.events_title_text]}>Événements</Text>                    
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
    },
    default_text: {
        color: '#F6F6F6',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 80,
        textTransform: "uppercase",

        textShadowOffset: {
            width: 0,
            height: 2
        },
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowRadius: 2,
    },
    default_container: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: '#000',
        shadowRadius: 4,
    },


    date_container: {
        flex: 1,
        backgroundColor: '#00BCD4',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        elevation: 4,
    },
    date_text: {
        fontSize: 80,
    },
    day_text: {
        fontSize: 15,
        letterSpacing: 5,
        marginTop: -15,
    },


    month_container: {
        backgroundColor: '#454545',
        elevation: 2,
    },
    month_text: {
        fontSize: 10,
        margin: 12,
        textShadowRadius: 0,
    },


    daysname_container: {
        backgroundColor: '#BABABA',
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around",
        paddingTop: 3,
        paddingBottom: 3
    },
    daysname_text: {
        fontSize: 10,
        color: '#2A2A2A',
        textShadowRadius: 0,
    },


    days_container: {
        flex: 2,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around",
        alignItems: "stretch"
    },
    weeks_container: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    days_text: {
        color: '#2A2A2A',
        fontSize: 15,
        letterSpacing: 5,
        textShadowRadius: 0
    },


    events_container: {
        flex: 1,
        backgroundColor: '#E1E1E1',        
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    events_title_text: {
        fontSize: 14,
        color: '#B0B0B0',
        textShadowRadius: 0,
        letterSpacing: 6,
        padding: 10,
    },
})

export default Home