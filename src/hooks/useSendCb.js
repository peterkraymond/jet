import { useCallback } from 'react'
import { WebSocket as ws } from '../websocket/wsconfig'

export default function useSendCb() {
	return useCallback(ws.onSend, [ws])
}
