import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Cell from '../components/Cell'
import useCellIds from '../hooks/useCellIds';
import Ships from '../components/Ships';

function GameAreaPage() {
	const [player, setPlayer] = useState('') 
	const [opponent, setOpponent] = useState('')
/* 	const [playerList, setPlayerList] = useState([]) */
/* 	const [fullGame, setFullGame] = useState(false) */
	const { gameUsername, socket } = useGameContext()
/* 	const [connected, setConnected] = useState(false) */
	const navigate = useNavigate()
	const players = ('sara', 'maria')



	const ids = useCellIds()

	//***** PLAYERS *****//
 	const handleUpdatePlayers = (player, opponent) => {
		console.log("Got new playerlist", player, opponent)
		setPlayer(player)
		setOpponent(opponent)
	} 

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

		// emit join request
		socket.emit('player:joined', gameUsername)

		// listen for updated playerlist
		socket.on('update:players', handleUpdatePlayers) 
		
	}, [gameUsername])

  return (
    <div>
        <main>

			<section className='gameAreaWrapper'>
				<div className="gameArea">
					<p>{player}</p>

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
						<h3>≪ {player}</h3>
						<p>Ships left: 4 / 4</p>
					</div>

						<div className="shipsLeftPlayer2">
							<h3>{opponent} ≫</h3>
							<p>Ships left: 4 / 4</p>
						</div>

						<div className="whosTurn">
							<p>Your/Opponents turn</p>
						</div>
					</div>


					<div className="gameArea">
						<p>{opponent}</p>

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