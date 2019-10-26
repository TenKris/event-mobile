import React from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import DefaultStyle from './Style/Style'
import Event from './Event'
import AsyncStorage from '@react-native-community/async-storage';

import moment from 'moment';
import localization from 'moment/locale/fr';
import Palette from './Style/Palette';


class Home extends React.Component {

    constructor(props) {
        super(props)

        moment.updateLocale('fr', localization)
        this.state = {
            date: moment().startOf('month'),
            selectedDate: moment()
        }

        // Store data
        let format = 'YYYY-MM-DD hh:mm:ss'
        let event = {
            name: "Travail chez le saint",
            description: null,
            start: moment('2019-10-28 08:30:00', format).format(),
            end: moment('2019-10-28 18:00:00', format).format(),
        }
        let events = []
        events.push(event)

        storeData = async () => {
            try {
                await AsyncStorage.setItem('2019-10-28', JSON.stringify(events))
            } catch (e) {
                // saving error
            }
        }
    }


    getFirstMonday(date) {
        var firstDay = moment(date).startOf('month');
        return moment(firstDay).startOf('week');
    }

    getWeeksNums(date) {
        var lastDate = moment(date).startOf('month'),
            weeks = 0;
        while (lastDate.format('M') == date.format('M')) {
            weeks++;
            lastDate.endOf('week').add(1, 'days')
        }

        return weeks;
    }

    withinMonth(date, startDate) {
        return date.format('YYYY-MM') === startDate.format('YYYY-MM');
    }

    sameDate(date1, date2) {
        return date1.format('YYYY-MM-DD') == date2.format('YYYY-MM-DD')
    }




    _changeMonth(dir, date) {
        var newDate = this.state.date.clone();
        newDate.add(dir, 'month')
        this.setState({
            date: newDate,
            selectedDate: date != null ? date : newDate
        });
    }

    _changeSelectedDay(date) {
        var dateMonth = parseInt(date.format("MM")),
            selectedDateMonth = parseInt(this.state.selectedDate.format("MM"));

        if (dateMonth != selectedDateMonth) {
            this._changeMonth(dateMonth < selectedDateMonth ? -1 : 1, date)
        } else {
            this.setState({
                selectedDate: date
            });
        }

    }

    _displayDates() {

        let firstMonday = this.getFirstMonday(this.state.date),
            date = firstMonday,
            weeks = [],
            today = moment();

        for (let week = 0; week < this.getWeeksNums(this.state.date); week++) {
            var dates = [];
            for (let day = 0; day < 7; day++) {
                dates.push(
                    <TouchableOpacity key={day + week * 7} onPress={this._changeSelectedDay.bind(this, date)}>
                        <Text style={[
                            DefaultStyle.default_text,
                            styles.days_text,
                            this.withinMonth(date, this.state.date) ? {} : styles.othermonth_days_text,
                            this.sameDate(date, this.state.selectedDate) ? styles.current_days_text : {}
                        ]}>{date.format('DD')}</Text>
                        <View style={styles.event_days_list}>
                            {/* <View style={styles.event_days_box}></View> */}
                        </View>
                    </TouchableOpacity>
                )
                date = moment(date).add(1, 'day')
            }

            weeks.push(
                <View style={[DefaultStyle.default_container, styles.weeks_container]}>{dates}</View>
            )

        }

        return weeks
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={[DefaultStyle.default_container, styles.date_container]}>
                    <Text style={[DefaultStyle.default_text, styles.day_text]}>{this.state.selectedDate.format('dddd')}</Text>
                    <Text style={[DefaultStyle.default_text, styles.date_text]}>{this.state.selectedDate.format('DD')}</Text>
                </View>

                <View style={[DefaultStyle.default_container, styles.month_container]}>
                    <TouchableOpacity onPress={() => this._changeMonth(-1)}>
                        <Image source={require('../images/ic_chevron_left.png')} style={{ height: 18, width: 18, marginLeft: 5 }} />
                    </TouchableOpacity>
                    <Text style={[DefaultStyle.default_text, styles.month_text]}>{this.state.date.format('MMMM YYYY')}</Text>
                    <TouchableOpacity onPress={() => this._changeMonth(1)}>
                        <Image source={require('../images/ic_chevron_right.png')} style={{ height: 18, width: 18, marginRight: 5 }} />
                    </TouchableOpacity>
                </View>

                <View style={[DefaultStyle.default_container, styles.daysname_container]}>
                    <Text style={[DefaultStyle.default_text, styles.daysname_text]}>Lun</Text>
                    <Text style={[DefaultStyle.default_text, styles.daysname_text]}>Mar</Text>
                    <Text style={[DefaultStyle.default_text, styles.daysname_text]}>Mer</Text>
                    <Text style={[DefaultStyle.default_text, styles.daysname_text]}>Jeu</Text>
                    <Text style={[DefaultStyle.default_text, styles.daysname_text]}>Ven</Text>
                    <Text style={[DefaultStyle.default_text, styles.daysname_text]}>Sam</Text>
                    <Text style={[DefaultStyle.default_text, styles.daysname_text]}>Dim</Text>
                </View>

                <View style={[DefaultStyle.default_container, styles.days_container]}>
                    {this._displayDates()}
                </View>

                <View style={[DefaultStyle.default_container, styles.events_container]}>
                    <Text style={[DefaultStyle.default_text, styles.events_title_text]}>Événements</Text>
                    <ScrollView>
                        <View style={styles.events_list}>
                            <Event />
                        </View>
                    </ScrollView>
                </View>


                <TouchableOpacity style={[DefaultStyle.floating_button]} activeOpacity={.7}>
                    <Image style={DefaultStyle.floating_button_icon} source={require('../images/ic_plus.png')} />
                </TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    month_text: {
        fontSize: 10,
        margin: 12,
        textShadowRadius: 0,
        color: Palette.textSecondary
    },


    daysname_container: {
        backgroundColor: Palette.tertiary,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around",
        paddingTop: 3,
        paddingBottom: 3
    },
    daysname_text: {
        fontSize: 10,
        color: Palette.text,
        textShadowRadius: 0,
    },


    days_container: {
        flex: 1.5,
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "space-around",
        alignItems: "stretch"
    },
    weeks_container: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    days_text: {
        color: Palette.text,
        fontSize: 15,
        letterSpacing: 5,
        textShadowRadius: 0,
        textAlign: 'center'
    },
    othermonth_days_text: {
        color: Palette.textMuted,
    },
    current_days_text: {
        // color: '#009BAF',
        color: Palette.primary,
    },
    event_days_list: {
        position: 'absolute',
        left: 0, right: 0, bottom: -5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    event_days_box: {
        height: 4,
        width: 4,
        borderRadius: 4,
        backgroundColor: Palette.primary,
        marginHorizontal: 1,
    },


    events_container: {
        flex: 1,
        backgroundColor: Palette.backgroundSeconday,
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 10,
        paddingBottom: 0
    },
    events_title_text: {
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

export default Home