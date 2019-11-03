import { StyleSheet } from 'react-native';
import Colors from './colors';

export default StyleSheet.create({

    default_text: {
        color: Colors.textPrimary,
        fontFamily: 'Ubuntu-Bold',
        fontSize: 80,
        textTransform: "uppercase",

        textShadowOffset: {
            width: 0,
            height: 2
        },
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowRadius: 2,
    },
    default_container: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: '#000',
        shadowRadius: 4,
    },


    floating_button: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        right: 10,
        backgroundColor: Colors.primary,
        borderRadius: 100,
    },
    floating_button_icon: {
        // color: '#01a699',
        height: 16,
        width: 16,
    }
});