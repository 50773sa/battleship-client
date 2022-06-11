import { useGameContext } from '../contexts/GameContextProvider'
import { useEffect, useState } from 'react'


export default function Battleboard() {
	const { ships, ids, socket, arrayOfShots, setArrayOfShots, setMyTurn} = useGameContext()
	const [hit, setHit] = useState(false)
	const [clickId, setClickId] = useState('') 

	
	useEffect(() => {
		const shipA = ships[0]

		// STEG 4. Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', function(cellId) {
			console.log("STEG 4: Ship A POSITION: ", shipA.position)
			setMyTurn(true)

			if(shipA.position.includes(cellId)) {
				console.log("STEG 5: Opponent clicked on SHIP A", shipA.position.includes(cellId))

				console.log("STEG 5.1: Opponent hit!", cellId)
				setHit(true)
				} else {
					console.log("STEG 5.1: Opponent missed!", cellId)
					setHit(false)
				} 

				// check if id already is in the Array of shots
				if(arrayOfShots.includes(cellId)) {
					return 
				} else {
					// else -> push id of all shots into the array of shots
					const removeCell = arrayOfShots.push(cellId)
					setArrayOfShots(removeCell)
					console.log("Array of shots in BB: ", arrayOfShots)
				}

				setClickId(cellId)
		})


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ships, socket])

	// STEG 5. emit shot:result, hit = true
	socket.emit('shot:result', hit) 

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