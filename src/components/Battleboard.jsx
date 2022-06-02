import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const { player, ships, socket } = useGameContext()
	const playerShips = [...ships]


	// const shipA = playerShips[0]
	// const shipB = playerShips[1]
	// const shipC = playerShips[2]
	// const shipD = playerShips[3]


	// // function to remove hitten object
	// const removeOneplayerShipsPos = (playerShipsArr, pos) => {
	// 	let index = playerShipsArr.toString().indexOf(pos)
	// 	playerShipsArr.position.splice(index, 1)
	// 	return
	// }

  	const handleShotFired = (e, currentShot) => {
		e.preventDefault()
		console.log('CURRENT SHOT', currentShot)


	
		const shotData = {
			player: player,
			ships: playerShips,
		}
	}

	useEffect(() => {
		// listen to shot fired from server -handleShotFired 

		//ta emot från socket_controller (e.target.classname) (find?)

		socket.on('receive:hit', (data) => {

			// console.log('DATA FROM USEEFFECT: ', data)
			// console.log('playerShipsS FROM BATTLEBOARD', playerShips)
			setCurrentShot((shot) => [...shot, data])
			return
		})
	},[socket])

	
	

 	return (
		<div className='defaultCellColor' >
			<div className={
				  hit ? 'hit' 
				: miss ? 'miss'
				: hasShip ? 'isShip'
				: 'defaultCellColor'}
			>
			</div>
		</div>
    )
}