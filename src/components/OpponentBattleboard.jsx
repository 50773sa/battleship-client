import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState } from 'react'


export default function OpponentBattleboard() {
	const { ids, socket, ships, opponentNumberOfShips, setOpponentNumberOfShips } = useGameContext()
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)

	const shipA = ships[0]

	// function to remove hitten object
	const removeOneShipPos = (shipArr, pos) => {
		let index = shipArr.toString().indexOf(pos)
		shipArr.position.splice(index, 1)
		return
	}

	const handleShotFired = (e) => {
		e.preventDefault()

		// setId(e.target.id)
		const cellId = e.target.id
		console.log('STEP 1: I clicked on', cellId)

		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId)	
	}

	// when mounted, listen for final:result event and update this battleboard with hit/miss
	useEffect(() => {
		// STEG 8. Ta emot från BB & server
		socket.on('final:result', function (data) {
			console.log('Received answer from BB',  data)

			if (data === true) {
				setHit(true)
				return(
					removeOneShipPos(shipA), 
					console.log('SHIP AFTER SHOT', ships),
					console.log('SHIPA', shipA.position),
					console.log('SHIP A: LENGTH', shipA.position.length)
				)

			} 
			
			if (shipA.position.length === 0){
				console.log('SHIP SUNK')
				setOpponentNumberOfShips(opponentNumberOfShips -1)
			
			}	
		})
	},[socket, shipA, ships])

	
	return (
		<div className='cell'>
			{ids && ids.map((id, index) => 	{
				return <div className='defaultCellColor' key={index} id={id}>		

					<div className={
						hit ? 'hit'
						: miss ? 'miss'
						: 'defaultCellColor'}
						key={index} 
						id={id} 
						onClick={handleShotFired}
					/>
				</div>				
			})}	  
		</div> 
    )
    

}