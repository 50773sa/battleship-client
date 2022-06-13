import { useGameContext } from '../contexts/GameContextProvider'
import { useEffect, useState } from 'react'


export default function Battleboard() {
	const { ships, ids, socket, opponentNumberOfShips,setOpponentNumberOfShips} = useGameContext()
	const [clickId, setClickId] = useState() 
	const [miss, setMiss] = useState([])
	const [hit, setHit] = useState(false)
	const shipA = ships[0]
	const sunkenShips = []
	console.log('SUNKENSHIPS', sunkenShips)

	let ishit = false

	useEffect(() => {

		// STEG 4. Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', function (data) {

			console.log("Ship A POSITION: ", shipA.position)

			if (shipA.position.includes(data)) {
				console.log("Opponent clicked on SHIP A", shipA.position.includes(data))

				// STEG 5. emit shot:result, hit = true
				ishit = true
				setHit(true)
				socket.emit('shot:result', [ishit = true,  data])
				console.log("OMG yes!", [ishit = true, data])
			} 

			if (shipA.position.length === 0){
				console.log('SHIP SUNK')
				setOpponentNumberOfShips(opponentNumberOfShips -1)
			
			}	
	
			else {
				// STEG 5.1. emit shot:result, hit = false
				ishit = false
				socket.emit('shot:result', [ishit = false, data])
				console.log("You missed!", [ishit = false, data])

			} 

		
		})
	}, [ships, socket])

	useEffect(() => {
		socket.on('delete:shipPos', function (data) {

				// function to remove hitten object
				const removeOneShipPos = (shipArr, pos) => {
					let index = shipArr.toString().indexOf(pos)
					let shipToTheGrave = shipArr.position.splice(index, 1)

					sunkenShips.push(shipToTheGrave)
				
					return
				}
		
		
			console.log('DELETE from OBB', data)
			removeOneShipPos(shipA)
			console.log('CELL SHOT',shipA.position)

		})
	})

	
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