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

export default function RadioPlayers({ label, allOptions, value, handleChange }) {
	const classes = useStyles()

	return (
		<div>
			<FormControl component="fieldset">
				<FormLabel component="legend">{label}</FormLabel>
				<RadioGroup aria-label={label} name={label} value={value} onChange={handleChange}>
					{allOptions.map((player) => (
						<FormControlLabel
							key={player.name}
							value={player.name}
							control={<Radio />}
							label={player.name}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	)
}
