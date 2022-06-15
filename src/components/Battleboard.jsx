import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard() {
	const { ships, ids, socket, setMyTurn, setPlayerNumberOfShips} = useGameContext()
	const [opponentHits, setOpponentHits ] = useState([]) 
	const [opponentMisses, setOpponentMisses ] = useState([])

	/**
	 *  Ships
	 */

	const shipA = ships[0]
	const shipB = ships[1]
	const shipC = ships[2]
	const shipD = ships[3]


	/**
	 *  Remove one ship-cell if hit === true
	 */

	const removeOneShipPos = (shipArr, pos) => {
		let arrayItem = shipArr.position.filter(posi => posi.match(pos) === null)
		shipArr.position = arrayItem
		return arrayItem.length
	}

	/**
	 *  Handle if received shot was hit or not
	 */

	const handleReceiveShot = useCallback((cellId) => {

		let hit = false

		setMyTurn(true)

		// shipA
		if(shipA.position.includes(cellId)) {
			
			hit = true 
	
			setOpponentHits((opponentHits) => {
				return [cellId, ...opponentHits]
			}) 

			// emit to server
			socket.emit('shot:result', cellId, hit) 

			removeOneShipPos(shipA, cellId)
		
				if (shipA.position.length === 0){
	
					setPlayerNumberOfShips(prevvalue => prevvalue -1)   
	
					// emit to server if ship has sunk
					socket.emit('ship:sunk', shipA)
				}	

		} else if (shipB.position.includes(cellId)) {
				
			hit = true 
		
			setOpponentHits((opponentHits) => {
				return [cellId, ...opponentHits]
			}) 
		
			// emit to server
			socket.emit('shot:result', cellId, hit) 
		
			removeOneShipPos(shipB, cellId)
		
				if (shipB.position.length === 0){
		
					setPlayerNumberOfShips(prevvalue => prevvalue -1) 
		
					// emit to server if ship has sunk
					socket.emit('ship:sunk', shipB)
				}
	
		} else if (shipC.position.includes(cellId)) {
				
			hit = true 
		
			setOpponentHits((opponentHits) => {
				return [cellId, ...opponentHits]
			}) 
		
			// emit to server
			socket.emit('shot:result', cellId, hit) 
		
			removeOneShipPos(shipC, cellId)
		
				if (shipC.position.length === 0){
		
					setPlayerNumberOfShips(prevvalue => prevvalue -1)  

					// emit to server
					socket.emit('ship:sunk', shipC)
				}

		} else if (shipD.position.includes(cellId)) {
					
			hit = true 
		
			setOpponentHits((opponentHits) => {
				return [cellId, ...opponentHits]
			}) 
		
			// emit to server
			socket.emit('shot:result', cellId, hit) 
		
			removeOneShipPos(shipD, cellId)
		
				if (shipD.position.length === 0){
		
					setPlayerNumberOfShips(prevvalue => prevvalue -1) 
		
					// emit to server if ship has sunk
					socket.emit('ship:sunk', shipD)
				}

		} else {

			setOpponentMisses((opponentMisses) => {
				return [cellId, ...opponentMisses]
			}) 

			// emit to server
			socket.emit('shot:result', cellId, hit) 
		} 
	
	}, [setMyTurn, setPlayerNumberOfShips, shipA, shipB, shipC, shipD, socket])
	
	useEffect(() => {
		// listen for cellId from OBB via server
		socket.on('receive:shot', handleReceiveShot)

		return () => {
			socket.off('receive:shot', handleReceiveShot)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])

	useEffect(() => {
		console.log("Array of OPPONENT HITS in BB: ", opponentHits)
		console.log("Array of OPPONENT MISSES in BB: ", opponentMisses) 
	}, [opponentMisses, opponentHits])
	

 	return (
		<div className='cell'>
			{ids && ids.map((id, index) => {
				const isHit = opponentHits.find(pos => pos === id)
				const isMiss = opponentMisses.find(pos => pos === id) 
				const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return ( 
						<div className='defaultCellColor' key={index} id={id} >	
							<div 
								className={classNames({
									'isShip' : hasShip,
									'hit' : isHit,
									'miss' : isMiss, 
									'defaultCellColor' : true
								})}
								key={index} 
								id={id}		
							>								
							</div>
						</div>
					)
				}
			)}	
		</div> 
    )
}