import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../views/Home'
import NewEvent from '../../views/NewEvent';

const MainNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: null,
            }
        },

        NewEvent: {
            screen: NewEvent,
            navigationOptions: {
                header: null,
            }
        },
    },

    {
        initialRouteName: 'Home',
        transitionConfig,
    }
);

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            })

            return { transform: [{ translateX }] }
        },
    }
}


export default createAppContainer(MainNavigator);