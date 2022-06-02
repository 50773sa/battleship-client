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
		ships: [shipA, shipB, shipC, shipD],
		shot: currentShot,
		hit: hit,
		miss: miss
	}
	console.log('SHOTDATA', shotData)


  	const handleShotFired = (e, data) => {
		e.preventDefault()
		console.log('CURRENT SHOT', currentShot)

		// ShipA

		if (e.target.className === 'isShip' && shipA.position.includes(id)){
			setHit(true)
			setMiss(false)
			console.log('SHIP POSITION', shipA.position)

			return (
				removeOneShipPos(shipA),
				console.log('SHIP A', shipA, data)
			)		
		} 

		else {
			setMiss(true)
			setHit(false)
		}
		socket.emit('shot:hit', shotData)


		// ShipB
		
		if (e.target.className === 'isShip' && shipB.position.includes(id)){
			setHit(true)
			setHit(false)
			console.log('SHIP POSITION', shipB.position)

				return (
					removeOneShipPos(shipB),
					console.log('SHIP A', shipB)
				)		
		} 
		else {
			setMiss(true)
			setHit(false)
		}
		socket.emit('shot:hit', shotData)

		// shipC

		if (e.target.className === 'isShip' && shipC.position.includes(id)){
			setHit(true)
			setHit(false)
			console.log('SHIP POSITION', shipC.position)

				return (
					removeOneShipPos(shipC),
					console.log('SHIP A', shipC)
				)		
		} 
		else {
			setMiss(true)
			setHit(false)
		}
		socket.emit('shot:hit', shotData)


		// shipD
		if (e.target.className === 'isShip' && shipD.position.includes(id)){
			setHit(true)
			setHit(false)
			console.log('SHIP POSITION', shipD.position)

				return (
					removeOneShipPos(shipD),
					console.log('SHIP A', shipD)
				)		
		} 
		else {
			setMiss(true)
			setHit(false)
		}
		socket.emit('shot:hit', shotData)	
	}

	// listen if shots are fired
	useEffect(() => {
		setPlayersShips(newShip)
		// listen to shot fired from server -handleShotFired 

		// ta emot från socket_controller (e.target.classname) (find?)

		socket.on('receive:hit', (data) => {

			// console.log('DATA FROM USEEFFECT: ', data)
			setCurrentShot((shot) => [...shot, data])
			return
		})
	},[socket])
	

	const handleShotReceive = (id) => {



	}


 	return (
		<div className='defaultCellColor' >
			{/* {myTurn && ( // only let player click on battleboard if myTurn is true */}
				<div className={
					hit ? 'hit' 
				  : miss ? 'miss'
				  : hasShip ? 'isShip'
				  : 'defaultCellColor'}
				  onClick={handleShotFired} 
			  >
			  </div>
			{/* )} */}
		</div>
    )
}