const initialState = { events: [] }

function addEvent(state = initialState, action) {
	let nextState

	switch (action.type) {
		case 'ADD_EVENT':
			nextState = {
				...state,
				events: [...state.events, action.value]
			}
			return nextState || state

		case 'CLEAR_EVENTS':
			nextState = { ...state, events: [] }
			return nextState || state

		default:
			return state
	}
}

export default addEvent
