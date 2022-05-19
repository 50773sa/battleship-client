import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'  
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useGameContext } from '../contexts/GameContextProvider'

const StartGamePage = () => {
	const [username, setUsername] = useState('')
 	const [game, setGame] = useState() 
	const [gamelist, setGamelist] = useState([]) 
	const { setGameUsername, socket } = useGameContext()
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()

		setGameUsername(username)

		navigate(`/games/${game}`)
	}

	useEffect(() => {
		console.log("Requesting game list from server")

		socket.emit('get-game-list', games => {
			setGamelist(games)
		})
		/* // lyssna efter join:game events från servern
		socket.on('player:joined')

		// lyssna efter en uppdaterad spelarlista
		socket.on('player:list') */
	}, [socket]) 

	return (
		<div className='joinGameWrapper'>
        	<div className="joinGameBox">
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="username">
						<Form.Label><p>Username</p></Form.Label>
						<Form.Control
							onChange={e => setUsername(e.target.value)}
							placeholder="Enter your username"
							required
							type="text"
							value={username}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="game">
						<Form.Label><p>Game</p></Form.Label>
						<Form.Select
							onChange={e => setGame(e.target.value)}
							required
							value={game}
						>
							{gamelist.length === 0 && <option disabled>Loading...</option>}
							{gamelist.length && (
								<>
									<option value="">Select a game to join</option>
									{gamelist.map(g =>
										<option key={g.id} value={g.id}>{g.name}</option>
									)}
								</>
							)}
						</Form.Select>
					</Form.Group>


					<div className="d-flex justify-content-between">
						<Button 
							variant="success" 
							type="submit" 
							className="w-100" 
							disabled={!username || !game}>
								Join Game
							</Button>
					</div>
				</Form>
				
       	 	</div>
    	</div>
	)
}

export default StartGamePage

/* function StartGamePage( { socket } ) { // tar emot socket från App.jsx
 	const [players, setPlayers] = useState([])

	const navigate = useNavigate()

	const onUpdatePlayers = playerlist => {
		console.log("Updated playerlist", playerlist, players)
		setPlayers(playerlist)
	}

	const handlePlayerClickedBtn = () => {
		console.log(`Client ${socket.id} wants to join the game`)
		socket.emit('join:game') // eventet emitas till servern som sedan ska skicka tillbaka
	}

	// funktion för att kolla om  det finns en eller två spelare som vill spela
	const onJoinGame = () => {
		navigate('/game')
	}

	useEffect(() => {
		// lyssna efter join:game events från servern
		socket.on('join:game', onJoinGame)

		// lyssna efter en uppdaterad spelarlista
		socket.on('player:list', onUpdatePlayers)
	}, [socket]) 


  return (
    <div className='joinGameWrapper'>
        <div className="joinGameBox">
            <p>Battleship</p>
				<button
				 	onClick={handlePlayerClickedBtn}  
					as={Link}
					className='btn startGameBtn'
					> Join Game
				</button>
        </div>
    </div>
  )
}

export default StartGamePage */