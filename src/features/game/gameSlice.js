import { createSlice } from '@reduxjs/toolkit'

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
  },
  reducers: {
    setPin: {
      reducer: (state, action) => {
        const { pin } = action.payload
        state.pin = pin
      },
      prepare: pin => ({ payload: { pin } }),
    },
    setTeams: {
      reducer: (state, action) => {
        const { teams } = action.payload
        state.teams = teams
      },
    },
  },
})

export const { setPin, setTeams } = gameSlice.actions
export default gameSlice.reducer

/*
Selectors
*/
export function getGamePin(state) {
  return state.game.pin
}
