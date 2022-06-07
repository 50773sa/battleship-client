import { useEffect } from 'react' 
import { useGameContext } from '../contexts/GameContextProvider' 


export default function OpponentBattleboard() {
	const { ids, socket } = useGameContext()

	const handleShotFired = (e) => {
		e.preventDefault()
		const cellId = e.target.id
		console.log("STEP 1: I clicked on: ", cellId)

		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId)		
	}

	/* const data = {
		player,
		ships
	}  */


	useEffect(() => {

	}, [])

	return (
		<div className='cell'>
			{ids && ids.map((id, i) => {
				return (
					<div className='defaultCellColor'>
						<div className={
							'defaultCellColor'}
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