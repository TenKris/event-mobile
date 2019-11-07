import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import DefaultStyle from '../config/style'

class FloatingButton extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { onPress, image } = this.props
		return (
			<TouchableOpacity
				style={[DefaultStyle.floating_button]}
				onPress={onPress}
				activeOpacity={0.7}>
				<Image
					style={DefaultStyle.floating_button_icon}
					source={image}
				/>
			</TouchableOpacity>
		)
	}
}

export default FloatingButton
