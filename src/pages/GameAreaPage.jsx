import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Cell from '../components/Cell'
import useCellIds from '../hooks/useCellIds'
import useGetShips from '../hooks/useGetShips'
import Gameover from '../components/Gameover'


// const columns = ["A","B","C","D","E","F","G","H","I","J",]
// const rows = [1,2,3,4,5,6,7,8,9,10]

const GameAreaPage = () => {
	//show popup "GAME OVER"
	const [showModal, setShowModal] = useState(true)  

	//**** GRIDS ****/
	// ships position
	const [ships, setShips] = useState ([])
	const shipPosition = useGetShips()
	const ids = useCellIds()

	useEffect(() => {		
		setShips(shipPosition)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	//**** PLAYERS ****/
	const { myTurn, setMyTurn, players, setPlayers, gameUsername, socket } = useGameContext()
	const navigate = useNavigate()
	const [opponent, setOpponent] = useState()
	const [gameOn, setGameOn] = useState(false)

	// tracks the opponents id with obejct.keys since players is an object and not an array 
	const opponent_id = Object.keys(players).find(id => (id !== socket.id))

	//********** UPDATER PLAYERLIST **********/
	// save the connected players to setPlayers array in GameContextProvider 
	const handleUpdatePlayers = playerlist => {
		console.log('Got new playerlist: ',playerlist)
		setPlayers(playerlist)
	}

	//********** START GAME **********/
	const handleStartGame = () => {
 
	}

	// lyssna efter start:game event från servern
	socket.on('start:game', handleStartGame)
	
	
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
        <main>
			<section className='gameAreaWrapper'>
				<div className="gameArea">
					{/* Player always see their own name on this position and opponent on the other side */}
					<p>{players[socket.id]}</p> 
					<p>Ships left: 4 / 4</p>

					<div className="box">
						<div className='cell'>
							{ids && 
								ids.map((id, i) => {
									const hasShip = shipPosition?.some(({ position }) => position?.some((posi) => posi === id))
									return <Cell key = {i} id = {id} hasShip = {hasShip} />
								}
							)}
						</div>	
					</div> 
				</div>	

				<div className="gameArea">
					{/* Player always see opponent name here */}
					<p>{players[opponent_id]}</p> 
					<p>Ships left: 4 / 4</p>

					<div className="box">
						<div className='cell'>
							{ids && 
								ids.map((id, i) => {
									const hasShip = shipPosition?.some(({ position }) => position?.some((posi) => posi === id))
									return <Cell key = {i} id = {id} hasShip = {hasShip} />
								}
							)}
							</div>
						</div> 
					</div>	
					{showModal && (
						<div>
						<Gameover />
						</div>
					)}									
			</section>			
		</main>
	)
}

export default GameAreaPage