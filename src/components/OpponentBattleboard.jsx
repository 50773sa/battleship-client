import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState } from 'react' 

export default function OpponentBattleboard() {
	const { ids, socket, ships, arrayOfShots, setMyTurn, myTurn } = useGameContext()
	/* const [hit, setHit] = useState(false) */
	const [clickId, setClickId] = useState('') 
	/* const shipA = ships[0] */

	const hit = Boolean

	// function to remove hitten object
	/* const removeOneShipPos = (shipArr, pos) => {
		let index = shipArr.toString().indexOf(pos)
		shipArr.position.splice(index, 1)
		return
	} */

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
		// STEG 8. Ta emot från BB & server
		socket.on('shot:result-received', function (cellId, hit) {
			console.log(`Received answer from BB: cellId is ${cellId}, hit is ${hit}`)

			if (hit === true) {
				
				console.log("SCORE! Its was a hit")
				/* return(
					removeOneShipPos(shipA), 
					console.log('SHIPS AFTER HIT', ships),
					console.log('SHIPA AFTER HIT', shipA.position),
					console.log('SHIP A: LENGTH AFTER HIT', shipA.position.length)
				) */
			} else {
				console.log("Better luck next time")
			}
		})

		/* if (shipA.position.length === 0){
			console.log('SHIP A SUNK')
			setOpponentNumberOfShips(opponentNumberOfShips -1)
		} */

	},[socket, ships]) 

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