import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
	Button,
	Container,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormGroup,
	FormControlLabel,
	Grid,
	Input,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
	useMediaQuery,
} from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getGamePin, getTeams } from './gameSlice'
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

export default function Teams() {
	const classes = useStyles()

	// pull out the teams object
	const teams = useSelector(getTeams)

	return (
		<div>
			<Typography variant="h4" className={classes.title}>
				Teams:
			</Typography>

			<Grid container spacing={3}>
				{teams.map((team) => (
					<TeamDiv key={team.name} team={team} />
				))}
			</Grid>
		</div>
	)
}

const TeamDiv = (props) => (
	<Grid item sm={6}>
		<Paper>
			<Typography>{props.team.name}</Typography>
			{props.team.players.map((player) => (
				<TeamPlayer key={player} player={player} />
			))}
		</Paper>
	</Grid>
)

const TeamPlayer = (props) => (
	<Grid item xs={2}>
		{props.player}
	</Grid>
)
