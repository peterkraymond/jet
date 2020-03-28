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
import useSendCb from '../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getPlayerNames } from '../redux/selectors'

const useStyles = makeStyles(theme => ({
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
}))

export default function JoinGameDialog() {
	const classes = useStyles()
	const wsSend = useSendCb()

	// get player names from datastore
	const allNames = useSelector(getPlayerNames)

	// create state for modal dialog state
	const [open, setOpen] = React.useState(false)
	// TODO: create redux selector for pin
	const [pin, setPin] = React.useState(1234)
	const [name, setName] = React.useState(allNames[0])

	// identify basic theming and responsive dialog size
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

	// handle opening and closing of the dialog window
	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = evt => {
		switch (evt.currentTarget.value) {
			case 'Cancel':
				break
			case 'Submit':
				const message = compileMessage()
				wsSend(message)
				break
			default:
				break
		}
		setOpen(false)
	}
	// handle changing of parameters for react state
	const handleChange = name => evt => {
		switch (name) {
			case 'pin':
				setPin(Number(evt.target.value))
				break
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
			type: 'connect',
			data: {
				pin: pin,
				name: name,
			},
		}
		return message
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Join Existing Game
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
						<Grid container direction="row" spacing={3}>
							<Grid item sm={6}>
								<Typography>Game Pin </Typography>
								<TextField
									placeholder={pin.toString()}
									onChange={handleChange('pin')}
								/>
							</Grid>
							<Grid item>
								<Typography>Player </Typography>
								<Select fullWidth value={name} onChange={handleChange('player')}>
									{allNames.map(player => (
										<MenuItem key={player} value={player}>
											{player}
										</MenuItem>
									))}
								</Select>
							</Grid>
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
