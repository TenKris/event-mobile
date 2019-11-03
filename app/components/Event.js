import React from 'react';
import { StyleSheet, View, ScrollView, Animated, Button, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import moment from 'moment';
import localization from 'moment/locale/fr';

import DefaultStyle from '../config/style'
import Colors from '../config/colors';

import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';


class Event extends React.Component {

    constructor(props) {
        super(props)

        moment.updateLocale('fr', localization)
        this.state = {
            data: this.props.data
        }
    }

    renderRightActions = (progress, dragX) => {
        return (
            <RectButton style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'flex-end',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
            }} onPress={() => alert('test')}>
                <Text
                    style={[
                        {
                            color: 'white',
                            fontSize: 14,
                            backgroundColor: 'transparent',
                            padding: 10,
                            textTransform: "uppercase",
                        }
                    ]}>Supprimer</Text>
            </RectButton>
        );
    };

    render() {
        const data = this.state.data;
        return (

            <Swipeable
                style={{
                    marginBottom: 6,
                }}
                friction={2}
                leftThreshold={30}
                rightThreshold={40}
                renderRightActions={this.renderRightActions}>

                <View style={[styles.event, { borderColor: data.color || Colors.primary }]}>
                    <Text numberOfLines={1} style={styles.event_text}>{data.name}</Text>
                    <View style={styles.event_hours}>
                        <Text style={styles.event_hour}>{moment.unix(data.start).format("HH:mm")}</Text>
                        {data.end != null ? <Text style={styles.event_hour}>{moment.unix(data.end).format("HH:mm")}</Text> : null}
                    </View>
                </View>
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({

    event: {
        height: 32,
        backgroundColor: Colors.backgroundPrimary,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderLeftWidth: 8,
        borderLeftColor: Colors.primary,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,

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
        color: Colors.text,
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
        color: Colors.textMuted,
        fontSize: 10,
        fontFamily: 'Ubuntu-Bold'
    }
})

export default Event