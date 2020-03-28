import { initialState } from '../initialState'
import { SET_SOCKET_STATUS } from '../actionTypes'

export default function socketConnection(state = initialState.socketConnection, action) {
    switch (action.type) {
        case SET_SOCKET_STATUS:
            const connected = action.payload
            return Object.assign({}, state, {
                ...state,
                connected,
            })
        default:
            return state
    }
}
