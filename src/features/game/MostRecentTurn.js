import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards, getLastTurn } from './gameSlice'
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

export default function MostRecentTurn() {
	const classes = useStyles()

	const last_turn = useSelector(getLastTurn)

	let content
	switch (last_turn['type']) {
		case 'turn':
			// QUESTIONER asked for/received the CARD from RESPONDENT
			content = (
				<Typography>
					{last_turn['data']['questioner']}
					{last_turn['data']['outcome'] ? ' received the ' : ' asked for the '}
					{last_turn['data']['card']}
					{' from '}
					{last_turn['data']['respondent']}
				</Typography>
			)
			break
		case 'declaration':
			content = (
				<Typography>
					{last_turn['data']['player']}
					{last_turn['data']['outcome']
						? ' successfully declared the '
						: ' failed to declare the '}
					{last_turn['data']['card_set']}
				</Typography>
			)
			break
		default:
			content = 'No Previous Turns'
			break
	}

	// pull out the cards - these will be sorted by the selector
	// const mostRecentTurn = useSelector(getMostRecentTurn)

	return (
		<Paper className={classes.root}>
			<Typography variant="h4" className={classes.title}>
				Most Recent Turn:
			</Typography>

			<Grid container spacing={3}>
				<Grid item xs={12}>
					{content}
				</Grid>
			</Grid>
		</Paper>
	)
}
