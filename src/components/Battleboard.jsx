import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const { player, ships, socket, thisPlayerName, setPlayerNumberOfShips } = useGameContext()
	const playerShips = [...ships]


	const shipA = playerShips[0]
	const shipB = playerShips[1]
	const shipC = playerShips[2]
	const shipD = playerShips[3]


	// function to remove hitten object
	const removeOneShipPos = (playerShipsArr, pos) => {
		let index = playerShipsArr.toString().indexOf(pos)
		playerShipsArr.position.splice(index, 1)
		return
	}


	const handleReceiveShot = (e) => {
		// här inne kollar vi om det var en träff eller miss. Om det var en träff kollar vi om hela skeppet träffats eller bara en del, samt kallar på funktionen som ska uppdatera skeppens längd och visa rätt på spelplanen. 

		const shotData = {
			player: player,
			// ships: playerShips,
			shot: currentShot,
			// hit: hit,
			// miss: miss,
		}
		console.log('SHOTDATA FROM BATTLEBOARD', shotData)

		// ShipA

		if (e.target.className === 'isShip' && shipA.position.includes(id)){
			// setHit(true) //battleboard?
			// setMiss(false) //battleboard?
			console.log('SHIP POSITION', shipA.position)

			return (
				removeOneShipPos(shipA),
				console.log('SHIP A', shipA)
			)		
		} 

		else {
			setMiss(true)
			setHit(false)
		}
		socket.emit('shot:hit', shotData)


		// ShipB
		
		if (e.target.className === 'isShip' && shipB.position.includes(id)){
			setHit(true)
			setHit(false)
			console.log('SHIP POSITION', shipB.position)

				return (
					removeOneShipPos(shipB),
					console.log('SHIP A', shipB)
				)		
		} 
		else {
			setMiss(true)
			setHit(false)
		}
		socket.emit('shot:hit', shotData)

		// shipC

		if (e.target.className === 'isShip' && shipC.position.includes(id)){
			setHit(true)
			setHit(false)
			console.log('SHIP POSITION', shipC.position)

				return (
					removeOneShipPos(shipC),
					console.log('SHIP A', shipC)
				)		
		} 
		else {
			setMiss(true)
			setHit(false)
		}
		socket.emit('shot:hit', shotData)


		// shipD
		if (e.target.className === 'isShip' && shipD.position.includes(id)){
			setHit(true)
			setHit(false)
			console.log('SHIP POSITION', shipD.position)

				return (
					removeOneShipPos(shipD),
					console.log('SHIP A', shipD)
				)		
		} 
		else {
			setMiss(true)
			setHit(false)
			socket.emit('shot:miss', currentShot)
		}
		socket.emit('shot:hit', currentShot)	
	}

		socket.emit('shot:result', /* data */)

		useEffect(() => {
			socket.on('receive:shot', handleReceiveShot)

		},[])



	//********** UPDATE SHIPS **********/
 	/* const handleUpdateShips = (playerNumberOfShips, opponentNumberOfShips) => {
		console.log('Got new amount of ships for player: ',playerNumberOfShips, 'opponent: ', opponentNumberOfShips) 
		setOpponentNumberOfShips(opponentNumberOfShips)
	}  */

	/* socket.on('player:ships', handleUpdateShips)   */

	// useEffect(() => {
	// 	socket.emit('place:ships', shotData, status => {
	// 		console.log("STATUS from callback after placing ships on Player Battleboard:", status)

	// 		if (status.success) {
	// 			socket.emit('get-number-of-ships', playerShips, status => {
	// 			console.log(`Successully got number of ships for player: ${thisPlayerName}`, status) 

	// 			setPlayerNumberOfShips(status.numberOfShips) 
	// 			console.log("Status on player number of ships: ", status.numberOfShips )  
	// 			})
	// 		}
	// 	})
	// },[])



	
	

 	return (
		<div className='defaultCellColor' >
			<div className={
					hit ? 'hit' 
					: miss ? 'miss'
					:hasShip ? 'isShip'
					: 'defaultCellColor'} 
			>
			</div>
		</div>
    )
}