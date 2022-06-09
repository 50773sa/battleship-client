import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState } from 'react'


export default function OpponentBattleboard() {
	const { ids, socket } = useGameContext()
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)

	const OpponentBattleboardCell = () => {			
		return(
			<div className= {
						hit ? 'hit' 
					: miss ? 'miss'
					: 'defaultCellColor'}			
				onClick = { handleShotFired } 
			/>	
		)
	}	

	const handleShotFired = (e) => {
		e.preventDefault()

		//console.log('e.target.id', e.target.id) //e.target.id är undefined
		const cellId = e.target.id
		console.log(`STEP 1: I clicked on ${cellId}`)

		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId)		
	}

	// when mounted, listen for final:result event and update this battleboard with hit/miss

	useEffect(() => {
		socket.on('final:result', function (data) {

			console.log('ANSWER', data)

			if (data === true) {
				setHit(true)
			} 
			
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
    

	return (
		<div className='cell'>

			{ids && ids.map((id, index) => {		
					return(<OpponentBattleboardCell 
						key={index} 
						id={id}
						//hasShip={hasShip} 
					/>)
				}			
			)}	  
		</div> 
    )
}