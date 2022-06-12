import { useGameContext } from '../contexts/GameContextProvider'
import { useEffect, useState } from 'react'


export default function Battleboard() {
	const { ships, ids, socket, arrayOfShots, setArrayOfShots, setMyTurn} = useGameContext()
	/* const [hit, setHit] = useState(false) */
	const [clickId, setClickId] = useState('') 

	const hit = Boolean

	
	useEffect(() => {
		const shipA = ships[0]

		// STEG 4. Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', function(cellId, hit) {
			console.log("STEG 4: Ship A POSITION: ", shipA.position)
			setMyTurn(true)

			if(shipA.position.includes(cellId)) {
				console.log("STEG 5: Opponent clicked on SHIP A", shipA.position.includes(cellId))
				console.log("STEG 5.1: Opponent hit on cell:", cellId)
			
				hit = true 

				} else {
					console.log("STEG 5.1: Opponent missed!", cellId)
					console.log("false hit in BB is: ", hit)
				} 

				// check if ID already is in the Array of shots
				if(arrayOfShots.includes(cellId)) {
					return 
				} else {
					// else -> push id of all shots into the array of shots
					const removeCell = arrayOfShots.push(cellId)
					setArrayOfShots(removeCell)
					console.log("Array of shots in BB: ", arrayOfShots)
				}

				setClickId(cellId)

				// STEG 5. emit shot:result, hit = true or false
				socket.emit('shot:result', cellId, hit) 
				console.log(`Result in BB at step 5 after emit shot:result. cellId is ${cellId}, hit is ${hit}`)
				
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ships, socket])

 	return (
		<div className='cell'>
			{ids && ids.map((id, index) => {
				const hasAction = (clickId === id) 
				const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return ( 
						<div className='defaultCellColor' key={index} id={id}>
							<div 
								className={
								hasShip ? 'isShip'
								: hasAction?
							 	hit ? 'hit'
								: 'miss'
								: 'defaultCellColor'}	 
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