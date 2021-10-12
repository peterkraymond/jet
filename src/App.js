import React from 'react'
import './App.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import Navigation from './features/navigation/Navigation'
import { getGamePin } from './features/game/gameSlice'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        padding: theme.spacing(1),
    },
    title: {
        padding: theme.spacing(1),
    },
}))

function App() {
    const classes = useStyles()
    const gamePin = useSelector(getGamePin)

    return (
        <div>
            <Navigation />
        </div>
    )
}

export default App
