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
	autoSpace: {
		flexGrow: 1,
	},
}))

export default function Teams() {
	const classes = useStyles()

	// pull out the teams object
	const teams = useSelector(getTeams)

	return (
		<div className={classes.root}>
			<Grid container spacing={1} className={classes.autoSpace}>
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
			<Typography variant="h4">{props.team.name.toUpperCase()}</Typography>
			<Typography variant="h6">Sets Won: {props.team.set_count}</Typography>
			<Grid container spacing={2}>
				{props.team.players.map((player) => (
					<TeamPlayer key={player.name} player={player} />
				))}
			</Grid>
		</Paper>
	</Grid>
)

const TeamPlayer = (props) => (
	<Grid item xs>
		<Typography variant="h5">{props.player.name}</Typography>
		<Typography>Card Count: {props.player.card_count}</Typography>
	</Grid>
)
