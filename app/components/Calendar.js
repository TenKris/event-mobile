import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import moment from '../config/LocaleMoment'

import { getFirstMondayOfWeek, getNumberofWeeks } from '../utils/date'

import Week from './Week'
import Day from './Day'

import DefaultStyle from '../config/style'
import Colors from '../config/colors'

class Calendar extends React.Component {
	constructor(props) {
		super(props)

		this.today = moment()
	}

	renderDayNames() {
		let daysname = [],
			date = moment().startOf('week')
		for (let i = 0; i < 7; i++) {
			daysname.push(
				<Text
					key={i}
					style={[DefaultStyle.default_text, styles.daysname_text]}>
					{date.format('dddd').substring(0, 3)}
				</Text>
			)
			date.add(1, 'days')
		}
		return daysname
	}

	renderWeeks() {
		const { selectedDate, events } = this.props

		let weeks = [],
			firstDate = selectedDate.clone().startOf('month'),
			monthDate = getFirstMondayOfWeek(firstDate)

		for (let week = 0; week < getNumberofWeeks(firstDate); week++) {
			let days = []
			for (let day = 0; day < 7; day++) {
				let date = monthDate
				days.push(
					<Day
						key={day}
						date={date}
						inMonth={date.isSame(firstDate, 'month')}
						isSelected={date.isSame(selectedDate, 'day')}
						isToday={date.isSame(this.today, 'day')}
						events={
							events != null
								? events.filter(event =>
										moment(event.start).isSame(date, 'day')
								  )
								: []
						}
						onClick={this.props.ChangeDate}
					/>
				)

				monthDate = date.clone().add(1, 'day')
			}
			weeks.push(<Week key={week} days={days} />)
		}

		return weeks
	}

	render() {
		return (
			<View style={styles.calendar_container}>
				<View
					style={[
						DefaultStyle.default_container,
						styles.daysname_container
					]}>
					{this.renderDayNames()}
				</View>

				<View
					style={[
						DefaultStyle.default_container,
						styles.weeks_container
					]}>
					{this.renderWeeks()}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	calendar_container: {
		flex: 1.5
	},
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

	weeks_container: {
		flex: 1,
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'space-around',
		alignItems: 'stretch'
	}
})

export default Calendar
