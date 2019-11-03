import React from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput, FlatList, Image, Animated, Text, TouchableOpacity } from 'react-native';

import moment from 'moment';
import localization from 'moment/locale/fr';

import DefaultStyle from '../config/style'
import Colors from '../config/colors';

import Event from '../components/Event'
import Toast from '../components/Toast';
import FloatingButton from '../components/FloatingButton';
import HeaderDate from '../components/HeaderDate';

import { database } from '../services/database/database';
import { service } from '../services/EventService';


class Home extends React.Component {

    constructor(props) {
        super(props)

        moment.updateLocale('fr', localization)
        this.state = {
            date: moment().startOf('month'),
            selectedDate: moment(),
            events: {}
        }
    }

    async componentDidMount() {
        await this.updateEvents()
    }

    updateEvents = async () => {
        this.setState({
            events: await this.getEvents(this.state.selectedDate)
        })
    }


    async getEvents(date) {
        let events = {},
            data = await service.getByDate(date.clone().startOf("month").startOf("week").startOf("day").unix(), date.clone().endOf("month").endOf("week").endOf("day").unix());
        data.forEach(element => {
            let date = moment.unix(element.start).format("YYYY-MM-DD");
            if (!(date in events)) {
                events[date] = [];
            }
            events[date].push(element);
        });

        return events
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

    getFirstEventColor() {
        var formated = this.state.selectedDate.format("YYYY-MM-DD");
        if (formated in this.state.events) {
            return this.state.events[formated][0].color
        }
        return null;
    }



    async _changeMonth(dir, date) {
        var newDate = this.state.date.clone();
        newDate.add(dir, 'month')
        this.setState({
            date: newDate,
            selectedDate: date != null ? date : newDate,
            events: await this.getEvents(date != null ? date : newDate)
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

                var events = [];
                var formated = date.format("YYYY-MM-DD");
                if (formated in this.state.events) {
                    events = this.state.events[formated].slice(0, 5).map(event => <View style={[styles.event_days_box, { backgroundColor: event.color || Colors.primary }]}></View>)
                }

                dates.push(
                    <TouchableOpacity onPressIn={this._changeSelectedDay.bind(this, date)}>
                        <Text style={[
                            DefaultStyle.default_text,
                            styles.days_text,
                            this.withinMonth(date, this.state.date) ? {} : styles.othermonth_days_text,
                            this.sameDate(date, this.state.selectedDate) ? styles.current_days_text : {}
                        ]}>{date.format('DD')}</Text>
                        <View style={styles.event_days_list}>
                            {events}
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

    _displayEvent() {
        var formated = this.state.selectedDate.format("YYYY-MM-DD");
        if (formated in this.state.events) {
            return this.state.events[formated].map(event => <Event data={event} />)
        } else {
            return <Text style={styles.textMuted}>Aucun événement</Text>
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <HeaderDate date={this.state.selectedDate} navigation={this.props.navigation} background={this.getFirstEventColor()} />

                <View style={[DefaultStyle.default_container, styles.month_container]}>
                    <TouchableOpacity onPress={async () => this._changeMonth(-1)}>
                        <Image source={require('../assets/icons/ic_chevron_left.png')} style={{ height: 18, width: 18, marginLeft: 5 }} />
                    </TouchableOpacity>
                    <Text style={[DefaultStyle.default_text, styles.month_text]}>{this.state.date.format('MMMM YYYY')}</Text>
                    <TouchableOpacity onPress={async () => this._changeMonth(1)}>
                        <Image source={require('../assets/icons/ic_chevron_right.png')} style={{ height: 18, width: 18, marginRight: 5 }} />
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
                            {this._displayEvent()}
                        </View>
                    </ScrollView>
                </View>

                <FloatingButton onPress={() => this.props.navigation.navigate('NewEvent', { date: this.state.selectedDate, update: this.updateEvents, notify: () => this.refs.defaultToast.show('Le nouvel événement a été ajouté !') })} image={require('../assets/icons/ic_plus.png')} />

                <Toast ref="defaultToast" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Containers
    main_container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.backgroundPrimary,
    },


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


    month_container: {
        backgroundColor: Colors.secondary,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    month_text: {
        fontSize: 10,
        margin: 12,
        textShadowRadius: 0,
        color: Colors.textSecondary
    },


    daysname_container: {
        backgroundColor: Colors.tertiary,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around",
        paddingTop: 3,
        paddingBottom: 3
    },
    daysname_text: {
        fontSize: 10,
        color: Colors.text,
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
        color: Colors.text,
        fontSize: 15,
        letterSpacing: 5,
        textShadowRadius: 0,
        textAlign: 'center'
    },
    othermonth_days_text: {
        color: Colors.textMuted,
    },
    current_days_text: {
        // color: '#009BAF',
        color: Colors.primary,
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
        backgroundColor: Colors.primary,
        marginHorizontal: 1,
    },


    events_container: {
        flex: 1,
        backgroundColor: Colors.backgroundSeconday,
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 10,
        paddingBottom: 0
    },
    events_title_text: {
        fontSize: 14,
        color: Colors.textMuted,
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