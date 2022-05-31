import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Battleboard from '../components/Battleboard'
import OpponentBattleboard from '../components/OpponentBattleboard'
import useCellIds from '../hooks/useCellIds'
import useGetShips from '../hooks/useGetShips'
import Gameover from '../components/Gameover'


const GameAreaPage = () => {

	//show popup "GAME OVER"
	const [showModal, setShowModal] = useState(false)  
	const [shipPosition, setShipPosition] = useState(useGetShips())
	const { player, setPlayer, opponent, setOpponent, ships, setShips} = useGameContext()

	//**** GRIDS ****/
	// ships position
	const ids = useCellIds()

	useEffect(() => {	
		setShips(shipPosition)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	console.log('SHIP POSITION', shipPosition)
	//**** PLAYERS ****/
	const { myTurn, setMyTurn, players, setPlayers, gameUsername, socket } = useGameContext()
	const navigate = useNavigate()

	const [gameOn, setGameOn] = useState(false)
	const [playerNumberOfShips, setPlayerNumberOfShips] = useState()
	const [opponentNumberOfShips, setOpponentNumberOfShips] = useState()

 	// tracks the players id with obejct.keys since players is an object and not an array 
	const thisSocket = Object.keys(players).find(id => (id === socket.id))
	const playerUsername = players[thisSocket]
		console.log('PLAYER', player)

	const opponentSocket = Object.keys(players).find(id => (id != socket.id))
	const opponentUsername = players[opponentSocket]
		console.log('OPPONENET', opponent)

	useEffect(() => {
		setPlayer(thisSocket)
		setOpponent(opponentSocket)
	}, [])
 
	console.log('GAMEAREAPAGE', ships)

	//********** UPDATER PLAYERLIST **********/
	// save the connected players to setPlayers array in GameContextProvider 
	const handleUpdatePlayers = playerlist => {
		console.log('Got new playerlist: ',playerlist)
		setPlayers(playerlist)
	}

	//********** UPDATE SHIPS **********/
	
	const handleUpdateShips = (playerNumberOfShips, opponentNumberOfShips) => {
		console.log('Got new amount of ships for player: ',playerNumberOfShips, 'opponent: ', opponentNumberOfShips)
		setPlayerNumberOfShips(playerNumberOfShips)
		setOpponentNumberOfShips(opponentNumberOfShips)
	}

	//********** START GAME **********/
	const handleStartGame = () => {
		console.log('2 player joined game. Requesting ships from server. Number of ships: ', Object.keys(ships).length)

		// send 'get-number-of-ships' event to the server. 
		socket.emit('get-number-of-ships', ships, status => {
			console.log(`Successully got number of ships for player: ${playerUsername} and opponent: ${opponentUsername}`, status) 

			setPlayerNumberOfShips(status.numberOfShips) 

			setOpponentNumberOfShips(status.numberOfShips)

			console.log("Status on players number of ships: ", status.numberOfShips ) 
			console.log("Status on opponent number of ships: ", status.numberOfShips ) 
		})

		// listen for updated amount of ships from the server
		socket.on('player:ships', handleUpdateShips)
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

  	return (
        <main>
			<section className='gameAreaWrapper'>
				<div className="gameArea">
					{/* Player always see their own name on this position and opponent on the other side */}
					<p>{playerUsername}</p> 
					<p>Ships left: {playerNumberOfShips}</p>

					<div className="box">
						<div className='cell'>
							{ids && 
								ids.map((id, i) => {
									const hasShip = shipPosition?.some(({ position }) => position?.some((posi) => posi === id))
									return <Battleboard key = {i} id = {id} hasShip = {hasShip} />
								}
							)}
						</div>	
					</div> 
				</div>	

				<div className="gameArea">
					{/* Player always see opponent name here */}
					<p>{opponentUsername}</p> 
					<p>Ships left: {opponentNumberOfShips}</p>

					<div className="box">
						<div className='cell'>
							{/* {ids && 
								ids.map((id, i) => {
									const hasShip = shipPosition?.some(({ position }) => position?.some((posi) => posi === id))
									return <OpponentBattleboard key = {i} id = {id}  />
								}
							)} */}
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