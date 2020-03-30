import { createSlice } from '@reduxjs/toolkit'

const hwSlice = createSlice({
  name: 'hw',
  initialState: {
    connected: false,
  },
  reducers: {
    setStatus: {
      reducer: (state, action) => {
        const { connected } = action.payload
        state.connected = connected
      },
      prepare: connected => ({ payload: { connected } }),
    },
  },
})

export const { setStatus } = hwSlice.actions
export default hwSlice.reducer
