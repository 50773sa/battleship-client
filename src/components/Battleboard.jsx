import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const { player, ships, socket, thisPlayerName, setPlayerNumberOfShips } = useGameContext()
	const playerShips = [...ships]


	// const shipA = playerShips[0]
	// const shipB = playerShips[1]
	// const shipC = playerShips[2]
	// const shipD = playerShips[3]


	// // function to remove hitten object
	// const removeOneplayerShipsPos = (playerShipsArr, pos) => {
	// 	let index = playerShipsArr.toString().indexOf(pos)
	// 	playerShipsArr.position.splice(index, 1)
	// 	return
	// }

	const shotData = {
		player: player,
		ships: playerShips,
	}

	
  	const handleShotFired = (e, currentShot) => {
		e.preventDefault()
		console.log('CURRENT SHOT', currentShot)
	}

	//********** UPDATE SHIPS **********/
 	/* const handleUpdateShips = (playerNumberOfShips, opponentNumberOfShips) => {
		console.log('Got new amount of ships for player: ',playerNumberOfShips, 'opponent: ', opponentNumberOfShips) 
		setOpponentNumberOfShips(opponentNumberOfShips)
	}  */

	/* socket.on('player:ships', handleUpdateShips)   */

	useEffect(() => {
		socket.emit('place:ships', shotData, status => {
			console.log("STATUS from callback after placing ships on Player Battleboard:", status)

			if (status.success) {
				socket.emit('get-number-of-ships', playerShips, status => {
				console.log(`Successully got number of ships for player: ${thisPlayerName}`, status) 

				setPlayerNumberOfShips(status.numberOfShips) 
				console.log("Status on player number of ships: ", status.numberOfShips )  
				})
			}
		})
	},[])

	/* useEffect(() => {
		// listen to shot fired from server -handleShotFired 

		//ta emot från socket_controller (e.target.classname) (find?)

		socket.on('receive:hit', (data) => {

			// console.log('DATA FROM USEEFFECT: ', data)
			// console.log('playerShipsS FROM BATTLEBOARD', playerShips)
			setCurrentShot((shot) => [...shot, data])
			return
		})
	},[socket]) */

	
	

 	return (
		<div className='defaultCellColor' >
			<div className={
				  hit ? 'hit' 
				: miss ? 'miss'
				: hasShip ? 'isShip'
				: 'defaultCellColor'}
			>
			</div>
		</div>
    )
}