import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Battleboard from '../components/Battleboard'
import OpponentBattleboard from '../components/OpponentBattleboard'
import useCellIds from '../hooks/useCellIds'
import useGetShips from '../hooks/useGetShips'
import Gameover from '../components/Gameover'


const GameAreaPage = () => {
	const { setPlayer, setOpponent, thisPlayer, setThisPlayer, thisPlayerName, setThisPlayerName, otherPlayer, setOtherPlayer, otherPlayerName, setOtherPlayerName, ships, ids, myTurn, players, setPlayers, gameUsername, socket} = useGameContext()
	const [playerNumberOfShips, setPlayerNumberOfShips] = useState()
	const [opponentNumberOfShips, setOpponentNumberOfShips] = useState()
	const navigate = useNavigate()
	const [shipPosition, setShipPosition] = useState(useGetShips())
	const { room_id } = useParams()
	const [showGameOver, setShowGameOver] = useState(false)  // game over 


	//** Save player object to 'player' and 'opponent' when page is mounted */
	useEffect(() => {
		// this code only runs when there are 2 players in the game
		if (players.length === 2) {
			const thisPlayer = players.find(player => player.id === socket.id)
			setThisPlayer(thisPlayer)
		
			const thisPlayerName = Object.values(thisPlayer)[1]
			setThisPlayerName(thisPlayerName)
		
			const otherPlayer = players.find(player => player.id !== socket.id)
			setOtherPlayer(otherPlayer)
		
			const otherPlayerName = Object.values(otherPlayer)[1]
			setOtherPlayerName(otherPlayerName)
		}
		setPlayer(thisPlayer) 
	 	setOpponent(otherPlayer) 
		
	}, [thisPlayer, otherPlayer, players, setOpponent, setOtherPlayer, setOtherPlayerName, setPlayer, setThisPlayer, setThisPlayerName, socket.id])  

	console.log('GAMEAREAPAGE', ships)


	//***** UPDATE PLAYERLIST *****/
	// status from callback is 'room.players'
	const handleUpdatePlayers = useCallback((players) => {
		setPlayers(players) 
	}, [setPlayers]) 


	//********** UPDATE SHIPS **********/
 	const handleUpdateShips = (playerNumberOfShips, opponentNumberOfShips) => {
		/* console.log('Got new amount of ships for player: ',playerNumberOfShips, 'opponent: ', opponentNumberOfShips) */
		setPlayerNumberOfShips(playerNumberOfShips)
		setOpponentNumberOfShips(opponentNumberOfShips)
	} 
	
	//********** START GAME **********/
	 const handleStartGame = () => {
		// send 'get-number-of-ships' event to the server. 
		socket.emit('get-number-of-ships', ships, status => {
			/* console.log(`Successully got number of ships for player: ${thisPlayerName} and opponent: ${otherPlayerName}`, status)  */

			setPlayerNumberOfShips(status.numberOfShips) 
			setOpponentNumberOfShips(status.numberOfShips)

			/* console.log("Status on players number of ships: ", status.numberOfShips ) 
			console.log("Status on opponent number of ships: ", status.numberOfShips )  */
		})

		// listen for updated amount of ships from the server
		socket.on('player:ships', handleUpdateShips) 
	} 


	//***** Listen for 'start:game' event from server *****/
  	socket.on('start:game', handleStartGame)  

	//**** Connect to game when component is mounted ****/
	useEffect(() => {
		// if no username, redirect them to the login page
			if (!gameUsername) {
				navigate('/')
				return
			}
		
			// listen for updated playerlist from the server
			socket.on('player:list', handleUpdatePlayers)

			return () => {
				 console.log("Running cleanup")
	
				// stop listening to events
				socket.off('player:list', handleUpdatePlayers)
				socket.off('player:ships', handleUpdateShips)
				//socket.off('start:game', handleStartGame)
	
				socket.emit('player:left', gameUsername, room_id) 
			} 
		}, [socket, navigate, gameUsername, handleUpdatePlayers, room_id])
	


	// check if Gameover
	if( playerNumberOfShips === 0 || opponentNumberOfShips === 0){
		setShowGameOver(true)
	}
	console.log('check nr. of ships', playerNumberOfShips, ':', opponentNumberOfShips )
	console.log('gameover?', showGameOver)
	
  	return (
        <main>
			{players.length === 1 && (
				<div className="waitingForPlayer">
					<h2>Hi {gameUsername}</h2>
					<h3>Waiting for another player</h3>
				</div>
			)} 
		
			{players.length === 2 && (
				<section className='gameAreaWrapper'>
					<div className="gameArea">
						<p>You: {thisPlayerName}</p> 
						<p>Ships left: {playerNumberOfShips}</p>

						<div className="box">
							<div className='cell'>
								{ids && 
									ids.map((id, i) => {
										const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
										return <Battleboard key = {i} id = {id} hasShip = {hasShip} />
									}
								)}
							</div>	
						</div> 
					</div>	

					<div className="toggleTurns">
						{myTurn && <h3> It's your turn </h3>}
						{!myTurn && <h3> Opponents turn </h3>}
					</div>
			
					<div className="gameArea">
						<p>Opponent: {otherPlayerName}</p>  
						<p>Ships left: {opponentNumberOfShips}</p>


						<div className="box">
							<div className='cell'>
								{ids && 
									ids.map((id, i) =>  <OpponentBattleboard key = {i} id = {id} />
								)}


							</div>
						</div> 
					</div>											
				</section>	
			)}

			{showGameOver && (
				<div>
				<Gameover />
				</div>
			)}
		</main>
	)
}

export default GameAreaPage