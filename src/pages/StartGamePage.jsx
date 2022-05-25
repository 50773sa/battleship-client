import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'  
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useGameContext } from '../contexts/GameContextProvider'

const StartGamePage = () => {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState()
	const [roomlist, setRoomlist] = useState([])
	const { setGameUsername, socket } = useGameContext()
	const navigate = useNavigate()

	const onHandleSubmit = e => {
		e.preventDefault()

	 	setGameUsername(username) 
	/* 	setUsername("") */

		navigate('/game')
	}

	useEffect(() => {
		console.log("Requesting room list from server...")
		
		socket.emit('get-room-list', rooms => {
			setRoomlist(rooms)
		})
		
		// listen after game:mounted event
		socket.on('game:mounted', (welcome) => {
			console.log(welcome); // welcome message from server.js
			console.log(`Game is mounted and client with socket id '${socket.id}' connected to startpage`)
		  })
	}, [socket])

	return (
		<div className='joinGameWrapper'>
        	<div className="joinGameBox">
				<Form onSubmit={onHandleSubmit}>
					<Form.Group className="mb-3" controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control
							onChange={e => setUsername(e.target.value)}
							placeholder="Enter your username"
							required
							type="text"
							value={username}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="room">
					<Form.Label>Game</Form.Label>
					<Form.Select
						onChange={e => setRoom(e.target.value)}
						required
						value={room}
					>
						{roomlist.length === 0 && <option disabled>Loading...</option>}
						{roomlist.length && (
							<>
								<option value="">Select a game to join</option>
								{roomlist.map(r =>
									<option key={r.id} value={r.id}>{r.name}</option>
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
							disabled={!username || !room}>
								Join Game
							</Button>
					</div>
				</Form>
				
       	 	</div>
    	</div>
	)
}

export default StartGamePage

