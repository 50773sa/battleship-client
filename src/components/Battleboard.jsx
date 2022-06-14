import { useGameContext } from '../contexts/GameContextProvider'
import { useEffect, useState, useCallback } from 'react'


export default function Battleboard() {
	const { ships, ids, socket, setMyTurn, playerNumberOfShips, setPlayerNumberOfShips} = useGameContext()
	const [clickId, setClickId] = useState('')  
	const [hits, /* setHits */] = useState([]) 
	const [misses, /* setMisses */] = useState([])

	const removeOneShipPos = (shipArr, pos) => {
		let index = shipArr.position.filter(posi => posi.match(pos) === null)
		shipArr.position = index
		return index.length
	}

	const handleReceiveShot = useCallback((cellId) => {
		const shipA = ships[0]
		let hit = false

		console.log("Ship A POSITION: ", shipA.position)

		setMyTurn(true)

		if(shipA.position.includes(cellId)) {
			console.log("STEG 5: Opponent clicked on: ",cellId, shipA.position.includes(cellId))
		
			hit = true 

			// spread av arrayOfHits och pusha in cellID
			/* const removeCell = arrayOfShots.push(cellId)
			setArrayOfShots(removeCell)
			console.log("Array of shot in BB: ", arrayOfShots) */

			// emit shot:result, hit = true 
			socket.emit('shot:result', cellId, hit) 

			removeOneShipPos(shipA, cellId)
			console.log('Ships-array after hit', ships)
			console.log('ShipA after hit', shipA.position)
			console.log('ShipA length after hit', shipA.position.length)

			if (shipA.position.length === 0){
				console.log('ShipA SUNK')

				/* setPlayerNumberOfShips(prevvalue => prevvalue -1)  */ // prevState???
				setPlayerNumberOfShips(playerNumberOfShips -1)

				// emitta till servern att hela skeppet skjutits ner
				socket.emit('ship:sunk', shipA)
			}

			} else {
				console.log("STEG 5.1: Opponent missed!", cellId, hit)

				// spread av arrayOfMisses och pusha in cellID
				/* const removeCell = arrayOfShots.push(cellId)
				setArrayOfShots(removeCell)
				console.log("Array of shot in BB: ", arrayOfShots) */

				// emit shot:result, hit = false
				socket.emit('shot:result', cellId, hit) 
			} 

			setClickId(cellId)

	}, [playerNumberOfShips, setMyTurn, setPlayerNumberOfShips, ships, socket])
	
	useEffect(() => {
		// Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', handleReceiveShot)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])

 	return (
		<div className='cell'>
			{ids && ids.map((id, index) => {
				const hasAction = (clickId === id) 
				const isHit = hits.filter(pos => pos === id)
				const isMiss = misses.filter(pos => pos === id)
				const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return ( 
						<div className='defaultCellColor' key={index} id={id} >	
							<div 
								className={`
								${hasShip ? 'isShip' : ''}
								${hasAction ? 'action' : ''}
								${isHit ? 'hit' : ''}
								${isMiss ? 'miss' : ''}
								`}
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