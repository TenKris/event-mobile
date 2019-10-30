import moment from 'moment';
import localization from 'moment/locale/fr';
import { database } from './database/database';

class EventService {

    constructor(db) {
        moment.updateLocale('fr', localization)

        this.database = db;

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

    async get(id) {
        if (id === undefined) {
            return Promise.resolve([]);
        }

        return await this.database.getDatabase()
            .then(db => db.executeSql(`SELECT event_id as id, name, description, start, end, color FROM Event WHERE event_id = ?;`, [id]))
            .then(([results]) => {
                if (results === undefined) {
                    return {};
                }

                return results.rows.item(0);
            });
    }


    async getByDate(start, end) {
        if (start === undefined || end === undefined) {
            return Promise.resolve([]);
        }

        return await this.database.getDatabase()

            .then(db => db.executeSql(`SELECT event_id as id, name, description, start, end, color FROM Event WHERE start >= ? AND start <= ? ORDER BY start;`, [start, end]))
            .then(([results]) => {
                if (results === undefined || results.rows.length == 0) {
                    return [];
                }

                const count = results.rows.length;
                const events = [];
                for (let i = 0; i < count; i++) {
                    const row = results.rows.item(i);
                    const { id, name, description, start, end, color } = row;
                    events.push({ id, name, description, start, end, color });
                }

                return events;
            });
    }

    // Insert a new list into the database
    async create(event) {
        return await this.database.getDatabase()
            .then(db => db.executeSql("INSERT INTO Event (name, description, start, end, color) VALUES (?, ?, ?, ?, ?);", [event.name, event.description, event.start.unix(), event.end == null ? null : event.end.unix(), event.color]))
            .then(([results]) => {
                return results.insertId;
            });
    }
}


// Export a single instance of service
export const service = new EventService(database);








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