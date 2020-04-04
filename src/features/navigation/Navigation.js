import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import NewGame from '../game/NewGame'
import EnterPin from '../game/EnterPin'
import SelectPlayer from '../game/SelectPlayer'
import Teams from '../game/Teams'

import { useSelector } from 'react-redux'
import { getCurrentView } from './navigationSlice'

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

	const reduxCurrentView = useSelector(getCurrentView)
	console.log(`Navigation.js: Current View: ${reduxCurrentView}`)

	// const [currentView, setCurrentView] = useState(reduxCurrentView)

	let content
	switch (reduxCurrentView) {
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
			break
		case 'enter-pin':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<EnterPin />
					</Grid>
				</Grid>
			)
			break
		case 'select-player':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<SelectPlayer />
					</Grid>
				</Grid>
			)
			break
		case 'game-play':
			content = (
				<Grid container>
					<Grid item xs={12}>
						<Teams />
					</Grid>
					<Grid item xs={12}>
						{/*<MyPlayer />*/}
						'MyPlayer'
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

