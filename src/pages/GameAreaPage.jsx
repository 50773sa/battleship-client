import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Battleboard from '../components/Battleboard'
import OpponentBattleboard from '../components/OpponentBattleboard' 
import Button from 'react-bootstrap/Button'

const GameAreaPage = () => {
	const { setPlayer, setOpponent, thisPlayer, setThisPlayer, thisPlayerName, setThisPlayerName, otherPlayer, setOtherPlayer, otherPlayerName, setOtherPlayerName, playerNumberOfShips, opponentNumberOfShips, myTurn, players, setPlayers, gameUsername, socket, setGameFull, setPlayerNumberOfShips, setOpponentNumberOfShips } = useGameContext()
	const [gameOn, setGameOn] = useState(true)
	const navigate = useNavigate()
	const { room_id } = useParams()

    /**
	 *  New Game button
	 */
	const newGame = () => { 
		window.location.reload(false);
		// go back to start Page
		navigate("/")
		socket.emit('new:game')

		setPlayerNumberOfShips(4)
		setOpponentNumberOfShips(4)
	}

	/**
	 * Save player object to 'player' and 'opponent' when page is mounted
	 */

	useEffect(() => {
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


	/**
	 *  Update playerList
	 */

	const handleUpdatePlayers = useCallback((players) => {
		setPlayers(players) 
	}, [setPlayers]) 


	/**
	 * Player disconnects
	 */

	const handleDisconnect = () => {
		setGameOn(false)
	
	}

	/**
	 * Listen for 'player:disconnected' event from server
	 */

	socket.on('player:disconnected', handleDisconnect)

	/**
	 * Connect to game when component is mounted 
	 */

	useEffect(() => {
		if (!gameUsername) {
			navigate('/')
			return
		}
		socket.on('player:list', handleUpdatePlayers)

		return () => {
			console.log("Running cleanup")
			socket.off('player:list', handleUpdatePlayers)
			setGameFull(false)
		} 
	}, [socket, navigate, gameUsername, handleUpdatePlayers, room_id, opponentNumberOfShips, playerNumberOfShips, setGameFull])


  	return (
        <main>
			{/* Player disconnected */}
			{!gameOn && (
				<div className="fullBgMsg">	
					<div className='popup-backdrop'>
						<div className='popup'>
							<h1>Opponent disconnected</h1>
							<Button onClick={newGame}>NEW GAME</Button>
						</div>						
					</div>
				</div>
			)}

			{/* Show waiting-page until opponent connects */}
			{players.length === 1 && (
				<div className="fullBgMsg">
					<h2>Hi {gameUsername}</h2>
					<h3>Waiting for another player</h3>
				</div>
			)} 

			{/*  Show game-page when 2 players have connected */}
			{players.length === 2 && (
				<section className='gameAreaWrapper'>
					<div className="gameArea">
						<p>You: {thisPlayerName}</p> 
						<p>Ships left: {playerNumberOfShips}</p> 

						<div className="box">

							<Battleboard />
					
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

							<OpponentBattleboard /> 

						</div> 
					</div>								
				</section>	
			)}
		

			{/*  Game Over - player */}
			{playerNumberOfShips === 0 && (
				<div>
					<div className='popup-backdrop'>
						<div className='popup'>
							<h1>GAME OVER</h1>
							<h2>You Lost 😫</h2>
							<Button onClick={newGame}>NEW GAME</Button>
						</div>						
					</div>
				</div>
			)}
			{/* Game Over - opponent */}
			{opponentNumberOfShips === 0 && (
				<div>
					<div className='popup-backdrop'>
						<div className='popup'>
							<h1>GAME OVER</h1>
							<h2>You Won! 🥳</h2>
							<Button onClick={newGame}>NEW GAME</Button>
						</div>						
					</div>
				</div>
			)}
		</main>
	)
}

export default GameAreaPage