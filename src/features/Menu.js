import React from 'react'
import {
	Button,
	Typography,
} from '@material-ui/core'

const Menu = ({onCreateNewGame, onJoinExistingGame}) => {

	return (
		<div>
			<Typography>Literature</Typography>
			<Button onClick={onCreateNewGame}>Create a New Game</Button>
			<Button onClick={onJoinExistingGame}>Join an Existing Game</Button>	
		</div>
	)
}

export default Menu
