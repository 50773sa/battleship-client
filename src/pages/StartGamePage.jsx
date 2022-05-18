import { useEffect, /* useState */ } from 'react'
import { Link, useNavigate } from 'react-router-dom' 

function StartGamePage( { socket } ) { // tar emot socket från App.jsx
 	/* const [player1, setPlayer1] = useState(null)
	const [player2, setPlayer2] = useState(null)  */


	const navigate = useNavigate()


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
	}, [socket]) // skicka in navigate också som dependecy????


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

export default StartGamePage