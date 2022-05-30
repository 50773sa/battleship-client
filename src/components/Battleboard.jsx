import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasShip}) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const { player, socket } = useGameContext()	


  	const handleShotFired = async (e) => {
		e.preventDefault()

		if (e.target.className === 'isShip') {
			setHit(true)

		} 	else {
				setMiss(true)
				setHit(false)
		}

		const shotData = {
			player: player,
			shot: currentShot,
		}

		await socket.emit('shot:fired', shotData)
		console.log('CLICK ON ID', id, shotData)   

	}


	// listen if shots are fired
	useEffect(() => {
		// listen to shot fired from server -handleShotFired 
		socket.on('receive:shot', (data) => {
			// console.log('DATA FROM USEEFFECT: ', data)
			setCurrentShot((shot) => [...shot, id])
			return
		})
	},[socket])

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
