const players = ['Player 0', 'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5']

const playersData = players.map((player) => {
	const entry = { name: player, type: 'network' }
	return entry
})
const teamsData = [
	{ name: 'team 1', players: players.slice(0, 3) },
	{ name: 'team 2', players: players.slice(3, 6) },
]
const data = {
	players: playersData,
	teams: teamsData,
	virtual_deck: true,
}
export const createGameMessage = {
	type: 'create_game',
	data: data,
}
export const enterPinMessage = {
	type: 'enter_pin',
	data: {
		pin: 1234,
	},
}
export const selectPlayerMessage = {
	type: 'select_player',
	data: {
		name: 'Player 0',
	},
}
