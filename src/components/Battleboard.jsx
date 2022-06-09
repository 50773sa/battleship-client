import { useGameContext } from '../contexts/GameContextProvider'
import { useEffect, useState } from 'react'


export default function Battleboard() {
	const { ships, ids, socket} = useGameContext()
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)

	const BattleboardCell = ({ hasShip }) =>{		
		return (
			<div className={ hasShip ? "isShip" : "defaultCellColor"} />			 
		  )
	}

	useEffect(() => {
		const shipA = ships[0]

		// STEG 4. Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', function (cellId) {


			console.log("Ship A POSITION: ", shipA.position)

			if(shipA.position.includes(cellId)) {
				console.log("You clicked on SHIP A", shipA.position.includes(cellId))

				//  STEG 5. emit shot:result, hit = true
				socket.emit('shot:result', setHit(true))
			} else {
				console.log("You missed!", cellId)

				// STEG 5.1. emit shot:result, hit = false
				socket.emit('shot:result', setMiss(true))
			} 
		})
	}, [ships, socket, setHit])


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
			{ids && 
				ids.map((id, i) => {
					const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return <BattleboardCell 
						key = {i} 
						id = {id} 
						hasShip = {hasShip} />
				}
			)}	

		</div> 
    )
}