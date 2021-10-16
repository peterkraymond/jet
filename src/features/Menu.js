import React from 'react'
import {
	Button,
	Grid,
	Typography,
} from '@material-ui/core'

const Menu = ({onCreateNewGame, onJoinExistingGame}) => {

	return (
		<div>
			<Typography variant="h3">Literature</Typography>
			<div style={{ padding: 10 }}></div>
			<Grid container direction="column" justifyContent="center" alignItems="center">
				<Button onClick={onCreateNewGame}>Create a New Game</Button>
				<Button onClick={onJoinExistingGame}>Join an Existing Game</Button>	
			</Grid>
		</div>
	)
}

export default Menu
