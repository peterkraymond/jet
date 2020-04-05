import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards } from './gameSlice'
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

	// pull out the cards - these will be sorted by the selector
	// const mostRecentTurn = useSelector(getMostRecentTurn)

	return (
		<div>
			<Typography variant="h4" className={classes.title}>
				Most Recent Turn:
			</Typography>

			<Grid container spacing={3}>
				<Grid item xs={12}>
					'Most recent turn information goes here.'
				</Grid>
			</Grid>
		</div>
	)
}
