import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import NewGameDialog from '../NewGameDialog/NewGameDialog'
import JoinGameDialog from '../JoinGameDialog/JoinGameDialog'

import { useSelector } from 'react-redux'
import { getCurrentView } from './navigationSlice'

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

function Navigation() {
	const classes = useStyles()
	const theme = useTheme()

	const reduxCurrentView = useSelector(getCurrentView)
	console.log(`Navigation.js: Current View: ${reduxCurrentView}`)

	const [currentView, setCurrentView] = useState(reduxCurrentView)

	let content
	switch (currentView) {
		case 'landing':
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
		case 'game-play':
			content = 'Game Play' // <RegisterUserDialog />;
			break
		default:
			console.log(currentView, 'content is undefined')
			content = 'Undefined'
			break
	}

	return <div className={classes.root}>{content}</div>
}

export default Navigation
