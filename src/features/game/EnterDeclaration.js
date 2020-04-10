import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography, Button } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import {
	getCards,
	getTeammates,
	getPlayerId,
	getPlayerName,
	getCardsForSet,
	getNextTurnPlayer,
} from './gameSlice'
import AskPlayer from './AskPlayer'
import EnterCard from './EnterCard'
import SelectOption from './SelectOption'
import RadioPlayers from './RadioPlayers'
import { setCurrentView } from '../navigation/navigationSlice'
import _ from 'lodash'

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
	title: {
		padding: theme.spacing(3),
	},
}))

export default function EnterDeclaration() {
	const classes = useStyles()
	const wsSend = useSendCb()

	const playerId = useSelector(getPlayerId)
	const playerName = useSelector(getPlayerName)

	const nextTurnPlayer = useSelector(getNextTurnPlayer)

	// state and callbacks for selecting a set
	const allSets = [
		'low_spades',
		'high_spades',
		'low_diamonds',
		'high_diamonds',
		'low_clubs',
		'high_clubs',
		'low_hearts',
		'high_hearts',
	]
	// TODO: make the selection of sets relevant to only what the user has in hand
	const [declarationSet, setDeclarationSet] = React.useState('')
	const delcarationCards = getCardsForSet(declarationSet)
	const teammates = useSelector(getTeammates)
	const [declarePlayers, setDeclarePlayers] = React.useState(Array(6).fill(playerName))
	// var declarePlayers = Array(6).fill(playerName)

	const selectPlayerForIdx = (player, idx) => {
		console.debug(`Player: ${player} and idx: ${idx}`)
		// setDeclarePlayers
		setDeclarePlayers([
			...declarePlayers.slice(0, idx),
			player,
			...declarePlayers.slice(idx + 1),
		])
	}

	// callback to enter declaration to server
	const enterDeclaration = () => {
		const delcarationCards = getCardsForSet(declarationSet)

		var declareMap = []
		delcarationCards.map((card, idx) =>
			declareMap.push({ card: card, player: declarePlayers[idx] })
		)

		const message = {
			type: 'declaration',
			data: {
				name: playerName,
				card_set: declarationSet,
				declared_map: declareMap,
			},
		}
		wsSend(message)
		console.log(message)
	}

	// pull out the cards - these will be sorted by the selector
	// const mostRecentTurn = useSelector(getMostRecentTurn)

	return nextTurnPlayer == playerName ? (
		<Paper className={classes.root}>
			<Typography variant="h4" className={classes.title}>
				Enter Declaration:
			</Typography>

			<Grid container justify="center" alignItems="center">
				<Grid item xs={2}>
					<SelectOption
						label="Select Set"
						options={allSets}
						selected={declarationSet}
						onChange={(e) => setDeclarationSet(e.target.value)}
					/>
				</Grid>

				{delcarationCards.map((card, idx) => (
					<AssignCard
						key={card}
						card={card}
						teammates={teammates}
						player={declarePlayers[idx]}
						selectPlayer={(e) => selectPlayerForIdx(e, idx)}
					/>
				))}

				<Grid item xs={2}>
					<Button variant="contained" color="primary" onClick={enterDeclaration}>
						Submit Declaration
					</Button>
				</Grid>
			</Grid>
		</Paper>
	) : (
		<div />
	)
}

const AssignCard = (props) => (
	<Grid item xs={1}>
		<Typography variant="h4">{props.card}</Typography>
		<RadioPlayers
			label="Teammates"
			allOptions={props.teammates}
			value={props.player}
			handleChange={(e) => props.selectPlayer(e.target.value)}
		/>
	</Grid>
)
