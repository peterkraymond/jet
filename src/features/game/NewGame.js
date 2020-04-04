import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Button,
	Checkbox,
	FormGroup,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
	Typography,
	useMediaQuery,
} from '@material-ui/core'
import _ from 'lodash'
import useSendCb from '../../hooks/useSendCb'
import { setField } from './gameSlice'
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
}))

export default function NewGame() {
	const classes = useStyles()
	const wsSend = useSendCb()

	// create state for virtual deck and players
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

	const handleClose = (evt) => {
		switch (evt.currentTarget.value) {
			case 'Cancel':
				break
			case 'Skip':
				store.dispatch(setCurrentView('enter-pin'))
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

	return (
		<div>
			<Paper className={classes.root}>
				<Typography>Details for New Game</Typography>

				<Typography>Team 1</Typography>
				<Grid container spacing={3}>
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

				<Typography>Team 2</Typography>
				<Grid container spacing={3}>
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

				<Button onClick={handleClose} color="secondary" value="Skip">
					Join Existing Game
				</Button>
				<Button onClick={handleClose} color="primary" value="Submit">
					Submit
				</Button>
			</Paper>
		</div>
	)
}
