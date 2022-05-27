import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Cell from '../components/Cell'
import useCellIds from '../hooks/useCellIds';
import GetShips from '../components/GetShips';


const GameAreaPage = () => {
	//**** GRIDS ****/
	const ids =  useCellIds()
	/* 	console.log('ids: ',ids) */
	GetShips()
		//debugger
	/* 	console.log('test', ships)
		console.log('ids: ',ids) */

	//**** PLAYERS ****/
	const { players, setPlayers, gameUsername, socket } = useGameContext()
	const navigate = useNavigate()
	const [myTurn, setMyTurn] = useState()

	// tracks the opponents id with obejct.keys since players is an object and not an array 
	const opponent_id = Object.keys(players).find(id => (id !== socket.id))
	
	//********** UPDATER PLAYERLIST **********/
	// save the connected players to setPlayers array in GameContextProvider
	const handleUpdatePlayers = playerlist => {
		console.log("Got new playerlist", playerlist)
		setPlayers(playerlist)
	}

	//********** START GAME **********/

	socket.on('player:joined')

	// connect to game when component is mounted
	useEffect(() => {
	// if no username, redirect them to the login page
		if (!gameUsername) {
			navigate('/')
			return
		}

		// listen for updated playerlist from the server
		socket.on('player:list', handleUpdatePlayers)

	}, [socket, gameUsername, navigate])
	//** FIXA VARNING FROM REACT HOOK **/

  return (
    <div>
        <main>

			<section className='gameAreaWrapper'>
				<div className="gameArea">
					{/* Player always see their own name on this position and opponent on the other side */}
					<p>{players[socket.id]}</p> 

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
							<p>Whos turn? </p>
						</div>
					</div>


					<div className="gameArea">
						{/* Player always see opponent name here */}
						<p>{players[opponent_id]}</p> 

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