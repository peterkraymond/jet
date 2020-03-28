export const initialState = {
    // these are fields related to the game play
    game: {
        pin: 1234,
        name: '',
        cards: [],
        state: [],
        players: ['Player 0', 'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
        teams: {},
    },
    // additional fields related to server connection
    socketConnection: {
        connected: false,
    },
}
