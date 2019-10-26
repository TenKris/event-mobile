import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '../../../node_modules/react-navigation-stack';
import Home from '../screens/Home'

const MainNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
});

export default createAppContainer(MainNavigator);