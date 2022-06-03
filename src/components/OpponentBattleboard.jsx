/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function OpponentBattleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot/* , setCurrentShot */] = useState(id)
	const { player, ships, socket, /* myTurn, */ otherPlayerName, setOpponentNumberOfShips, ids } = useGameContext()
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

		// skicka player:shot till servern när en spelare klickat på en ruta
		socket.emit('player:shot', shotData)

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

	/* const handleShotReceive = (id) => {
	} */

	const handleFinalResult = () => {
		// Här inne tar vi emot det slutgiltliga svaret
	}

	socket.on('final:result', handleFinalResult)

	useEffect(() => {
		socket.emit('place:ships', shotData, status => {
			console.log("STATUS from callback after placing ships on Opponent Battleboard:", status)

			if (status.success) {
				socket.emit('get-number-of-ships', playerShips, status => {
				console.log(`Successully got number of ships for opponent: ${otherPlayerName}`, status) 

				setOpponentNumberOfShips(status.numberOfShips) 
				console.log("Status on opponent number of ships: ", status.numberOfShips )  
				})
			}
		})
	},[otherPlayerName, playerShips, setOpponentNumberOfShips, shotData, socket])


 	return (
		<div className='cell'>
			{ids && ids.map((id, i) =>
				<div className='defaultCellColor' >
					
					<div className={
						hit ? 'hit' 
						: miss ? 'miss'
						: hasShip ? 'isShip'
						: 'defaultCellColor'}
						onClick={handleShotFired} 
						key = {i}
						id = {id}
					>
					</div>
				</div>
			)}
		</div>
    )
}