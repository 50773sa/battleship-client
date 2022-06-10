import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState } from 'react'


export default function OpponentBattleboard() {
	const { ids, socket } = useGameContext()
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [clickId, setClickId] = useState('')

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

		// setId(e.target.id)
		const cellId = e.target.id
		console.log('STEP 1: I clicked on', cellId)

		// STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		socket.emit('player:shot', cellId)	
		setClickId(cellId)
		
		
	}
console.log('click,', clickId)
		// // STEG 1. Skicka id på den ruta som spelaren klickat på till servern. 
		// socket.emit('player:shot', id)
		
	// when mounted, listen for final:result event and update this battleboard with hit/miss

	useEffect(() => {
		// STEG 8. Ta emot från BB & server

		socket.on('final:result', function (data) {
			console.log('Received answer from BB', data)

			if (data === true) {
				setHit(true)

			} else (
				setMiss(true)
			)
		})
	},[socket])


	
	return (
		<div className='cell'>

			{ids && ids.map((id, index) => {
				const hasAction = (clickId === id) 
				return (
					<div className='defaultCellColor' key={index} id={id}>		

						<div className={ 
							hasAction?
							 	 hit ? 'hit'
								: 'miss'
							: 'defaultCellColor'}
							key={index} 
							id={id} 
							onClick={handleShotFired}
						/>
					</div>
				)		

			})}	  

		</div> 
        
	)}