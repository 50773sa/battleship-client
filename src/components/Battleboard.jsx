import { useGameContext } from '../contexts/GameContextProvider'
import { useEffect, useState } from 'react'


export default function Battleboard() {
	const { ships, ids, socket} = useGameContext()
	const [hit, _setHit] = useState(true)
	const [miss, _setMiss] = useState(false)


	useEffect(() => {
		const shipA = ships[0]

		// STEG 4. Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', function (id) {

			console.log("Ship A POSITION: ", shipA.position)

			if (shipA.position.includes(id)) {
				console.log("Opponent clicked on SHIP A", shipA.position.includes(id))
				// STEG 5. emit shot:result, hit = true
				socket.emit('shot:result', id, hit)

			} else {
				// STEG 5.1. emit shot:result, hit = false
				socket.emit('shot:result', id, miss)
				console.log("You missed!", )

				// emit shot:result, hit = false
			} 
		})
	}, [ships, socket])

	/* const handleReceiveShot = useCallback((data) => {
		const shipA = ships[0]
		console.log("STEP 4: Receiving cell id in Battleboard: ", data)
		console.log("Ship A: ", shipA.position.includes(data))
		console.log("Ship A POSITION: ", shipA.position)

		if(shipA.position.includes(data)) {
			console.log("You clicked on SHIP A", shipA.position.includes(data))
		} else {
			console.log("You missed!", data)
		} 
	}, [])

	// STEG 4. Ta emot cell id från battleboard via servern. 
	socket.on('receive:shot', handleReceiveShot) */
	
 	return (
		<div className='cell'>
			 {ids && ids.map((id, index) => {
					const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return ( 
						<div className='defaultCellColor' key={index} id={id}>
							<div 
								className={
								hasShip ? 'isShip'
								:  'defaultCellColor'}	 
								key = {index} 
								id = {id}			
							>
							</div>
						</div>
					)
				}
			)}	 		
		</div> 
    )
}