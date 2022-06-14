import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState, useCallback } from 'react' 

export default function OpponentBattleboard() {
	const { ids, socket, setMyTurn, myTurn, setOpponentNumberOfShips, opponentNumberOfShips } = useGameContext()
	const [clickId,  setClickId] = useState('')  
	const [hits, /* setHits */] = useState([]) 
	const [misses, /* setMisses */] = useState([])

	const handleShotFired = (e) => {
		e.preventDefault()

		const cellId = (e.target.id)
		console.log(`STEP 1: I clicked on ${cellId}`)
		
		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId)
		setClickId(cellId)
		setMyTurn(false)
	}

	const handleShotResultReceived = useCallback((cellId, hit) => {
		console.log(`Received answer from BB: cellId is ${cellId}, hit is ${hit}`)

			if (hit === true) {
				console.log("SCORE! Its was a hit")
				// spread av hits och pusha in cellID
			/* const removeCell = arrayOfShots.push(cellId)
			setArrayOfShots(removeCell)
			console.log("Array of shot in BB: ", arrayOfShots) */
			} else if (hit === false) {
				console.log("Better luck next time")
				// spread av misses och pusha in cellID
			/* const removeCell = arrayOfShots.push(cellId)
			setArrayOfShots(removeCell)
			console.log("Array of shot in BB: ", arrayOfShots) */
			}
	}, [])

	const handleShipSunkReply = useCallback((ship_id) => {
		console.log("Reply in OBB: Ship is DOWN", ship_id)

		/* setOpponentNumberOfShips(prevvalue => prevvalue -1)  */ // prevState???
		setOpponentNumberOfShips(opponentNumberOfShips -1)
	}, [opponentNumberOfShips, setOpponentNumberOfShips])

	// when mounted, listen for final:result event and update this battleboard with hit/miss
 	useEffect(() => {
		// Ta emot från BB & server
		socket.on('shot:result-received', handleShotResultReceived)

		socket.on('ship:sunk-reply', handleShipSunkReply)

	},[socket, handleShotResultReceived, handleShipSunkReply]) 


	return (
		<div className='cell'>
			{ids && ids.map((id, index) => {
			 	const hasAction = (clickId === id) 
				const isHit = hits.filter(pos => pos === id)
				const isMiss = misses.filter(pos => pos === id) 
				return (
					<div className='defaultCellColor' key={index} id={id} >	
						{myTurn && (
							<div className={`
								${hasAction ? 'action' : ''}
								${isHit ? 'hit' : ''}
								${isMiss ? 'miss' : ''}
							`}
								key={index} 
								id={id}
								onClick={handleShotFired}
							/>
						)}
					</div>
				)		
			})}	  
		</div> 
    )
}