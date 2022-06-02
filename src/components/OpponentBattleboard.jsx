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
		// ships: playerShips,
		shot: currentShot,
		// hit: hit,
		// miss: miss,
	}

  	const handleShotFired = (e, id) => {
		e.preventDefault()
		console.log('CURRENT SHOT', currentShot)

		// skicka player:shot till servern när en spelare klickat på en ruta
		socket.emit('player:shot', shotData, e.target.className)
	}



	const handleShotReceive = (id) => {
	}

	const handleFinalResult = () => {
		// Här inne tar vi emot det slutgiltliga svaret

	}

	socket.on('final:result', handleFinalResult)

	useEffect(() => {
		socket.emit('place:ships', shotData, status => {
			// console.log("STATUS from callback after placing ships on Opponent Battleboard:", status)

			if (status.success) {
				socket.emit('get-number-of-ships', playerShips, status => {
				// console.log(`Successully got number of ships for opponent: ${otherPlayerName}`, status) 

				setOpponentNumberOfShips(status.numberOfShips) 
				// console.log("Status on opponent number of ships: ", status.numberOfShips )  
				})
			}
		})
	},[])


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