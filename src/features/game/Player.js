import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards, getSetsWithCards } from './gameSlice'
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

export default function Player() {
	const classes = useStyles()

	// pull out the cards - these will be sorted by the selector
	const sets = useSelector(getSetsWithCards)
	const cards = useSelector(getCards)

	return (
		<Paper className={classes.root}>
			<Typography variant="h4" className={classes.title}>
				Player Data
			</Typography>

			<Grid container spacing={1}>
				{Object.keys(sets).map((set) => (
					<SetDisplay key={set} sets={sets} idx={set} />
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

const SetDisplay = (props) => (
	<Grid key={props} item>
		{props.sets[props.idx].length ? <Typography>{props.idx.toUpperCase()}</Typography> : ''}
		{props.sets[props.idx].map((card) => (
			<Grid key={card} item>
				<CardDisplay key={card} label={card} />
			</Grid>
		))}
	</Grid>
)
