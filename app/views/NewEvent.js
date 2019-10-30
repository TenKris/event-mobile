import React from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput, FlatList, Image, Text, TouchableHighlight, TouchableOpacity, Keyboard } from 'react-native';

import moment from 'moment';
import localization from 'moment/locale/fr';

import DefaultStyle from '../config/style'
import Colors, { colors } from '../config/colors';
import { service } from '../services/EventService';

import HeaderDate from '../components/HeaderDate';
import Btn from '../components/Btn';

import DatePicker from 'react-native-datepicker'


class NewEvent extends React.Component {

    constructor(props) {
        super(props)

        moment.updateLocale('fr', localization)

        this.defaultFormat = "DD/MM/YYYY HH:mm"
        this.colors = [
            Colors.primary,
            "#F77900",
            "#FCEE6D",
            "#55BE30",
            "#28A0D3",
            "#8333E3",
            "#FB5993"
        ]
        this.state = {
            date: this.props.navigation.getParam('date', moment()),
            event: {
                name: null,
                description: null,
                start: moment(),
                end: moment().add(1, 'hours'),
                color: this.colors[0]
            },
        }
    }


    changeEvent(key, value) {
        const { event } = this.state;
        event[key] = value;

        this.setState({
            event
        })
    }

    async submit() {
        await service.create(this.state.event);
        await this.props.navigation.state.params.update();
        this.props.navigation.goBack();
    }



    _borderSelectedColor(color) {
        return this.state.event.color == color ? { borderColor: Colors.textPrimary } : {};
    }



    render() {
        return (
            <View style={styles.main_container}>
                <HeaderDate date={this.state.date} />

                <View style={[DefaultStyle.default_container, styles.month_container]}>
                    <Text style={[DefaultStyle.default_text, styles.month_text]}>{this.state.date.format('MMMM YYYY')}</Text>
                </View>

                <View style={[DefaultStyle.default_container, styles.inputs_container]}>
                    <Text style={[DefaultStyle.default_text, styles.inputs_title_text]}>Nouvel Événement</Text>
                    <ScrollView>
                        <View style={styles.inputs_list}>
                            <View style={styles.form_group}>
                                <Text style={styles.label}>Intitulé</Text>
                                <TextInput style={styles.input} placeholder="Entrer l'intitulé de l'événement" maxLength={75} value={this.state.event.name} onChangeText={(text) => this.changeEvent("name", text)} />
                                <Text style={styles.invalid_message}></Text>
                            </View>


                            <View style={[styles.form_group, styles.form_row]}>
                                <View style={[styles.form_group, styles.form_col]}>
                                    <Text style={styles.label}>Date de début</Text>
                                    <DatePicker
                                        style={[styles.input, { paddingVertical: 2, paddingHorizontal: 0 }]}
                                        customStyles={{
                                            dateInput: {
                                                borderWidth: 0,
                                            },
                                            dateText: {
                                                color: Colors.textPrimary
                                            },
                                        }}
                                        date={this.state.event.start}
                                        mode="datetime"
                                        androidMode="spinner"
                                        placeholder="Choisissez une date"
                                        format={this.defaultFormat}
                                        // minDate="2016-05-01"
                                        // maxDate="2016-06-01"
                                        confirmBtnText="OK"
                                        cancelBtnText="Annuler"
                                        showIcon={false}
                                        is24Hour={true}
                                        onDateChange={(date) => {
                                            this.changeEvent("start", moment(date, this.defaultFormat))
                                            if (this.state.event.start.diff(this.state.event.end) > 0)
                                                this.changeEvent("end", moment(this.state.event.start.clone().add(1, 'hours'), this.defaultFormat))
                                        }}
                                    />
                                    <Text style={styles.invalid_message}></Text>
                                </View>
                                <View style={[styles.form_group, styles.form_col]}>
                                    <Text style={styles.label}>Date de Fin</Text>
                                    <DatePicker
                                        style={[styles.input, { paddingVertical: 2, paddingHorizontal: 0 }]}
                                        customStyles={{
                                            dateInput: {
                                                borderWidth: 0,
                                            },
                                            dateText: {
                                                color: Colors.textPrimary
                                            },
                                        }}
                                        date={this.state.event.end}
                                        mode="datetime"
                                        androidMode="spinner"
                                        placeholder="Choisissez une date"
                                        format={this.defaultFormat}
                                        minDate={this.state.event.start.format(this.defaultFormat)}
                                        confirmBtnText="OK"
                                        cancelBtnText="Annuler"
                                        showIcon={false}
                                        is24Hour={true}
                                        onDateChange={(date) => this.changeEvent("end", moment(date, this.defaultFormat))}
                                    />
                                    <Text style={styles.invalid_message}></Text>
                                </View>
                            </View>


                            <View style={styles.form_group}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput style={[styles.input, styles.text_area]} placeholder="Entrer une description" maxLength={200} onBlur={Keyboard.dismiss} value={this.state.event.description} onChangeText={(text) => this.changeEvent("description", text)} />
                            </View>

                            <View style={styles.form_group}>
                                <Text style={styles.label}>Couleur</Text>
                                <View style={styles.elements_holder}>
                                    {this.colors.map(color =>
                                        <TouchableOpacity onPressIn={() => this.changeEvent("color", color)}>
                                            <View style={[styles.element_color, { backgroundColor: color }, this._borderSelectedColor(color)]}></View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <Text style={styles.invalid_message}></Text>
                            </View>

                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'stretch', marginBottom: 5, height: 38 }}>
                        <Btn text="test" press={() => this.props.navigation.goBack()} defaultColor={'#94a3a7'} pressColor={'#7b878a'} style={{ marginRight: 5 }} text={'Retour'} />
                        <Btn text="test" press={async () => this.submit()} style={{ marginLeft: 5, flex: 2 }} text={'Valider'} />
                    </View>
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
        backgroundColor: Colors.backgroundPrimary
    },

    month_container: {
        backgroundColor: Colors.secondary,
        elevation: 2,
        justifyContent: 'center'
    },
    month_text: {
        fontSize: 10,
        margin: 12,
        textShadowRadius: 0,
        color: Colors.textSecondary
    },

    inputs_container: {
        flex: 1,
        backgroundColor: Colors.backgroundSeconday,
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 10,
        paddingBottom: 0
    },
    inputs_title_text: {
        fontSize: 14,
        color: Colors.textMuted,
        textShadowRadius: 0,
        letterSpacing: 6,
        marginBottom: 10
    },
    inputs_list: {
        marginTop: 10
    },


    form_group: {
        marginBottom: 6,
        marginHorizontal: 10,
        flex: 1
    },
    form_row: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start"
    },
    form_col: {
        marginHorizontal: 0
    },
    elements_holder: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginVertical: 5,
        marginHorizontal: 10
    },
    label: {
        color: Colors.textPrimary,
        fontFamily: 'Ubuntu-Medium',
        fontSize: 15,
        textTransform: "uppercase",
        marginBottom: 0
    },
    input: {
        backgroundColor: Colors.backgroundPrimary,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        // flex: 1
    },
    text_area: {
        maxHeight: 66,
        textAlignVertical: 'top'
    },
    element_color: {
        backgroundColor: Colors.primary,
        height: 35,
        width: 35,
        borderRadius: 35,

        borderWidth: 3,
        borderColor: "transparent",
    },
    invalid_message: {
        color: 'red',
        fontSize: 12
    }
})


export default NewEvent