import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards } from './gameSlice'
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

export default function EnterCard({ value, handleChange, onKeyPress }) {
	const classes = useStyles()

	return (
		<div>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="standard-basic"
					label="Card"
					value={value}
					onChange={handleChange}
					onKeyPress={onKeyPress}
				/>
			</form>
		</div>
	)
}
