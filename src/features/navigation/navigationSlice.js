import { createSlice } from '@reduxjs/toolkit'

const navigationSlice = createSlice({
	name: 'navigation',
	initialState: {
		view: 'landing',
	},
	reducers: {
		setNavigationView: {
			reducer: (state, action) => {
				const { view } = action.payload
				state.view = view
			},
			prepare: view => ({ payload: { view } }),
		},
	},
})

export const { setNavigationView } = navigationSlice.actions
export default navigationSlice.reducer

/*
Selectors
*/
export function getCurrentView(state) {
	return state.navigation.view
}
