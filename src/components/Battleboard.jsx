import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasShip }) {

	const [currentShot, setCurrentShot] = useState(id)
	const { player, ships, socket } = useGameContext()
	const [playersShips, setPlayersShips] = useState()	
	const ship = ships.map(ships => ships)
	const newShip = [...ship]



	// listen if shots are fired
	useEffect(() => {
		// listen to shot fired from server -handleShotFired 

		//ta emot från socket_controller (e.target.classname) (find?)
		socket.on('receive:hit', (data) => {
			// console.log('DATA FROM USEEFFECT: ', data)
			setCurrentShot((shot) => [...shot, data])
			return
		})
	},[socket])

 	return (
		<div className='defaultCellColor' >
			<div className={
				 hasShip ? 'isShip'
				: 'defaultCellColor'}
			>
			</div>
		</div>
    )
}
