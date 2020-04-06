import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    pin: 0,
    teams: {
      name: '',
      players: [],
    },
    all_players: [],
    player: {
      identifier: '',
      name: '',
      cards: [],
    },
    last_turn: {
      type: '',
      data: {},
    },
    next_turn: '',
  },
  reducers: {
    setField: {
      reducer: (state, action) => {
        const { field, data } = action.payload
        state[field] = data
      },
      prepare: (field, data) => ({ payload: { field, data } }),
    },
    setPlayerField: {
      reducer: (state, action) => {
        const { field, data } = action.payload
        state.player[field] = data
      },
      prepare: (field, data) => ({ payload: { field, data } }),
    },
  },
})

export const { setField, setPlayerField } = gameSlice.actions
export default gameSlice.reducer

/*
Selectors
*/
export function getGamePin(state) {
  return state.game.pin
}

// TODO: rename to getallplayers?
// TODO: fix this in communication with new backend
export function getAllPlayers(state) {
  // return state.game.all_players
  var players = []
  if (Array.isArray(state.game.teams)) {
    state.game.teams.map((team) => (players = [...players, ...team.players]))
  }
  return players
}

export function getOpponents(state) {
  var opponents = []
  // check if the player is a member of team 0 or team 1 and return the opposing team players
  if (state.game.teams[0].players.includes(state.game.player.identifier)) {
    opponents = state.game.teams[1].players
  } else {
    opponents = state.game.teams[0].players
  }
  return opponents
}

export function getSetsWithCards(state) {
  var sets = []
  const suits = ['c', 'd', 'h', 's']
  const low = ['2', '3', '4', '5', '6', '7']
  const high = ['9', '10', 'j', 'q', 'k', 'a']
  // put in logic to divide player cards into known sets
  return sets
}

export function getCards(state) {
  var cards = state.game.player.cards
  // TODO: sort cards
  return cards
}

export function getTeams(state) {
  if (Array.isArray(state.game.teams)) {
    return state.game.teams
  } else {
    return [state.game.teams]
  }
}

export function getPlayerName(state) {
  return state.game.player.name
}

export function getPlayerId(state) {
  return state.game.player.identifier
}
