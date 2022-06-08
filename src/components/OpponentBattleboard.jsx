import { useEffect, useState } from 'react'
import { useGameContext } from '../contexts/GameContextProvider' 


export default function OpponentBattleboard() {
	const { ids, socket } = useGameContext()
	const [hit, setHit] = useState(false)


	const handleShotFired = (e) => {
		e.preventDefault()

		const cellId = e.target.id
		console.log(`STEP 1: I clicked on ${cellId}.`)

		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId)		
	}

	
	// when mounted, listen for final:result event and update this battleboard with hit/miss
	useEffect(() => {
		socket.on('final:result', function (cellId) {
			console.log('Received result fron battleboard', cellId)
		})
	}, [])

	/* const data = {
		player,
		ships
	}  */

	return (
		<div className='cell'>
			{ids && ids.map((id, i) => {
				return (
					<div className='defaultCellColor'>
						<div className={hit 
							? 'hit'
							: 'miss'}
							onClick={handleShotFired} 
							key = {i} 
							id = {id}								
						>
						</div>
					</div>
				)}
			)}	  
		</div> 
    )
}