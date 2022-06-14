import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState, useCallback } from 'react' 
import classNames from 'classnames'

export default function OpponentBattleboard() {

	const { ids, socket, setMyTurn, myTurn, setOpponentNumberOfShips, opponentNumberOfShips } = useGameContext() 
	const [hits, setHits ] = useState([]) 
	const [misses, setMisses ] = useState([])


	const handleShotFired = (e) => {
		e.preventDefault()

		// if not my turn, be angry
		if (!myTurn) {
			return
		}

		const cellId = (e.target.id)
		console.log(`STEP 1: I clicked on ${cellId}`)
		
		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId)
		setMyTurn(false)
	}

	const handleShipSunkReply = useCallback((ship_id) => {
		console.log("Reply in OBB: Ship is DOWN", ship_id)

		/* setOpponentNumberOfShips(prevvalue => prevvalue -1)  */ // prevState???
		setOpponentNumberOfShips(opponentNumberOfShips -1)
	}, [opponentNumberOfShips, setOpponentNumberOfShips])

	// when mounted, listen for final:result event and update this battleboard with hit/miss
 	useEffect(() => {

		const handleShotResultReceived = (cellId, hit) => {

			console.log(`Received answer from BB: cellId is ${cellId}, hit is ${hit}`)

			if (hit === true) {
				console.log("SCORE! Its was a hit")
			 	setHits((hits) => {
					return [cellId, ...hits]
					})  
					
			} else if (hit === false) {
				console.log("Better luck next time")
				setMisses((misses) => {
					console.log("Look at me running")
					return [cellId, ...misses]
				}) 
			}
		}

		socket.on('shot:result-received', handleShotResultReceived)

		socket.on('ship:sunk-reply', handleShipSunkReply)

		return () => {
			socket.off('shot:result-received', handleShotResultReceived)

			socket.off('ship:sunk-reply', handleShipSunkReply)
		}

	},[socket, hits, misses, handleShipSunkReply]) 

	useEffect(() => {
		console.log("Array of my HITS in OBB: ", hits)
		console.log("Array of my MISSES in OBB: ", misses) 
	}, [hits, misses])


	return (
		<div className={classNames({
			'cell': true,
			'not-my-turn': !myTurn,
		})}>
			{ids && ids.map((id, index) => {
				const isHit = hits.find(pos => pos === id)
				const isMiss = misses.find(pos => pos === id)  
				return (
					<div className='defaultCellColor' key={index} id={id} >	
						<div 
							className={classNames({
								'hit' : isHit,
								'miss' : isMiss, 
								'defaultCellColor' : true
							})}
							key={index} 
							id={id}
							onClick={handleShotFired}
						/>
					</div>
				)		
			})}	  
		</div> 
    )
}

