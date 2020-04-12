import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography, Button } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards, getOpponents, getPlayerName, getNextTurnPlayer, getGamePin } from './gameSlice'
import RadioPlayers from './RadioPlayers'
import EnterCard from './EnterCard'
import { setCurrentView } from '../navigation/navigationSlice'

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
	title: {
		padding: theme.spacing(1),
	},
}))

export default function EnterTurn() {
	const classes = useStyles()
	const wsSend = useSendCb()

	const gamePin = useSelector(getGamePin)
	const playerName = useSelector(getPlayerName)

	const nextTurnPlayer = useSelector(getNextTurnPlayer)

	// state and callbacks for selction of opponent
	const allOpponents = useSelector(getOpponents)
	const [opponent, setOpponent] = React.useState(allOpponents[0].name)
	const selectOpponent = (event) => {
		setOpponent(event.target.value)
	}

	// state and callbacks for entering card
	const [card, setCard] = React.useState('')
	const selectCard = (event) => {
		setCard(event.target.value.toLowerCase())
	}

	const onKeyPress = (event) => {
		if (event.key === 'Enter') {
			enterTurn()
		}
	}

	// callback to enter question to server
	const enterTurn = () => {
		const message = {
			type: 'question',
			data: {
				pin: gamePin,
				questioner: playerName,
				respondent: opponent,
				card: card,
			},
		}
		wsSend(message)
		setCard('')
		setOpponent(allOpponents[0].name)
	}

	// pull out the cards - these will be sorted by the selector
	// const mostRecentTurn = useSelector(getMostRecentTurn)

	return nextTurnPlayer == playerName ? (
		<Paper className={classes.root}>
			<Typography variant="h4" className={classes.title}>
				Enter Turn
			</Typography>

			{/* Code for Entering Turn */}
			<Grid container justify="center" alignItems="center">
				<Grid item xs={3}>
					<RadioPlayers
						label="Opponents"
						allOptions={allOpponents}
						value={opponent}
						handleChange={selectOpponent}
					/>
				</Grid>
				<Grid item xs={3}>
					<EnterCard value={card} handleChange={selectCard} onKeyPress={onKeyPress} />
				</Grid>
				<Grid item xs={3}>
					<Button variant="contained" color="primary" onClick={enterTurn}>
						Submit Question
					</Button>
				</Grid>
			</Grid>

			{/* Code for Entering Declaration */}
			<Grid container justify="center" alignItems="center">
				<Grid item xs={2}></Grid>
			</Grid>
		</Paper>
	) : (
		<div />
	)
}
