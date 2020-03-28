export const id = Math.floor(Math.random() * 1000000 + 1)

export const setupWebsocket = (ipAddr, port, endpoint) => {
    // create the WebSocket object
    const socket = new WebSocket(`ws://${ipAddr}:${port}/${endpoint}`)

    // Assign the WebSocket callback functions
    socket.onopen = () => {
        // var json = JSON.stringify({
        //     type: 'handshake',
        //     data: {
        //         id: id.toString(),
        //     },
        // })
        // socket.send(json)
        console.log(`WebSocket connected to ${ipAddr}:${port}`)
    }

    socket.onmessage = event => {
        // keep it frosty
    }

    socket.sendMessage = message => {
        // append the clients id to sending messages so that they can be uniquely identified
        message['id'] = id
        console.log(`Message addition: ${message}`)
        var json = JSON.stringify(message)
        socket.send(json)
    }

    socket.onerror = error => {
        console.log(`WebSocket error: ${error}`)
    }

    socket.onclose = () => {
        console.log('OnClose: Server not running, please turn on the server.')
        // if (socket.readyState !== 1) {
        //     setTimeout(function() {
        //         window.location.reload()
        //     }, 60000)
        // }
        console.log('Socket closed')
    }

    return socket
}
