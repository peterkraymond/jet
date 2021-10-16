import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import NewGame from '../game/NewGame'
import EnterPin from '../game/EnterPin'
import SelectPlayer from '../game/SelectPlayer'
import Menu from '../Menu'

import { useSelector } from 'react-redux'
import { getCurrentView, setCurrentView } from './navigationSlice'
import store from '../../store'


// pull in for testing
import useSendCb from '../../hooks/useSendCb'
// load test messages
import { createGameMessage, enterPinMessage, selectPlayerMessage } from '../game/TestMessages'
import Game from '../game/Game'

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

export default function Navigation() {
	const classes = useStyles()
	const theme = useTheme()

	// pull out wsSend capability for testing
	const wsSend = useSendCb()

	const reduxCurrentView = useSelector(getCurrentView)
	console.log(`Navigation.js: Current View: ${reduxCurrentView}`)

	// const [currentView, setCurrentView] = useState(reduxCurrentView)

	const createNewGame = () => {
		store.dispatch(setCurrentView('create-game'))
	}

	const joinExistingGame = () => {
		store.dispatch(setCurrentView('enter-pin'))
	}

	let content
	switch (reduxCurrentView) {
		case 'no-ws-connection':
			content = 'No WS Connected'
			break
		case 'main-menu':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<Menu onCreateNewGame={createNewGame} onJoinExistingGame={joinExistingGame}/>
					</Grid>
				</Grid>
			)
			break
		case 'create-game':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<NewGame />
					</Grid>
				</Grid>
			)
			// load test messages
			// wsSend(createGameMessage)
			break
		case 'enter-pin':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<EnterPin />
					</Grid>
				</Grid>
			)
			// wsSend(enterPinMessage)
			break
		case 'select-player':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<SelectPlayer />
					</Grid>
				</Grid>
			)
			// wsSend(selectPlayerMessage)
			break
		case 'game-play':
			content = <Game/>
			break
		case 'final-results':
			content = 'Final Results'
			break
		default:
			console.log(reduxCurrentView, 'content is undefined')
			content = 'Undefined'
			break
	}

	return <div className={classes.root}>{content}</div>
}
