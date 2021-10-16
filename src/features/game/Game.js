import React from 'react'

import MostRecentTurn from '../game/MostRecentTurn'
import EnterTurn from '../game/EnterTurn'
import EnterDeclaration from '../game/EnterDeclaration'
import Teams from '../game/Teams'
import Player from '../game/Player'
import GameInfo from './GameInfo'

const Game = () => {
    return (
        <div>
            <GameInfo />
            <Teams />
            <MostRecentTurn />
            <Player />
            <EnterTurn />
            <EnterDeclaration />
        </div>
    )
}

export default Game
