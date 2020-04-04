import React from 'react'
import './App.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Navigation from './features/navigation/Navigation'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        padding: theme.spacing(3),
    },
    title: {
        padding: theme.spacing(3),
    },
}))

function App() {
    const classes = useStyles()
    return (
        <div>
            <Typography variant="h3" className={classes.title}>
                Literature!
            </Typography>
            <Navigation />
        </div>
    )
}

export default App
