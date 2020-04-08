import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import NewGame from '../game/NewGame'
import EnterPin from '../game/EnterPin'
import SelectPlayer from '../game/SelectPlayer'
import MostRecentTurn from '../game/MostRecentTurn'
import EnterTurn from '../game/EnterTurn'
import EnterDeclaration from '../game/EnterDeclaration'
import Teams from '../game/Teams'
import Player from '../game/Player'

import { useSelector } from 'react-redux'
import { getCurrentView } from './navigationSlice'

// pull in for testing
import useSendCb from '../../hooks/useSendCb'
// load test messages
import { createGameMessage, enterPinMessage, selectPlayerMessage } from '../game/TestMessages'

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

export default function Navigation() {
	const classes = useStyles()
	const theme = useTheme()

	// pull out wsSend capability for testing
	const wsSend = useSendCb()

	const reduxCurrentView = useSelector(getCurrentView)
	console.log(`Navigation.js: Current View: ${reduxCurrentView}`)

	// const [currentView, setCurrentView] = useState(reduxCurrentView)

	let content
	switch (reduxCurrentView) {
		case 'no-ws-connection':
			content = 'No WS Connected'
		case 'create-game':
			// TODO: Convert to stepper to include
			// 1. new game
			// 2. enter pin
			// 2. select player
			// 3. game play
			// 4. final results
			content = (
				<Grid container>
					<Grid item xs={12}>
						<NewGame />
					</Grid>
				</Grid>
			)
			// load test messages
			wsSend(createGameMessage)
			break
		case 'enter-pin':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<EnterPin />
					</Grid>
				</Grid>
			)
			wsSend(enterPinMessage)
			break
		case 'select-player':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<SelectPlayer />
					</Grid>
				</Grid>
			)
			wsSend(selectPlayerMessage)
			break
		case 'game-play':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<Teams />
					</Grid>
					<Grid item xs={12}>
						<MostRecentTurn />
					</Grid>
					<Grid item xs={12}>
						<Player />
					</Grid>
					<Grid item xs={12}>
						<EnterTurn />
					</Grid>
					<Grid item xs={12}>
						<EnterDeclaration />
					</Grid>
				</Grid>
			)
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
