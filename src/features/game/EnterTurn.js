import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography, Button } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards, getOpponents, getPlayerId, getPlayerName } from './gameSlice'
import AskPlayer from './AskPlayer'
import EnterCard from './EnterCard'
import { setCurrentView } from '../navigation/navigationSlice'

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

export default function EnterTurn() {
	const classes = useStyles()
	const wsSend = useSendCb()

	const playerId = useSelector(getPlayerId)
	const playerName = useSelector(getPlayerName)

	// state and callbacks for selction of opponent
	const allOpponents = useSelector(getOpponents)
	const [opponent, setOpponent] = React.useState(allOpponents[0])
	const selectOpponent = (event) => {
		setOpponent(event.target.value)
	}

	// state and callbacks for entering card
	const [card, setCard] = React.useState('')
	const selectCard = (event) => {
		setCard(event.target.value)
	}

	// callback to enter question to server
	const enterTurn = () => {
		const message = {
			type: 'question',
			data: {
				identifier: playerId,
				questioner: playerName,
				respondent: opponent,
				card: card,
			},
		}
		wsSend(message)
	}

	// pull out the cards - these will be sorted by the selector
	// const mostRecentTurn = useSelector(getMostRecentTurn)

	return (
		<div>
			<Typography variant="h4" className={classes.title}>
				Enter Turn:
			</Typography>

			<Grid container>
				<Grid item xs={4}>
					<AskPlayer
						allOptions={allOpponents}
						value={opponent}
						handleChange={selectOpponent}
					/>
				</Grid>
				<Grid item xs={4}>
					<EnterCard value={card} handleChange={selectCard} />
				</Grid>
				<Grid item xs={4}>
					<Button variant="contained" color="primary" onClick={enterTurn}>
						Submit Question
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}
