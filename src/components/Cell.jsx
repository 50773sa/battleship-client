import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'
import useCellIds from '../hooks/useCellIds'

export default function Cell({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState('')
	const { socket } = useGameContext()
	

  	const handleShotFired = async (e) => {
		e.preventDefault()

		if (e.target.className === 'isShip') {
			setHit(true)

		} 	else {
				setMiss(true)
				setHit(false)
		}

		const shotData = {
			shot: currentShot,
		}

		await socket.emit('shot:fired', shotData)
		console.log('CLICK ON ID', id, currentShot)   
	}


	// listen if shots are fired
	useEffect(() => {
		// listen to shot fired from server -handleShotFired 
		socket.on('receive:shot', (data) => {
			// console.log('DATA FROM USEEFFECT: ', data)
			setCurrentShot((shot) => [...shot, data])
		})
	},[])

 	return (
		<div className='defaultCellColor'>
			<div className={
				  hit ? 'hit' 
				: miss ? 'miss'
				: hasShip ? 'isShip'
				: 'defaultCellColor'}
				onClick={handleShotFired} 
			>
			</div>
		</div>

		
		
		

		
	
    )
}
