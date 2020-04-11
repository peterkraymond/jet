import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
	Typography,
	Radio,
	RadioGroup,
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

	// create state to control 6 or 8 player game
	const [numPlayers, setNumPlayers] = React.useState('6')
	const handleNumPlayersChange = (event) => {
		setNumPlayers(event.target.value)
	}

	// create state for virtual deck and players
	const [useVirtualDeck, setUseVirtualDeck] = React.useState(true)
	const [players, setPlayers] = React.useState([
		{ name: 'Player 0', type: 'network' },
		{ name: 'Player 1', type: 'network' },
		{ name: 'Player 2', type: 'network' },
		{ name: 'Player 3', type: 'network' },
		{ name: 'Player 4', type: 'network' },
		{ name: 'Player 5', type: 'network' },
		{ name: 'Player 6', type: 'network' },
		{ name: 'Player 7', type: 'network' },
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
				break
			default:
				break
		}
	}
	// handle changing of parameters for react state
	const handleChange = (name, idx) => (evt) => {
		const newPlayers = _.cloneDeep(players)
		switch (name) {
			case 'virtualDeck':
				setUseVirtualDeck(evt.target.checked)
				break

			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 'playerName':
				// deep clone array
				// NOTE: could use es6 style clone playersCopy = [...players]
				// but only for shallow copy - not for nested or objects. Instead
				// use lodash for a deep copy
				newPlayers[idx].name = evt.target.value
				setPlayers(newPlayers)
				break
			case 'playerType':
				evt.target.checked
					? (newPlayers[idx].type = 'computer')
					: (newPlayers[idx].type = 'network')
				setPlayers(newPlayers)
				break
			default:
				break
		}
	}

	// create message to send back to ws connection
	const compileMessage = () => {
		const playersData = players.slice(0, numPlayers).map((player) => {
			const entry = { name: player.name, type: player.type }
			return entry
		})
		const teamsData = [
			{
				name: 'team 1',
				players: players.slice(0, numPlayers / 2).map((player) => player.name),
			},
			{
				name: 'team 2',
				players: players.slice(numPlayers / 2, numPlayers).map((player) => player.name),
			},
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
				<Typography variant="h4">Game Setup:</Typography>

				<Grid container spacing={3}>
					<FormControl component="fieldset">
						<FormLabel component="legend">Select Number of Players: </FormLabel>
						<RadioGroup
							aria-label="Number of Players"
							name="Number of Players"
							value={numPlayers}
							onChange={(event) => setNumPlayers(event.target.value)}
						>
							<FormControlLabel
								value="6"
								control={<Radio color="primary" />}
								label="6"
							/>
							<FormControlLabel
								value="8"
								control={<Radio color="primary" />}
								label="8"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>

				<TeamDiv
					teamName="Team 1"
					players={players.slice(0, numPlayers / 2)}
					handleChange={handleChange}
					idxOffset={0}
				/>

				<TeamDiv
					teamName="Team 2"
					players={players.slice(numPlayers / 2, numPlayers)}
					handleChange={handleChange}
					idxOffset={numPlayers / 2}
				/>

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

const TeamDiv = (props) => (
	<Grid container spacing={3}>
		<Grid item md={2}>
			<Typography>{props.teamName}: </Typography>
		</Grid>
		{props.players.map((player, idx) => (
			<Grid item key={idx} md={2}>
				<TextField
					key={idx}
					placeholder={player.name}
					onChange={props.handleChange('playerName', idx + props.idxOffset)}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={player.type === 'computer'}
							onChange={props.handleChange('playerType', idx + props.idxOffset)}
							color="primary"
						/>
					}
					label="Computer Player"
				/>
			</Grid>
		))}
	</Grid>
)
