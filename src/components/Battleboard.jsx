import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const { player, ships, socket } = useGameContext()
	const ship = [...ships]


	const shipA = ship[0]
	const shipB = ship[1]
	const shipC = ship[2]
	const shipD = ship[3]


	// // function to remove hitten object
	const removeOneShipPos = (shipArr, pos) => {
		let index = shipArr.toString().indexOf(pos)
		shipArr.position.splice(index, 1)
		return
	}

  	const handleShotFired = (e, currentShot) => {
		e.preventDefault()
		console.log('CURRENT SHOT', currentShot)


	
		const shotData = {
			player: player,
			ships: ship,
		}
	}

	// listen if shots are fired
	useEffect(() => {
		// listen to shot fired from server -handleShotFired 

		//ta emot från socket_controller (e.target.classname) (find?)

		socket.on('receive:hit', (data) => {

			console.log('DATA FROM USEEFFECT: ', data)
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