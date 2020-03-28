import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import NewGameDialog from './components/NewGameDialog'
import JoinGameDialog from './components/JoinGameDialog'
import { WebSocket as ws } from './websocket/wsconfig'

import { Provider } from 'react-redux'
import store from './redux/store'

const useStyles = makeStyles(theme => ({
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
    ws.onSend('test')

    const classes = useStyles()
    const theme = useTheme()

    const [currentView, setCurrentView] = useState(0)

    let content
    switch (currentView) {
        case 0:
            content = (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <NewGameDialog />
                    </Grid>
                    <Grid item xs={12}>
                        <JoinGameDialog />
                    </Grid>
                </Grid>
            )
            break
        case 1:
            content = 'Game Play' // <RegisterUserDialog />;
            break
        default:
            console.log(currentView, 'content is undefined')
            content = 'Undefined'
            break
    }

    return (
        <Provider store={store}>
            <Typography variant="h3" className={classes.title}>
                Literature!
            </Typography>
            <div className={classes.root}>{content}</div>
        </Provider>
    )
}

export default App
