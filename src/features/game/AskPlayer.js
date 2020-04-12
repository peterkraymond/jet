import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getCards } from './gameSlice'
import { setCurrentView } from '../navigation/navigationSlice'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

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

export default function AskPlayer({ allOptions, value, handleChange }) {
	const classes = useStyles()

	return (
		<div>
			<FormControl component="fieldset">
				<FormLabel component="legend">Opponents</FormLabel>
				<RadioGroup
					aria-label="opponents"
					name="opponents"
					value={value}
					onChange={handleChange}
				>
					{allOptions.map((opponent) => (
						<FormControlLabel
							key={opponent.name}
							value={opponent.name}
							control={<Radio />}
							label={opponent.name}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	)
}
