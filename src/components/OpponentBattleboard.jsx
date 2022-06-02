import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function OpponentBattleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const { player, ships, socket, myTurn, otherPlayerName, setOpponentNumberOfShips } = useGameContext()
	const playerShips = [...ships]

	const shipA = playerShips[0]
	const shipB = playerShips[1]
	const shipC = playerShips[2]
	const shipD = playerShips[3]

	//console.log('LENGTH', playerShips.length)

	// function to remove hitten object
	const removeOneShipPos = (shipArr, pos) => {
		let index = shipArr.toString().indexOf(pos)
		shipArr.position.splice(index, 1)
		return
	}

	const shotData = {
		player: player,
		ships: playerShips,
		shot: currentShot,
		hit: hit,
		miss: miss
	}

  	const handleShotFired = (e) => {
		e.preventDefault()
		console.log('CURRENT SHOT', currentShot)

		// ShipA

		if (e.target.className === 'isShip' && shipA.position.includes(id)){
			setHit(true)
			setMiss(false)
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
		}
		socket.emit('shot:hit', shotData)	
	}

	const handleShotReceive = (id) => {
	}

	useEffect(() => {
		socket.emit('place:ships', shotData, status => {
			console.log("STATUS from callback after placing ships on Opponent Battleboard:", status)

			if (status.success) {
				socket.emit('get-number-of-ships', playerShips, status => {
				console.log(`Successully got number of ships for opponent: ${otherPlayerName}`, status) 

				setOpponentNumberOfShips(status.numberOfShips) 

				console.log("Status on opponent number of ships: ", status.numberOfShips )  

				/* setPlayerNumberOfShips(status.numberOfShips) */
				
				/* console.log("Status on players number of ships: ", status.numberOfShips )  */
				})
			}
		})
	})


 	return (
		<div className='defaultCellColor' >
			{/* {myTurn && ( // only let player click on battleboard if myTurn is true */}
				<div className={
					hit ? 'hit' 
				  : miss ? 'miss'
				  : hasShip ? 'isShip'
				  : 'defaultCellColor'}
				  onClick={handleShotFired} 
			  >
			  </div>
			{/* )} */}
		</div>
    )
}