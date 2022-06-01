import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function OpponentBattleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const [opponentsShips, setOpponentsShips] = useState()	
	const { myTurn, opponent, ships, socket } = useGameContext()
	
	const ship = ships.map(ships => ships.block)
	const newShip = [...ship]

	// console.log('OPPONENTS SHIPS', opponentsShips)

  	const handleShotFired = async (e) => {
		e.preventDefault()

		if (e.target.className === 'isShip') {
			setHit(true)

		} 	else {
			setMiss(true)
			setHit(false)
		}

		const shotData = {
			player: opponent,
			shot: currentShot,
			ships: ships
		}
		console.log(ships)

		// skicka e.target.classname
		
		await socket.emit('shot:fired', shotData)

	}


	// listen if shots are fired
		useEffect(() => {
			setOpponentsShips(newShip)
			// listen to shot fired from server -handleShotFired 
			socket.on('receive:shot', (data) => {
				// console.log('DATA FROM USEEFFECT: ', data)
				setCurrentShot((shot) => [...shot, data])
			})
		},[socket])

		return (
			<div className='defaultCellColor'>

				{/* Only let me click on battleboard if its my turn */}
				{myTurn && 
					<div className={
						hit ? 'hit' 
						: miss ? 'miss'
						: hasShip ? 'isShip'
						: 'defaultCellColor'}
						onClick={handleShotFired} 
					>
					</div>
				}
			</div>	
		)
	
}