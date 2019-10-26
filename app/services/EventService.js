import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import localization from 'moment/locale/fr';

export default class EventService {

    constructor(date) {
        moment.updateLocale('fr', localization)

        this.date = date;
        this.format = 'YYYY-MM-DD hh:mm:ss'
        // let event = {
        //     name: "Saut en parachute",
        //     description: null,
        //     start: moment('2019-10-27 09:00:00', format).format(),
        //     end: moment('2019-10-27 11:00:00', format).format(),
        // }
        // let events = [];
        // events.push(event)
        // AsyncStorage.setItem("2019-10-27", JSON.stringify(events))
    }

    async add(event) {

        let events = this.get()

        events.push(event)

        try {
            await AsyncStorage.setItem(this.date, JSON.stringify(events))
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    async get() {
        try {
            events = await AsyncStorage.getItem(this.date)
            if (events !== null) {
                return JSON.parse(events)
            }

        } catch (e) {
            // saving error
            console.log(e)
        }

        return [];
    }

}









// // Store data
// let format = 'YYYY-MM-DD hh:mm:ss'
// let event = {
//     name: "Travail chez le saint",
//     description: null,
//     start: moment('2019-10-28 08:30:00', format).format(),
//     end: moment('2019-10-28 18:00:00', format).format(),
// }
// let events = []
// events.push(event)

// storeData = async () => {
//     try {
//         await AsyncStorage.setItem('2019-10-28', JSON.stringify(events))
//     } catch (e) {
//         // saving error
//     }
// }