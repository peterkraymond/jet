import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import useSendCb from '../../hooks/useSendCb'
import { useSelector } from 'react-redux'
import { getGamePin } from './gameSlice'
import { setCurrentView } from '../navigation/navigationSlice'
import store from '../../store'

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
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}))

export default function EnterPin() {
	const classes = useStyles()
	const wsSend = useSendCb()

	// use selector for game pin
	const reduxGamePin = useSelector(getGamePin)
	const [pin, setPin] = React.useState(reduxGamePin)

	const handleClose = (evt) => {
		switch (evt.currentTarget.value) {
			case 'Cancel':
				store.dispatch(setCurrentView('create-game'))
				break
			case 'Submit':
				const message = compileMessage()
				wsSend(message)
				break
			default:
				break
		}
	}
	// handle changing of parameters for react state
	const handleChange = (name) => (evt) => {
		switch (name) {
			case 'pin':
				setPin(Number(evt.target.value))
				break
			default:
				break
		}
	}

	// create message to send back to ws connection
	const compileMessage = () => {
		const message = {
			type: 'enter_pin',
			data: {
				pin: pin,
			},
		}
		return message
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.root}>
				<Grid container direction="row" spacing={3}>
					<Grid item sm={12}>
						<Typography>Game Pin </Typography>
						<TextField placeholder={pin.toString()} onChange={handleChange('pin')} />
					</Grid>
				</Grid>
			</Paper>
			<Button onClick={handleClose} color="secondary" value="Cancel">
				Return to Create Game
			</Button>
			<Button onClick={handleClose} color="primary" value="Submit">
				Submit
			</Button>
		</div>
	)
}
