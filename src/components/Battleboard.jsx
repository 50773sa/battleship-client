import { useGameContext } from '../contexts/GameContextProvider'
import { useEffect, useState } from 'react'


export default function Battleboard() {
	const { ships, ids, socket, arrayOfShots, setArrayOfShots, setMyTurn, setOpponentNumberOfShips, opponentNumberOfShips} = useGameContext()
	/* const [hit, setHit] = useState(false) */
	const [clickId, setClickId] = useState('') 

	const hit = Boolean

	// function to remove hitten object
	const removeOneShipPos = (shipArr, pos) => {
		let index = shipArr.toString().indexOf(pos)
		shipArr.position.splice(index, 1)
		return
	}
	
	useEffect(() => {
		const shipA = ships[0]

		let hit = false

		// STEG 4. Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', function(cellId) {

			console.log("STEG 4: Ship A POSITION: ", shipA.position)
			setMyTurn(true)

			if(shipA.position.includes(cellId)) {
				console.log("STEG 5: Opponent clicked on SHIP A", shipA.position.includes(cellId))
				console.log("STEG 5.1: Opponent hit on cell:", cellId)
			
				hit = true 

				// STEG 5. emit shot:result, hit = true or false
				socket.emit('shot:result', cellId, hit) 
				console.log(`Result in BB at step 5 after emit shot:result. cellId is ${cellId}, hit is true? ${hit}`)

				
				removeOneShipPos(shipA, cellId)
				console.log('SHIPS AFTER HIT', ships)
				console.log('SHIPA AFTER HIT', shipA.position)
				console.log('SHIP A: LENGTH AFTER HIT', shipA.position.length)

				if (shipA.position.length === 0){
					console.log('ShipA SUNK')
					/* setOpponentNumberOfShips(prevvalue => prevvalue -1)  */ // prevState???
					setOpponentNumberOfShips(opponentNumberOfShips -1)

					// emitta till servern att hela skeppet skjutits ner
					//socket.emit('ship:sunk', 1)
				}

				} else {
					console.log("STEG 5.1: Opponent missed!", cellId)
					console.log("false hit in BB is: ", hit)

					/* hit = false */

					// STEG 5. emit shot:result, hit = true or false
					socket.emit('shot:result', cellId, hit) 
					console.log(`Result in BB at step 5 after emit shot:result. cellId is ${cellId}, hit is false? ${hit}`)
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