import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState } from 'react'


export default function OpponentBattleboard() {
	const { ids, socket } = useGameContext()
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [id, setId] = useState()

	/* const OpponentBattleboardCell = () => {			
		return(
			<div className= {
						hit ? 'hit' 
					: miss ? 'miss'
					: 'defaultCellColor'}			
				onClick = { handleShotFired } 
			/>	
		)
	}	 */

	const handleShotFired = (e) => {
		e.preventDefault()


		setId(e.target.id)
		// console.log('STEP 1: I clicked on', id)


		// // STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		// socket.emit('player:shot', id)
	}
	
	// when mounted, listen for final:result event and update this battleboard with hit/miss

	useEffect(() => { 
		console.log('STEP 1: I clicked on', id)
		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', id)

		socket.on('final:result', function (data) {
			console.log('ANSWER',  data)

			if (data === true) {
				setHit(true)
			} 

		},[socket])
	 })


	
	return (
		<div className='cell'>
			{ids && ids.map((id, index) => 	
				<div /* className='defaultCellColor' */ key={index} id={id}>			
					<div className={
						hit ? 'hit'
						: miss ? 'miss'
						: 'defaultCellColor'}
						key={index} 
						id={id} 
						onClick={handleShotFired} 
					/>
				</div>				
			)}	

			{/* {ids && ids.map((id, index) => {		
					return(<OpponentBattleboardCell 
						key={index} 
						id={id}
						//hasShip={hasShip} 
					/>)
				}			

			)}	   */}
		</div> 
    )
    

}