import React from 'react'
import {
	StyleSheet,
	Text,
	Animated,
	View,
	TouchableOpacity
} from 'react-native'

import DefaultStyle from '../config/style'
import Colors from '../config/colors'

class Toast extends React.Component {
	constructor(props) {
		super(props)

		this.startValue = 60
		this.animateTranslate = new Animated.Value(this.startValue)
		this.animateOpacity = new Animated.Value(0)
		this.isShownToast = false
		this.message = ''

		this.state = {
			renderToast: false
		}
	}

	componentWillUnmount() {
		this.timerID && clearTimeout(this.timerID)
	}

	show(message = 'Custom Toast...', color = null, duration = 6000) {
		if (this.isShownToast === false) {
			this.message = message
			this.isShownToast = true
			this.backgroundColor = color

			this.setState({ renderToast: true }, () => {
				Animated.parallel([
					Animated.timing(this.animateTranslate, {
						toValue: 0,
						duration: 275
					}),

					Animated.timing(this.animateOpacity, {
						toValue: 1,
						duration: 275
					})
				]).start(this.hide(duration))
			})
		}
	}

	hide = (duration = 0) => {
		clearTimeout(this.timerID)
		this.timerID = setTimeout(() => {
			Animated.parallel([
				Animated.timing(this.animateTranslate, {
					toValue: this.startValue,
					duration: 275
				}),
				Animated.timing(this.animateOpacity, {
					toValue: 0,
					duration: 275
				})
			]).start(() => {
				this.setState({ renderToast: false })
				this.isShownToast = false
				this.animateTranslate.setValue(this.startValue)
				clearTimeout(this.timerID)
			})
		}, duration)
	}

	render() {
		if (this.state.renderToast) {
			return (
				<Animated.View
					style={[
						styles.fullContainer,
						{
							transform: [{ translateY: this.animateTranslate }],
							opacity: this.animateOpacity
						}
					]}>
					<TouchableOpacity
						onPress={() => this.hide()}
						activeOpacity={0.85}>
						<View
							style={[
								styles.toastContainer,
								{
									backgroundColor:
										this.backgroundColor || '#333'
								}
							]}>
							<Text numberOfLines={1} style={styles.text}>
								{this.message}
							</Text>
						</View>
					</TouchableOpacity>
				</Animated.View>
			)
		} else {
			return null
		}
	}
}

const styles = StyleSheet.create({
	fullContainer: {
		width: '100%',
		zIndex: 9999,
		position: 'absolute',
		bottom: 0
	},
	toastContainer: {
		marginHorizontal: 30,
		marginBottom: 30,
		paddingHorizontal: 25,
		paddingVertical: 10,
		borderRadius: 5,
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#333',

		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		elevation: 2
	},

	text: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 15,
		alignSelf: 'stretch',
		textAlign: 'center',
		backgroundColor: 'transparent'
	}
})

export default Toast
