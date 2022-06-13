import { useGameContext } from '../contexts/GameContextProvider'
import { useEffect, useState } from 'react'


export default function Battleboard() {

	const { ships, ids, socket, arrayOfShots, setArrayOfShots, setMyTurn, playerNumberOfShips, setPlayerNumberOfShips} = useGameContext()
	const [clickId, setClickId] = useState('') 

	const hit = Boolean

	// function to remove hitten object
	//*** PROBLEM: Tar bort den sista cellen i arrayn och inte exakt den som man klickat på ****/
	const removeOneShipPos = (shipArr, pos) => {
		let index = shipArr.toString().indexOf(pos)
		shipArr.position.splice(index, 1)
		return
	}
	
	useEffect(() => {
		const shipA = ships[0]
		let hit = false

		// Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', function(cellId) {
			console.log("Ship A POSITION: ", shipA.position)

			setMyTurn(true)

			if(shipA.position.includes(cellId)) {
				console.log("STEG 5: Opponent clicked on: ",cellId, shipA.position.includes(cellId))
			
				hit = true 

				// emit shot:result, hit = true 
				socket.emit('shot:result', cellId, hit) 

				removeOneShipPos(shipA, cellId)
				console.log('Ships-array after hit', ships)
				console.log('ShipA after hit', shipA.position)
				console.log('ShipA length after hit', shipA.position.length)

				if (shipA.position.length === 0){
					console.log('ShipA SUNK')

					/* setPlayerNumberOfShips(prevvalue => prevvalue -1)  */ // prevState???
					setPlayerNumberOfShips(playerNumberOfShips -1)

					// emitta till servern att hela skeppet skjutits ner
					socket.emit('ship:sunk', shipA)
				}

				} else {
					console.log("STEG 5.1: Opponent missed!", cellId, hit)

					// emit shot:result, hit = false
					socket.emit('shot:result', cellId, hit) 
				} 

				// check if ID already is in the Array of shots
				if(arrayOfShots.includes(cellId)) {
					return 
				} else {
					// else -> push cellId of the shot into the array of shots
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
 battleboards
		</div> 
    )
}