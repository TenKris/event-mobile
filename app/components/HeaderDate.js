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
    }

    _backButton() {
        if (this.props.navigation != null && !this.props.navigation.isFirstRouteInParent()) {
            return <TouchableOpacity style={styles.back_button} onPress={() => this.props.navigation.goBack()}>
                <Image style={{ height: 22, width: 15 }} source={require('../assets/icons/ic_back.png')} />
            </TouchableOpacity>
        }

        return null
    }

    render() {
        const date = this.props.date || moment();
        return (
            <View style={[DefaultStyle.default_container, styles.date_container, { backgroundColor: this.props.background || Colors.primary }]}>
                {this._backButton()}
                <Text style={[DefaultStyle.default_text, styles.day_text]}>{date.format('dddd')}</Text>
                <Text style={[DefaultStyle.default_text, styles.date_text]}>{date.format('DD')}</Text>
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

    back_button: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 8,
    }
})


export default HeaderDate