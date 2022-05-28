import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'

export default function Cell({ id, hasShip }) {
	const [defaultCellColor, setDefaultCellColor] = useState(true)
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState('')
	const { socket } = useGameContext()


  	const handleShotFired = async (e) => {
		e.preventDefault()
		
		setDefaultCellColor(false)
		setMiss(true)

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

		<div className="defaultCellColor">
			<div className={hit 
				? 'hit' 
				:  hasShip 
				? 'isShip'
				: 'defaultCellColor'} 
				onClick={handleShotFired} 
				>
				{defaultCellColor}
			</div>
 		 </div>
    )
}


