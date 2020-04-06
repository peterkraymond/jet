import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards, getSetsWithCards } from './gameSlice'
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

export default function Player() {
	const classes = useStyles()

	// pull out the cards - these will be sorted by the selector
	const sets = useSelector(getSetsWithCards)
	const cards = useSelector(getCards)

	return (
		<Paper className={classes.root}>
			<Typography variant="h4" className={classes.title}>
				Player Data:
			</Typography>

			<Grid container spacing={3}>
				{cards.map((card) => (
					<CardDisplay key={card} label={card} />
				))}
			</Grid>
		</Paper>
	)
}

const CardDisplay = (props) => (
	<Grid key={props} item>
		{props.label}
	</Grid>
)
