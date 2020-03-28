import { SETUP_GAME, REGISTER_PLAYER, UPDATE_CARDS, SET_SOCKET_STATUS } from './actionTypes'

export function setupGame(content) {
	return {
		type: SETUP_GAME,
		payload: { content },
	}
}

export function registerPlayer(id) {
	return {
		type: REGISTER_PLAYER,
		payload: { id },
	}
}

// TODO: do we want to call out content more specifically to be passed in such as
// name and cards in this case, or just let the reducer handle the update appropriately?
// Unsure where to include error checking
export function updateCards(content) {
	return {
		type: UPDATE_CARDS,
		payload: { content },
	}
}

export function setSocketStatus(connected) {
	return { type: SET_SOCKET_STATUS, payload: connected }
}
