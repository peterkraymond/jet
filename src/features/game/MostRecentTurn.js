import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography, Snackbar } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards, getLastTurn, getNextTurnPlayer } from './gameSlice'
import { setCurrentView } from '../navigation/navigationSlice'
import RecentTurnSnack from './RecentTurnSnack'

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

export default function MostRecentTurn() {
	const classes = useStyles()

	const [snackIsOpen, setSnackIsOpen] = useState(false)
	const [snackMessage, setSnackMessage] = useState('')
	const openSnack = () => {
		setSnackIsOpen(true)
	}
	const setSnackClose = (event, reason) => {
		if (reason === 'clickaway') return
		setSnackIsOpen(false)
	}

	const last_turn = useSelector(getLastTurn)
	const next_turn = useSelector(getNextTurnPlayer)

	let content
	var result
	switch (last_turn['type']) {
		case 'turn':
			// QUESTIONER asked for/received the CARD from RESPONDENT
			// with a few easter eggs for some players ...
			if (
				last_turn['data']['outcome'] &&
				last_turn['data']['questioner'].toLowerCase() === 'peter'
			) {
				result = `${last_turn['data']['questioner']} was AWARDED the ${last_turn['data']['card']} from ${last_turn['data']['respondent']}`
			} else if (last_turn['data']['outcome']) {
				result = `${last_turn['data']['questioner']} RECEIVED the ${last_turn['data']['card']} from ${last_turn['data']['respondent']}`
			} else if (
				!last_turn['data']['outcome'] &&
				last_turn['data']['questioner'].toLowerCase() === 'toby'
			) {
				result = `${last_turn['data']['questioner']} aggressively ASKED ${last_turn['data']['respondent']} for the ${last_turn['data']['card']}, but no dice ...`
			} else {
				result = `${last_turn['data']['questioner']} ASKED ${last_turn['data']['respondent']} for the ${last_turn['data']['card']}, but did not receive it`
			}
			content = <Typography variant="h6">{result}</Typography>
			break
		case 'declaration':
			result = 'Declaration - see recent turn'
			content = (
				<Typography variant="h6">
					{last_turn['data']['player']}
					{last_turn['data']['outcome']
						? ' SUCCESSFULLY declared the '
						: ' FAILED to declare the '}
					{last_turn['data']['card_set']}
				</Typography>
			)
			break
		default:
			content = 'No Previous Turns'
			break
	}

	if (result !== snackMessage) {
		setSnackMessage(result)
		openSnack()
	}

	return (
		<Paper className={classes.root}>
			<Typography variant="h4" className={classes.title}>
				Turn Info
			</Typography>

			<Grid container spacing={1}>
				<Grid item xs={9}>
					<Typography variant="h5">Last Turn: </Typography>
					{content}
				</Grid>
				<Grid item xs={3}>
					<Typography variant="h5">Next Up: </Typography>
					<Typography>{next_turn}</Typography>
				</Grid>
			</Grid>
			<RecentTurnSnack
				open={snackIsOpen}
				handleClose={setSnackClose}
				message={snackMessage}
			/>
		</Paper>
	)
}
