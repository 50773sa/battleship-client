import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'  
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useGameContext } from '../contexts/GameContextProvider'

const StartGamePage = () => { //! APP.js
	 const [username, setUsername] = useState('')
	 const [room, setRoom] = useState('')
	 const { socket } = useGameContext()
	 const navigate = useNavigate()


    //! ***** PLAYERS AND ROOM *****//

	 const handleJoinRoom = (e) => {
		e.preventDefault()

		// send 'room' as data to server - handleJoinGame
		socket.emit('join:room', room)
		console.log('ROOM', room)

		navigate('/game')

	 }

	 	// connect to game when component is mounted
	useEffect(() => {
		// if no username, redirect them to the login page
			if (!username) {
				navigate('/')
			}

	}, [navigate])


	return (
		<div className='joinGameWrapper'>
        	<div className="joinGameBox">
				 <Form>
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
						<Form.Label>Room</Form.Label>
						<Form.Control
							onChange={e => setRoom(e.target.value)}
							placeholder="Pick room"
							required
							type="text"
							value={room}
						/>
					</Form.Group>

					<div className="d-flex justify-content-between">
						<Button 
						onClick={handleJoinRoom}
							variant="success" 
							type="submit" 
							className="w-100" 
							disabled={!username}>
								Join Game
							</Button> 
					 </div>
				</Form> 
				
       	 	</div>
    	</div>
	)
}

export default StartGamePage

