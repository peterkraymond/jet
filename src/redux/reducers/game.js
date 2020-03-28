import { initialState } from '../initialState'
import { SETUP_GAME, UPDATE_CARDS } from '../actionTypes'

export default function(state = initialState.game, action) {
	switch (action.type) {
		case SETUP_GAME:
			var { content } = action.payload
			console.log(`Content: ${content}`)
			return {
				...state,
				pin: content.pin,
				players: content.players,
				teams: content.teams,
			}
		case UPDATE_CARDS:
			var { content } = action.payload
			console.log(`Content ${content}`)
			return {
				...state,
				name: content.name,
				cards: content.cards,
			}
		default:
			return state
	}
}
