import { setupWebsocket } from './setupWebsocket'
import { messageHandler } from '../features/WebSocketHandler/messageHandler'

export class WebSocketHandler {
    // create wrapper class and assign event listeners
    constructor(ipAddress, port, endpoint) {
        this.socket = setupWebsocket(ipAddress, port, endpoint)

        this.socket.addEventListener('open', this.onOpen)
        this.socket.addEventListener('message', this.onMessage)
        this.socket.addEventListener('error', this.onError)
        this.socket.addEventListener('close', this.onClose)
    }

    // Assign WebSocket Callbacks
    onOpen = received => {
        console.log('onOpen: ')
        messageHandler({ type: 'onOpen', event: received })
    }
    onMessage = received => {
        console.log('onMessage: ')
        messageHandler({ type: 'onMessage', event: received })
    }
    onError = received => {
        console.log('onError: ')
        messageHandler({ type: 'onError', event: received })
    }
    onClose = received => {
        console.log('onClose: ')
        messageHandler({ type: 'onClose', event: received })
    }

    // Create send message that will be called to transmit messages
    onSend = JSONdata => {
        if (this.socket.readyState === 1) {
            this.socket.sendMessage(JSONdata)
            console.log('onSend: ')
            console.log(JSONdata)
        } else {
            console.log('Socket connection not ready to send data...')
        }
    }
}
