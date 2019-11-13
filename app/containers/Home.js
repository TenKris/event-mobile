import React from 'react'
import { connect } from 'react-redux'
import {
	StyleSheet,
	View,
	ScrollView,
	Button,
	TextInput,
	FlatList,
	Image,
	Animated,
	Text,
	TouchableOpacity
} from 'react-native'

import moment from '../config/LocaleMoment'

import DefaultStyle from '../config/style'
import Colors from '../config/colors'

import {
	getFirstMondayOfWeekAndMonth,
	getLastSundayOfWeekAndMonth
} from '../utils/date'

import Calendar from '../components/Calendar'
import Event from '../components/Event'
import HeaderDate from '../components/HeaderDate'
import Toast from '../components/display/Toast'
import FloatingButton from '../components/display/FloatingButton'

import PushNotification from 'react-native-push-notification'

class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			date: moment()
		}

		PushNotification.localNotificationSchedule({
			message: 'Test',
			soundName: 'default',

			date: moment()
				.add(5, 'seconds')
				.toDate()
		})

		// Update month and selected date events
		this.updateEvents(this.state.date)
	}

	addEvent = event => {
		let eventParsed = {
			...event
		}
		eventParsed.start = event.start.format()

		const action = { type: 'ADD_EVENT', value: eventParsed }
		this.props.dispatch(action)
	}

	updateEvents = date => {
		// Get all events from this month
		this.monthEvents = this.props.events.filter(event => {
			let start = moment(event.start)
			return (
				start.isSameOrAfter(getFirstMondayOfWeekAndMonth(date)) &&
				start.isSameOrBefore(getLastSundayOfWeekAndMonth(date))
			)
		})
		// Get all events from selected Date
		this.selectedDateEvents = this.monthEvents.filter(event =>
			moment(event.start).isSame(date, 'day')
		)
	}

	ChangeDateValue = (value, direction) => {
		const { date } = this.state
		this.ChangeDate(date.clone().add(direction, value))
	}

	ChangeDate = date => {
		this.setState(
			{
				date
			},
			this.updateEvents(date)
		)
	}

	render() {
		return (
			<View style={styles.main_container}>
				<HeaderDate
					date={this.state.date}
					navigation={this.props.navigation}
					background={
						this.selectedDateEvents.length !== 0
							? this.selectedDateEvents[0].color
							: null
					}
				/>

				<View
					style={[
						DefaultStyle.default_container,
						styles.month_container
					]}>
					<TouchableOpacity
						onPress={() => this.ChangeDateValue('month', -1)}>
						<Image
							source={require('../assets/icons/ic_chevron_left.png')}
							style={{ height: 18, width: 18, marginLeft: 5 }}
						/>
					</TouchableOpacity>
					<Text
						style={[DefaultStyle.default_text, styles.month_text]}>
						{this.state.date.format('MMMM YYYY')}
					</Text>
					<TouchableOpacity
						onPress={() => this.ChangeDateValue('month', 1)}>
						<Image
							source={require('../assets/icons/ic_chevron_right.png')}
							style={{
								height: 18,
								width: 18,
								marginRight: 5
							}}
						/>
					</TouchableOpacity>
				</View>

				<Calendar
					selectedDate={this.state.date}
					events={this.monthEvents}
					ChangeDate={this.ChangeDate}
				/>

				<View
					style={[
						DefaultStyle.default_container,
						styles.events_container
					]}>
					<Text
						style={[
							DefaultStyle.default_text,
							styles.events_title_text
						]}>
						Événements
					</Text>
					<View style={styles.events_list}>
						<FlatList
							style={{ flex: 1 }}
							data={this.selectedDateEvents}
							extraData={this.props}
							ListEmptyComponent={
								<Text style={styles.textMuted}>
									Aucun événement
								</Text>
							}
							renderItem={({ item, index }) => {
								return <Event key={index} data={item} />
							}}
							keyExtractor={(item, key) => key.toString()}
						/>
					</View>
				</View>

				<FloatingButton
					onPress={() =>
						this.props.navigation.navigate('NewEvent', {
							date: this.state.date,
							addEvent: this.addEvent,
							notify: () =>
								this.refs.defaultToast.show(
									'Le nouvel événement a été ajouté !'
								)
						})
					}
					image={require('../assets/icons/ic_plus.png')}
				/>

				<Toast ref="defaultToast" />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	// Containers
	main_container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Colors.backgroundPrimary
	},

	date_container: {
		height: 120,
		backgroundColor: Colors.primary,
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 4,
		elevation: 4
	},
	date_text: {
		fontSize: 80,
		color: Colors.textSecondary,
		marginTop: -18
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

	//FIXME: Delete all this bottom styles
	daysname_container: {
		backgroundColor: Colors.tertiary,
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-around',
		paddingTop: 3,
		paddingBottom: 3
	},
	daysname_text: {
		fontSize: 10,
		color: Colors.text,
		textShadowRadius: 0
	},

	days_container: {
		flex: 1.5,
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'space-around',
		alignItems: 'stretch'
	},
	//FIXME: Delete week_container
	weeks_container: {
		flex: 3,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	//FIXME: Delete all this bottom styles
	day_holder: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	day_text: {
		color: Colors.text,
		fontSize: 15,
		letterSpacing: 5,
		textShadowRadius: 0,
		textAlign: 'center'
	},
	othermonth_day_text: {
		color: Colors.textMuted
	},
	current_day_text: {
		// color: '#009BAF',
		color: Colors.primary
	},
	event_days_list: {
		position: 'absolute',
		left: 0,
		right: 0,
		paddingTop: 24,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	event_days_box: {
		height: 4,
		width: 4,
		borderRadius: 4,
		backgroundColor: Colors.primary,
		marginHorizontal: 1
	},

	events_container: {
		flex: 1,
		backgroundColor: Colors.backgroundSeconday,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
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
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		alignContent: 'stretch'
	}
})

const mapStateToProps = state => {
	return {
		events: state.addEvent.events
	}
}

export default connect(mapStateToProps)(Home)
