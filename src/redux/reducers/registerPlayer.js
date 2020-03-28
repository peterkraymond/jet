import { initialState } from '../initialState'

export default function(state = initialState, action) {
	switch (action.type) {
		// case SETUP: {
		// 	return state
		// 	// const { id, content } = action.payload
		// 	// return {
		// 	// 	...state,
		// 	// 	allIds: [...state.allIds, id],
		// 	// 	byIds: {
		// 	// 		...state.byIds,
		// 	// 		[id]: {
		// 	// 			content,
		// 	// 			completed: false,
		// 	// 		},
		// 	// 	},
		// 	// }
		// }
		default:
			return state
	}
}
