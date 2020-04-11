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

/***************
 ** Selectors **
 ***************/
export function getGamePin(state) {
  return state.game.pin
}

/*
 ** Team Information
 */
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
  if (state.game.teams[0].players.some((teamPlayer) => teamPlayer.name == state.game.player.name)) {
    opponents = state.game.teams[1].players
  } else {
    opponents = state.game.teams[0].players
  }
  return opponents
}

export function getTeammates(state) {
  var teammates = []
  // check if the player is a member of team 0 or team 1 and return all team players
  if (state.game.teams[0].players.some((teamPlayer) => teamPlayer.name == state.game.player.name)) {
    teammates = state.game.teams[0].players
  } else {
    teammates = state.game.teams[1].players
  }
  return teammates
}

export function getTeams(state) {
  if (Array.isArray(state.game.teams)) {
    return state.game.teams
  } else {
    return [state.game.teams]
  }
}

/*
 ** Player Information
 */
export function getPlayerName(state) {
  return state.game.player.name
}

export function getPlayerId(state) {
  return state.game.player.identifier
}

export function getSetsWithCards(state) {
  var sets = {
    low_spades: [],
    low_diamonds: [],
    low_clubs: [],
    low_hearts: [],
    high_spades: [],
    high_diamonds: [],
    high_clubs: [],
    high_hearts: [],
  }
  const suits = ['c', 'd', 'h', 's']
  const low = ['2', '3', '4', '5', '6', '7']
  const high = ['9', '10', 'j', 'q', 'k', 'a']
  // put in logic to divide player cards into known sets

  // pull out players cards
  var playerCards = state.game.player.cards
  playerCards.map((playerCard) => {
    var cardSuit = playerCard.match('[sdch]')
    var cardSuitKey = ''

    switch (cardSuit[0]) {
      case 'c':
        cardSuitKey = 'clubs'
        break
      case 'd':
        cardSuitKey = 'diamonds'
        break
      case 'h':
        cardSuitKey = 'hearts'
        break
      case 's':
        cardSuitKey = 'spades'
        break
      default:
        cardSuitKey = 'unknown'
        break
    }

    var cardVal = playerCard.match('[0-9jqka]*')

    // create card key
    const regex = RegExp('[2-7]')
    var cardValKey = regex.test(cardVal) ? 'low' : 'high'

    // append card key and suit key
    var setKey = cardValKey.concat('_', cardSuitKey)

    // append card to set
    sets[setKey].push(playerCard)
  })
  return sets
}

export function getCards(state) {
  var cards = state.game.player.cards
  // TODO: sort cards
  return cards
}

/*
 ** Last Turn Information
 */
export function getLastTurn(state) {
  return state.game.last_turn
}

/*
 ** Next Turn Player
 */
export function getNextTurnPlayer(state) {
  return state.game.next_turn
}

/*
 ** Get Static Sets
 */
export function getCardsForSet(setName) {
  switch (setName) {
    case 'low_spades':
      return ['2s', '3s', '4s', '5s', '6s', '7s']
      break
    case 'high_spades':
      return ['9s', '10s', 'js', 'qs', 'ks', 'as']
      break
    case 'low_diamonds':
      return ['2d', '3d', '4d', '5d', '6d', '7d']
      break
    case 'high_diamonds':
      return ['9d', '10d', 'jd', 'qd', 'kd', 'ad']
      break
    case 'low_clubs':
      return ['2c', '3c', '4c', '5c', '6c', '7c']
      break
    case 'high_clubs':
      return ['9c', '10c', 'jc', 'qc', 'kc', 'ac']
      break
    case 'low_hearts':
      return ['2h', '3h', '4h', '5h', '6h', '7h']
      break
    case 'high_hearts':
      return ['9h', '10h', 'jh', 'qh', 'kh', 'ah']
      break
    default:
      return []
      break
  }
}
