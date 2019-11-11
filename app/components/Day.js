import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import DefaultStyle from '../config/style'
import Colors from '../config/colors'

class Day extends React.Component {
	renderEvents() {
		return this.props.events.slice(0, 5).map(event => (
			<View
				style={[
					styles.event_days_box,
					{
						backgroundColor: event.color || Colors.primary
					}
				]}></View>
		))
	}

	render() {
		const { date, inMonth, isSelected, isToday, onClick } = this.props

		//TODO: Add display style for today date
		return (
			<TouchableOpacity
				style={styles.day_holder}
				onPress={() => onClick(date)}>
				<Text
					style={[
						DefaultStyle.default_text,
						styles.day_text,
						inMonth ? {} : styles.othermonth_day_text,
						isSelected ? styles.current_day_text : {}
					]}>
					{date.format('DD')}
				</Text>
				<View style={styles.event_days_list}>
					{this.renderEvents()}
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	// Containers
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
		justifyContent: 'center',
		alignItems: 'stretch',
		alignContent: 'stretch'
	}
})

export default Day
