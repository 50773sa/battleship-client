import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function OpponentBattleboard({ id, hasShip }) {
	const [hit, setHit] = useState(false)
	const [miss, setMiss] = useState(false)
	const [currentShot, setCurrentShot] = useState(id)
	const { player, ships, socket, myTurn } = useGameContext()
	const [playersShips, setPlayersShips] = useState()	
	const ship = ships.map(ships => ships)
	const newShip = [...ship]

	const shipA = ship[0]
	const shipB = ship[1]
	const shipC = ship[2]
	const shipD = ship[3]


	// function to remove hitten object
	const removeOneShipPos = (shipArr, pos) => {
		let index = shipArr.toString().indexOf(pos)
		shipArr.position.splice(index, 1)
		return
	}

	const shotData = {
		player: player,
		ships: ship,
	}
	//console.log('SHOTDATA', shotData)

  	const handleShotFired = (e) => {
		e.preventDefault()
		console.log('CURRENT SHOT', currentShot)


		if (e.target.className === 'isShip'){
			setHit(true)
			console.log('SHIP POSITION', shipA.position)

			if (shipA.position.includes(id)) {
				return (
					removeOneShipPos(shipA),
					socket.emit('shot:hit', shotData),

					console.log('SHIP A', shipA)
				)
			}  

			if (shipB.position.includes(id)) {
				return (
					removeOneShipPos(shipB),
					socket.emit('shot:hit', shotData),

					console.log('SHIP B', shipB)
				)

			} 	
			
			if (shipC.position.includes(id)) {
				return (
					removeOneShipPos(shipC),
					socket.emit('shot:hit', shotData),

					console.log('SHIP C', shipC)
				)

			} 	
			
			if (shipD.position.includes(id)) {
				return (
					removeOneShipPos(shipD),
					socket.emit('shot:hit', shotData),
					
					console.log('SHIP D', shipD)
				)

			} 	
		}

		else {
			setMiss(true)
			setHit(false)
		}
		
		
	}

	// listen if shots are fired
	useEffect(() => {
		setPlayersShips(newShip)
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
			{myTurn && ( // only let player click on battleboard if myTurn is true
				<div className={
					hit ? 'hit' 
				  : miss ? 'miss'
				  : 'defaultCellColor'}
				  onClick={handleShotFired} 
			  >
			  </div>
			)}
		</div>
    )
}