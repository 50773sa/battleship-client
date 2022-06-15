import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'  
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useGameContext } from '../contexts/GameContextProvider'

const StartGamePage = () => {
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState()
	const [roomlist, setRoomlist] = useState([])
	const { setMyTurn, setPlayers, setGameUsername, socket } = useGameContext()
	const usernameIndexRef = useRef()
	const navigate = useNavigate()
	const [gameFull, setGameFull] = useState(false)

	const onHandleSubmit = e => {
		e.preventDefault()

		// saves the players´s username into gameUsername that comes from gameContextProvider
	 	setGameUsername(username) 

		socket.emit('player:joined', username, room, status => {
			console.log(`Successully joined ${room} as ${username}`, status)

			if (!status.success) {
				setGameFull(true)
				return
			}

			setPlayers(status.players) 
			setMyTurn(status.yourTurn) 
			navigate(`/game/${room}`)
		})
	}
	// useEffect(() => {
	// 	return()=>{
	// 		console.log("Running cleanup in Startpage")
	// 		socket.off('get-room-list')
	// 		socket.off('game:mounted')
	// 	}
	// },[socket])

	useEffect(() => {
		setGameFull(false)
		socket.emit('get-room-list', rooms => {
			setRoomlist(rooms)
		})

		socket.on('game:mounted', (welcome) => {
			console.log(welcome); 
		  })

		return () => {
			socket.off('game:mounted')
	   } 
	}, [socket])

	

	return (
		<>
			{/**** Don´t let a third player join game ****/}
			{gameFull && (
				<div className="fullBgMsg">
					<h3>Game is full. Please try again later </h3>
				</div>
			)}

			{/**** if game is not full then show start-page ****/}
			{!gameFull && (
				<div className='joinGameWrapper'>
					<div className="joinGameBox">
						<Form onSubmit={onHandleSubmit}>
							<Form.Group className="mb-3" controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control
									onChange={e => setUsername(e.target.value)}
									ref={usernameIndexRef}
									placeholder="Enter your username"
									required
									type="text"
									value={username}
									autoFocus
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="room">
							<Form.Label>Game</Form.Label>
							<Form.Select
								onChange={e => setRoom(e.target.value)}
								required
								defaultValue="game"
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
			)}
		</>
	)
}

export default StartGamePage