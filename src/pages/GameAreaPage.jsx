import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Cell from '../components/Cell'
import useCellIds from '../hooks/useCellIds';
import useGetShips from '../hooks/useGetShips';

function GameAreaPage() {
	const [player, setPlayer] = useState('') 
	const [opponent, setOpponent] = useState('')
/*  const [playerList, setPlayerList] = useState([])  */
 /* 	const [fullGame, setFullGame] = useState(false)  */
	const { gameUsername, socket } = useGameContext()
/* 	const [connected, setConnected] = useState(false) */
	const navigate = useNavigate()
	const players = ('sara', 'maria')



	const ids = useCellIds()
/* 	console.log('ids: ',ids) */

	const {ships} = useGetShips()
	//debugger
	console.log('test', ships)

	console.log('ids: ',ids)


	//***** PLAYERS *****//

	// Spara till senare när vi har id p spelarna

 	const randomPlayerStarts = () => {
		const random = Math.floor(Math.random() * 20 /10)
		console.log('RANDOMPLAYER', random)
	}	
	randomPlayerStarts(players)	 



	// connect to game when component is mounted
	useEffect(() => {
	// if no username, redirect them to the login page
		if (!gameUsername) {
			navigate('/')
		}

		const handleUpdatePlayers = (players) => {
			console.log(`players befor if-statement: ${players}`)
	
			if (players.lenggt === 2) {
				const thisPlayer = players.find((player) => player.id === socket.id)
				thisPlayer.currentPlayer = "player"
	
				const opponentPlayer = players.find((player) => player.id !== socket.id)
				opponentPlayer.currentPlayer = "opponent"
	
				setPlayer(thisPlayer)
				setOpponent(opponentPlayer)
				console.log(`thisPlayer ${thisPlayer}, opponentPlayer ${opponentPlayer}`)
			}
		}

		// listen for updated playerlist
		socket.on('update:players', handleUpdatePlayers)

		// emit join request
		socket.emit('player:joined', gameUsername)

		console.log(`gameUsername after player:joined event : ${gameUsername}`) 

	}, [gameUsername, navigate, socket])

	console.log("gameUsername after useEffect", gameUsername)

  return (
    <div>
        <main>

			<section className='gameAreaWrapper'>
				<div className="gameArea">
					<p>You: {player}</p>

					<div className="box">
						<div className='cell'>
							{ids && ids.map((id, i) => 
							<Cell key = {i} id = {id} />
						)}
						</div>	
					</div> 
				</div>	

				<div className="shipsLeftWrap">
					<div className="shipsLeftPlayer1">
						<h3>≪ Player 1</h3>
						<p>Ships left: 4 / 4</p>
					</div>

						<div className="shipsLeftPlayer2">
							<h3>Opponent ≫</h3>
							<p>Ships left: 4 / 4</p>
						</div>

						<div className="whosTurn">
							<p>Your/Opponents turn</p>
						</div>
					</div>


					<div className="gameArea">
						<p>Opponent: {opponent}</p>

						<div className="box">
							<div className='cell'>
									{ids && ids.map((id, i) => 
									<Cell key = {i} id = {id} />
								)}
							</div>
						</div> 
					</div>
				</section>
			</main>
		</div>
	)
}

export default GameAreaPage