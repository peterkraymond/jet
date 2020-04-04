import { createSlice } from '@reduxjs/toolkit'

const navigationSlice = createSlice({
	name: 'navigation',
	initialState: {
		view: 'create-game', // create-game, enter-pin, select-player, game-play, final-results
	},
	reducers: {
		setCurrentView: {
			reducer: (state, action) => {
				const { view } = action.payload
				state.view = view
			},
			prepare: (view) => ({ payload: { view } }),
		},
	},
})

export const { setCurrentView } = navigationSlice.actions
export default navigationSlice.reducer

/*
Selectors
*/
export function getCurrentView(state) {
	return state.navigation.view
}
