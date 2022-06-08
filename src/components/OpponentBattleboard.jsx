import { useGameContext } from '../contexts/GameContextProvider' 


export default function OpponentBattleboard() {
	const { ids, socket, otherPlayer } = useGameContext()


	const OpponentBattleboardCell = ({ id }) => {		
		return(
			<div className='defaultCellColor' 
				onClick={() => {
					console.log(`Clicked ${id}`)
			}} 
			/>	
		)
	}	

	const handleShotFired = (e) => {
		e.preventDefault()

		const cellId = e.target.id
		console.log(`STEP 1: I clicked on ${cellId}. Opponent is `, otherPlayer)

		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId, otherPlayer)		
	}

	// when mounted, listen for final:result event and update this battleboard with hit/miss

	/* const data = {
		player,
		ships
	}  */


	return (
		<div className='cell'>
			{ids && ids.map((id, index) => 				
					<OpponentBattleboardCell 
						key={index} 
						id={id} 
						//hasShip={hasShip} 
					/>				
			)}	  
		</div> 
    )
}