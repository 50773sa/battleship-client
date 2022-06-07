import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard() {
	const { ships, ids, socket} = useGameContext()

	const shipA = ships[0]

	const handleReceiveShot = (data) => {
		console.log("STEP 4: Receiving cell id in Battleboard: ", data)
		console.log("Ship A: ", shipA.position.includes(data))
		console.log("Ship A POSITION: ", shipA.position)

		if(data === shipA.position.includes(data)) {
			console.log("You clicked on SHIP A", shipA.position.includes(data))
		} else {
			console.log("You missed!", data)
		} 
	}

	// STEG 4. Ta emot cell id från battleboard via servern. 
	socket.on('receive:shot', handleReceiveShot)
	
 	return (
		<div className='cell'>
			 {ids && ids.map((id, index) => {
					const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return ( 
						<div className='defaultCellColor'>
							<div hasShip = {hasShip}
								className={
								hasShip ? 'isShip'
								:  'defaultCellColor'}	 
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