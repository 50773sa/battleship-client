import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const { player, ships, setShips, socket } = useGameContext()
	const [playersShips, setPlayersShips] = useState()	


	const ship = ships.map(ships => ships.block)
	const newShip = [...ship]

	// remove -1 from block if hit = true
	const ifHit = (ship, hit) => {
		const i = ship.indexOf(hit)
		ship.splice(i, 1)
		return
	}
	// console.log('HIT', ships.indexOf(hit) )


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
			ships: playersShips,
		}

		await socket.emit('shot:fired', shotData)
		console.log('CLICK ON ID', id, shotData)   

	}
	console.log('PLAYERS SHIPS', playersShips)


	// listen if shots are fired
	useEffect(() => {
		setPlayersShips(newShip)
		// listen to shot fired from server -handleShotFired 

		//ta emot från socket_controller (e.target.classname) (find?)

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
