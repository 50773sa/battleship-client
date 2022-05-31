import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Battleboard from '../components/Battleboard'
import OpponentBattleboard from '../components/OpponentBattleboard'
import useCellIds from '../hooks/useCellIds'
import useGetShips from '../hooks/useGetShips'
import Gameover from '../components/Gameover'


const GameAreaPage = () => {
	const { player, setPlayer, opponent, setOpponent, ships, setShips, myTurn, setMyTurn, players, setPlayers, gameUsername, socket} = useGameContext()
	const [playerNumberOfShips, setPlayerNumberOfShips] = useState()
	const [opponentNumberOfShips, setOpponentNumberOfShips] = useState()
	const { room_id } = useParams()
	const navigate = useNavigate()
	const [showModal, setShowModal] = useState(false)  // game over 
	const shipPosition = useGetShips()
	const ids = useCellIds()

	const [gameOn, setGameOn] = useState(false)



	//** Tracks the players id with obejct.keys since 'players' is an object and not an array **/
/* 	const thisSocket = Object.keys(players).find(id => (id === socket.id))
	const playerUsername = players[thisSocket]
	console.log('PLAYER', playerUsername)

	const opponentSocket = Object.keys(players).find(id => (id != socket.id))		
	const opponentUsername = players[opponentSocket]	
	console.log('OPPONENET', opponentUsername) */
	
	//** Save players socket id to 'player' and 'opponent' when page is mounted */
/* 	useEffect(() => {
		setPlayer(thisSocket) 
		setOpponent(opponentSocket)
	}, []) */

	//********** UPDATE PLAYERLIST **********/
	// save the connected players to players object in GameContextProvider 
	const handleUpdatePlayers = useCallback((players) => {
		// status from callback is 'room.players'
		setPlayers(players)
		
 	/* 	const thisSocket = players.find(id => (id === socket.id)) 
		setPlayer(thisSocket)
		console.log('this socket: ', thisSocket)  */

	/* 	const otherSocket = players.find(id => (id !== socket.id))	
		setOpponent(otherSocket) 	
		console.log('opponent socket: ', otherSocket)  */

		/*const opponentUsername = players[otherSocket]
		setOpponentName(opponentUsername)
		console.log('opponent player: ', opponentUsername)  

		 console.log('Got new playerlist: ',playerlist)
		console.log("players object", players)
		 console.log("PLAYER USERNAME: ", players.player.gameUsername)  */

	},[players])

	/* console.log('Player username is: ', playerName)
	console.log('Opponent username is: ', opponentName) */

	//********** UPDATE SHIPS **********/
/* 	const handleUpdateShips = (playerNumberOfShips, opponentNumberOfShips) => {
		console.log('Got new amount of ships for player: ',playerNumberOfShips, 'opponent: ', opponentNumberOfShips)
		setPlayerNumberOfShips(playerNumberOfShips)
		setOpponentNumberOfShips(opponentNumberOfShips)
	} */

	//********** START GAME **********/
	/* const handleStartGame = (playerUsername, opponentUsername) => {
		console.log(`Player ${playerUsername} joined game. Requesting ships from server. Number of ships: ${Object.keys(ships).length}`)

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
	} */

	//** Listen for 'start:game' event from server **/
/* 	socket.on('start:game', handleStartGame) */

	//** Place the ships when page is mounted **/
		/* useEffect(() => {		
			setShips(shipPosition)
		// eslint-disable-next-line react-hooks/exhaustive-deps
		},[]) */
	
	//**** Connect to game when component is mounted ****/
	useEffect(() => {
	// if no username, redirect them to the login page
		if (!gameUsername) {
			navigate('/')
			return
		}

		// listen for updated playerlist from the server
		socket.on('player:list', handleUpdatePlayers)

		console.log('Players are: ', players)
		console.log("Player on index 0 is: ", players[0])
		

		return () => {
			console.log("Running cleanup")

			// stop listening to events
			socket.off('player:list', handleUpdatePlayers)
			//socket.off('player:ships', handleUpdateShips)
			//socket.off('start:game', handleStartGame)

			socket.emit('player:left', gameUsername, room_id)
		} 
	}, [socket, gameUsername, navigate/* , room_id */])

  	return (
        <main>
			<section className='gameAreaWrapper'>
				<div className="gameArea">
					{/* Player always see their own name on this position and opponent on the other side */}
					<p>{player.username}</p> 
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
				
				{Object.keys(players).length === 1 && (
					<div>
						<h3>Waiting for another player</h3>
					</div>
				)}

				{Object.keys(players).length === 2 && (
					<div className="toggleTurns">
						{myTurn && <h3> It's your turn </h3>}
						{!myTurn && <h3> Opponents turn </h3>}
					</div>
				)}
				
				<div className="gameArea">
					{/* Player always see opponent name here */}
					<p>{opponent.username}</p>  
					<p>Ships left: {opponentNumberOfShips}</p>

					<div className="box">
						<div className='cell'>
							{ids && 
								ids.map((id, i) => {
									const hasShip = shipPosition?.some(({ position }) => position?.some((posi) => posi === id))
									return <OpponentBattleboard key = {i} id = {id}  />
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