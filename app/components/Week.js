import React from 'react'
import { StyleSheet, View } from 'react-native'

import DefaultStyle from '../config/style'

class Week extends React.Component {
	render() {
		const { days } = this.props
		return (
			<View
				style={[
					DefaultStyle.default_container,
					styles.weeks_container
				]}>
				{days}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	// Containers
	weeks_container: {
		flex: 3,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
})

export default Week
