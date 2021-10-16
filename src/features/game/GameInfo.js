import React from 'react'
import {
	Typography,
} from '@material-ui/core'

import { useSelector } from 'react-redux'
import { getGamePin } from './gameSlice'

const GameInfo = () => {

    const gamePin = useSelector(getGamePin)

    return (
        <div>
            <Typography>Game Pin: {gamePin}</Typography>
        </div>
    )
}

export default GameInfo
