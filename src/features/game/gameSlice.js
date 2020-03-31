import { createSlice } from '@reduxjs/toolkit'

// TODO: refactor to simplify number of reducers
const gameSlice = createSlice({
  name: 'game',
  initialState: {
    pin: 0,
    teams: {
      name: '',
      players: [],
    },
    player: {
      identifier: '',
      cards: [],
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
