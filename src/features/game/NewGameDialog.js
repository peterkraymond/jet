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
	Paper,
	TextField,
	Typography,
	useMediaQuery,
} from '@material-ui/core'
import _ from 'lodash'
import useSendCb from '../../hooks/useSendCb'
import { setField } from './gameSlice'
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

export default function NewGameDialog() {
	const classes = useStyles()
	const wsSend = useSendCb()

	// create state for modal dialog state
	const [open, setOpen] = React.useState(false)
	const [useVirtualDeck, setUseVirtualDeck] = React.useState(true)
	// const [players, setPlayers] = React.useState({
	// 	p0: 'Player 0',
	// 	p1: 'Player 1',
	// 	p2: 'Player 2',
	// 	p3: 'Player 3',
	// 	p4: 'Player 4',
	// 	p5: 'Player 5',
	// })
	// TODO: come back to consider swapping object for array for easier mapping back to ws messages
	const [players, setPlayers] = React.useState([
		'Player 0',
		'Player 1',
		'Player 2',
		'Player 3',
		'Player 4',
		'Player 5',
	])

	// identify basic theming and responsive dialog size
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

	// handle opening and closing of the dialog window
	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = (evt) => {
		switch (evt.currentTarget.value) {
			case 'Cancel':
				break
			case 'Submit':
				const message = compileMessage()
				wsSend(message)
				// TODO: move this to another location, but for now, update the game with the cards for each player
				// const allUpdates = updateCards()
				// allUpdates.map(message => {
				// 	wsSend(message)
				// })
				// TODO: this should be removed and more data should be returned with the create game message
				store.dispatch(setField('all_players', players))
				break
			default:
				break
		}
		setOpen(false)
	}
	// handle changing of parameters for react state
	const handleChange = (name) => (evt) => {
		switch (name) {
			case 'virtualDeck':
				setUseVirtualDeck(evt.target.checked)
				break
			// TODO: remove the below section after discussion around pros and cons
			case 'p0':
			case 'p1':
			case 'p2':
			case 'p3':
			case 'p4':
			case 'p5':
			case 'p6':
				setPlayers((players) => ({
					...players,
					[name]: evt.target.value,
				}))
				break
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
				// deep clone array
				// NOTE: could use es6 style clone playersCopy = [...players]
				// but only for shallow copy - not for nested or objects. Instead
				// use lodash for a deep copy
				const newPlayers = _.cloneDeep(players)
				newPlayers[name] = evt.target.value
				setPlayers(newPlayers)
				break
			default:
				break
		}
	}

	// create message to send back to ws connection
	const compileMessage = () => {
		const playersData = players.map((player) => {
			const entry = { name: player, type: 'network' }
			return entry
		})
		const teamsData = [
			{ name: 'team 1', players: players.slice(0, 3) },
			{ name: 'team 2', players: players.slice(3, 6) },
		]
		const data = {
			players: playersData,
			teams: teamsData,
			virtual_deck: useVirtualDeck,
		}
		const message = {
			type: 'create_game',
			data: data,
		}
		return message
	}

	// create message to update cards for each player
	// NOTE: this is hardcoded for temporary setup
	const updateCards = () => {
		const allUpdates = [
			{
				type: 'update_cards',
				data: {
					player: players[0],
					cards: ['6c', 'jc', 'as', '3d', '6h', '7d', '3s', '3h'],
				},
			},
			{
				type: 'update_cards',
				data: {
					player: players[1],
					cards: ['2c', '5s', 'qs', '2h', '9h', '10c', 'ad', '6d'],
				},
			},
			{
				type: 'update_cards',
				data: {
					player: players[2],
					cards: ['qh', 'jd', 'js', '5c', '7h', '10d', 'ah', '7c'],
				},
			},
			{
				type: 'update_cards',
				data: {
					player: players[3],
					cards: ['2s', '2d', '4c', 'ac', 'kd', '5h', 'jh', 'qc'],
				},
			},
			{
				type: 'update_cards',
				data: {
					player: players[4],
					cards: ['5d', '4h', '6s', 'qd', '10s', '3c', '9d', 'kc'],
				},
			},
			{
				type: 'update_cards',
				data: {
					player: players[5],
					cards: ['kh', '4d', '4s', '7s', '9s', '9c', '10h', 'ks'],
				},
			},
		]
		return allUpdates
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Create New Game
			</Button>
			<Dialog
				fullScreen={fullScreen}
				maxWidth={'md'}
				fullWidth={true}
				open={open}
				onClose={handleClose}
			>
				<DialogTitle id="form-dialog-title">Game Setup</DialogTitle>
				<DialogContent>
					<Paper className={classes.root}>
						<Typography>Team 1</Typography>
						<Grid container spacing={1}>
							<Grid item md={4}>
								<TextField placeholder={players[0]} onChange={handleChange(0)} />
							</Grid>
							<Grid item md={4}>
								<TextField placeholder={players[1]} onChange={handleChange(1)} />
							</Grid>
							<Grid item md={4}>
								<TextField placeholder={players[2]} onChange={handleChange(2)} />
							</Grid>
						</Grid>
					</Paper>
					<Paper className={classes.root}>
						<Typography>Team 2</Typography>
						<Grid container spacing={1}>
							<Grid item md={4}>
								<TextField placeholder={players[3]} onChange={handleChange(3)} />
							</Grid>
							<Grid item md={4}>
								<TextField placeholder={players[4]} onChange={handleChange(4)} />
							</Grid>
							<Grid item md={4}>
								<TextField placeholder={players[5]} onChange={handleChange(5)} />
							</Grid>
						</Grid>
					</Paper>
					<Paper className={classes.root}>
						<Typography>Settings</Typography>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										checked={useVirtualDeck}
										onChange={handleChange('virtualDeck')}
										value="useVirtualDeck"
										color="primary"
									/>
								}
								label="Use Virtual Deck"
							/>
						</FormGroup>
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
