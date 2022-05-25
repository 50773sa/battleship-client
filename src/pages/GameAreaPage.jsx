import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Cell from '../components/Cell'
import useCellIds from '../hooks/useCellIds';
import useGetShips from '../hooks/useGetShips';

const GameAreaPage = () => {

	//**** PLAYERS ****/
	const { players, setPlayers, gameUsername, socket } = useGameContext()
	const navigate = useNavigate()

	//**** GRIDS ****/
	const ids = useCellIds()
/* 	console.log('ids: ',ids) */
/* 	const {ships} = useGetShips() */
	//debugger
/* 	console.log('test', ships)
	console.log('ids: ',ids) */

	const opponent_id = Object.keys(players).find(id => (id !== socket.id))

	const handleUpdatePlayers = playerlist => {
		console.log("Got new playerlist", playerlist)
		setPlayers(playerlist)
	}

	// connect to game when component is mounted
	useEffect(() => {
	// if no username, redirect them to the login page
		if (!gameUsername) {
			navigate('/')
			return
		}

		// listen for updated playerlist
		socket.on('player:list', handleUpdatePlayers)

	}, [socket, gameUsername, navigate])

  return (
    <div>
        <main>

			<section className='gameAreaWrapper'>
				<div className="gameArea">
					
					<p>You: {players[socket.id]}</p>

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
						<p>Opponent: {players[opponent_id]}</p>

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