import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, Grid, MenuItem, Paper, Select, Typography } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getPlayerNames } from './gameSlice'
import { setCurrentView } from '../navigation/navigationSlice'
import store from '../../store'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3, 2),
		margin: theme.spacing(1),
		width: '90%',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}))

export default function SelectPlayer() {
	const classes = useStyles()
	const wsSend = useSendCb()

	// get player names from datastore
	const allNames = useSelector(getPlayerNames)

	// create state to track player selected
	const [name, setName] = React.useState(allNames[0])

	// handle submit to next window
	const handleClose = (evt) => {
		switch (evt.currentTarget.value) {
			case 'Cancel':
				store.dispatch(setCurrentView('enter-pin'))
				break
			case 'Submit':
				const message = compileMessage()
				wsSend(message)
				break
			default:
				break
		}
	}
	// handle changing of parameters for react state
	const handleChange = (name) => (evt) => {
		switch (name) {
			case 'player':
				setName(evt.target.value)
				break
			default:
				break
		}
	}

	// create message to send back to ws connection
	const compileMessage = () => {
		const message = {
			type: 'select_player',
			data: {
				name: name,
			},
		}
		return message
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.root}>
				<Grid item>
					<Typography>Player </Typography>
					<Select fullWidth value={name} onChange={handleChange('player')}>
						{allNames.map((player) => (
							<MenuItem key={player} value={player}>
								{player}
							</MenuItem>
						))}
					</Select>
				</Grid>
			</Paper>
			<Button onClick={handleClose} color="secondary" value="Cancel">
				Return to Enter Pin
			</Button>
			<Button onClick={handleClose} color="primary" value="Submit">
				Submit
			</Button>
		</div>
	)
}
