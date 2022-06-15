import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard() {
	const { ships, ids, socket, setMyTurn, playerNumberOfShips, setPlayerNumberOfShips} = useGameContext()
	const [opponentHits, setOpponentHits ] = useState([]) 
	const [opponentMisses, setOpponentMisses ] = useState([])

	const removeOneShipPos = (shipArr, pos) => {
		let arrayItem = shipArr.position.filter(posi => posi.match(pos) === null)
		shipArr.position = arrayItem
		return arrayItem.length
	}

	const handleReceiveShot = useCallback((cellId) => {
		let i
		let ship 
		let hit = false

		for( i = 0; i < ships.length; i++){
			ship = ships[i]
			console.log(ship)
		}
		
		console.log("Ships POSITION: ", ship.position)
		
		setMyTurn(true)
		
			if(ship.position.includes(cellId)) {
			console.log("STEG 5: Opponent clicked on: ",cellId, ship.position.includes(cellId))
		
			hit = true 

			setOpponentHits((opponentHits) => {
				return [cellId, ...opponentHits]
			}) 

			// emit shot:result, hit = true 
			socket.emit('shot:result', cellId, hit) 

			removeOneShipPos(ship, cellId)
			// console.log('Ships-array after hit', ships)
			// console.log('ShipA after hit', shipA.position)
			// console.log('ShipA length after hit', shipA.position.length)

			if (ship.position.length === 0){
				console.log('ShipA SUNK')

				/* setPlayerNumberOfShips(prevvalue => prevvalue -1)  */ // prevState???
				setPlayerNumberOfShips(playerNumberOfShips -1)

				// emitta till servern att hela skeppet skjutits ner
				socket.emit('ship:sunk', ship)
			}

			} else {
				console.log("STEG 5.1: Opponent missed!", cellId, hit)

				setOpponentMisses((opponentMisses) => {
					return [cellId, ...opponentMisses]
				}) 

				// emit shot:result, hit = false
				socket.emit('shot:result', cellId, hit) 
			}
		
	}, [playerNumberOfShips, setMyTurn, setPlayerNumberOfShips, ships, socket])
	
	useEffect(() => {
		// Ta emot cell id från battleboard via servern. 
		socket.on('receive:shot', handleReceiveShot)

		return () => {
			socket.off('receive:shot', handleReceiveShot)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket])

	useEffect(() => {
		console.log("Array of OPPONENT HITS in BB: ", opponentHits)
		console.log("Array of OPPONENT MISSES in BB: ", opponentMisses) 
	}, [opponentMisses, opponentHits])

 	return (
		<div className='cell'>
			{ids && ids.map((id, index) => {
				const isHit = opponentHits.find(pos => pos === id)
				const isMiss = opponentMisses.find(pos => pos === id) 
				const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return ( 
						<div className='defaultCellColor' key={index} id={id} >	
							<div 
								className={classNames({
									'isShip' : hasShip,
									'hit' : isHit,
									'miss' : isMiss, 
									'defaultCellColor' : true
								})}
								key={index} 
								id={id}		
							>								
							</div>
						</div>
					)
				}
			)}	
		</div> 
    )
}