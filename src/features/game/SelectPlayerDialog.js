import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Button,
	Container,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormGroup,
	FormControlLabel,
	Grid,
	Input,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
	useMediaQuery,
} from '@material-ui/core'
import _ from 'lodash'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getPlayerNames } from './gameSlice'
import { setCurrentView } from '../navigation/navigationSlice'
import store from '../../store'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2, 1),
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
}))

export default function SelectPlayerDialog() {
	const classes = useStyles()
	const wsSend = useSendCb()

	// get player names from datastore
	const allNames = useSelector(getPlayerNames)
	console.log(`allNames: ${allNames}`)
	// const allNames = ['Player 0', 'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5']

	// create state for modal dialog state
	const [open, setOpen] = React.useState(false)

	// use selector for game pin
	const [name, setName] = React.useState(allNames[0])

	// identify basic theming and responsive dialog size
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

	// handle opening and closing of the dialog window
	const handleClickOpen = () => {
		// TODO: update all variables based on selectors
		setName(allNames[0])
		setOpen(true)
	}
	const handleClose = (evt) => {
		switch (evt.currentTarget.value) {
			case 'Cancel':
				break
			case 'Submit':
				const message = compileMessage()
				wsSend(message)
				// update the view to now be on game-play
				store.dispatch(setCurrentView('game-play'))
				break
			default:
				break
		}
		setOpen(false)
	}
	// handle changing of parameters for react state
	const handleChange = (name) => (evt) => {
		switch (name) {
			case 'player':
				setName(evt.target.value)
				break
			case 5:
				// deep clone array
				// NOTE: could use es6 style clone playersCopy = [...players]
				// but only for shallow copy - not for nested or objects. Instead
				// use lodash for a deep copy
				// const newPlayers = _.cloneDeep(players)
				// newPlayers[name] = evt.target.value
				// setPlayers(newPlayers)
				break
			default:
				break
		}
	}

	// create message to send back to ws connection
	const compileMessage = () => {
		const message = {
			type: 'connect_to_game',
			data: {
				name: name,
			},
		}
		return message
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Select Player
			</Button>
			<Dialog
				fullScreen={fullScreen}
				maxWidth={'md'}
				fullWidth={true}
				open={open}
				onClose={handleClose}
			>
				<DialogTitle id="form-dialog-title">Join Game</DialogTitle>
				<DialogContent>
					<Paper className={classes.root}>
						<Grid container direction="row" spacing={1}>
							<Grid item sm={6}>
								<Typography>Game Pin </Typography>
								<TextField
									placeholder={pin.toString()}
									onChange={handleChange('pin')}
								/>
							</Grid>
							{/*	<Grid item>
								<Typography>Player </Typography>
								<Select fullWidth value={name} onChange={handleChange('player')}>
									{allNames.map(player => (
										<MenuItem key={player} value={player}>
											{player}
										</MenuItem>
									))}
								</Select>
							</Grid>*/}
						</Grid>
					</Paper>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" value="Cancel">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary" value="Submit">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
