import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState } from 'react' 

export default function OpponentBattleboard() {
	const { ids, socket, ships, arrayOfShots, setMyTurn, myTurn, setOpponentNumberOfShips, opponentNumberOfShips } = useGameContext()
	const [clickId, setClickId] = useState('') 
	const hit = Boolean

	const handleShotFired = (e) => {
		e.preventDefault()

		const cellId = (e.target.id)
		console.log(`STEP 1: I clicked on ${cellId}`)
		
		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId)
		setClickId(cellId)	
		setMyTurn(false)
	}

	// when mounted, listen for final:result event and update this battleboard with hit/miss
 	useEffect(() => {
		// Ta emot från BB & server
		socket.on('shot:result-received', function (cellId, hit) {
			console.log(`Received answer from BB: cellId is ${cellId}, hit is ${hit}`)

			if (hit === true) {
				console.log("SCORE! Its was a hit")
			} else {
				console.log("Better luck next time")
			}
		})

		socket.on('ship:sunk-reply', function (ship_id) {
			console.log("Reply in OBB: Ship is DOWN", ship_id)

			/* setOpponentNumberOfShips(prevvalue => prevvalue -1)  */ // prevState???
			setOpponentNumberOfShips(opponentNumberOfShips -1)
		})

	},[socket, ships, opponentNumberOfShips, setOpponentNumberOfShips]) 

	return (
		<div className='cell'>
			{ids && ids.map((id, index) => {
				const hasAction = (clickId === id) 
				return (
					<div className='defaultCellColor' key={index} id={id}>		
						{myTurn && (
							<div className={ 
								hasAction?
								hit ? 'hit'
								: 'miss'
								: 'defaultCellColor'}
								key={index} 
								id={id} 
								onClick={handleShotFired}
								disabled={ arrayOfShots }
							/>
						)}
					</div>
				)		
			})}	  
		</div> 
    )
}

