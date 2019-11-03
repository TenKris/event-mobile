import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import DefaultStyle from '../config/style'
import Colors from '../config/colors';


class Btn extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableHighlight underlayColor={this.props.pressColor || Colors.primaryDark} style={[styles.fullWidthButton, { backgroundColor: this.props.defaultColor || Colors.primary}, this.props.style || {}]} onPress={this.props.press}>
                <Text style={styles.fullWidthButtonText}>{ this.props.text || '' }</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    fullWidthButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 8
    },
    fullWidthButtonText: {
        fontSize: 15,
        color: Colors.textSecondary,
        textTransform: 'uppercase'
    },
})


export default Btn