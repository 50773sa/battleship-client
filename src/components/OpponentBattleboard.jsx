import { useGameContext } from '../contexts/GameContextProvider' 
import { useEffect, useState, useCallback } from 'react' 
import classNames from 'classnames'

export default function OpponentBattleboard() {
	const { ids, socket, setMyTurn, myTurn, setOpponentNumberOfShips } = useGameContext() 
	const [hits, setHits ] = useState([]) 
	const [misses, setMisses ] = useState([])


	/**
	 * Handle shot fired
	 */

	const handleShotFired = (e) => {
		e.preventDefault()

		// if not my turn, be angry
		if (!myTurn) {
			return
		}

		const cellId = (e.target.id)
		
		// emit to server
		socket.emit('player:shot', cellId)
		setMyTurn(false)
	}


	/**
	 * Handle ship sunk (reply)
	 */

	const handleShipSunkReply = useCallback((ship_id) => {
		console.log("Reply in OBB: Ship is DOWN", ship_id)

		setOpponentNumberOfShips(prevvalue => prevvalue -1)  
	}, [setOpponentNumberOfShips])

	
	/**
	 *  When mounted - Handle shot result (received)
	 */

 	useEffect(() => {
		const handleShotResultReceived = (cellId, hit) => {

			if (hit === true) {
			 	setHits((hits) => {
					return [cellId, ...hits]
				})  
					
			} else if (hit === false) {
				setMisses((misses) => {
					return [cellId, ...misses]
				}) 
			}
		}

		socket.on('shot:result-received', handleShotResultReceived)

		socket.on('ship:sunk-reply', handleShipSunkReply)

		return () => {
			socket.off('shot:result-received', handleShotResultReceived)

			socket.off('ship:sunk-reply', handleShipSunkReply)
		}

	},[socket, hits, misses, handleShipSunkReply]) 
	

	return (
		<div className={classNames({
			'cell': true,
			'not-my-turn': !myTurn,
		})}>
			{ids && ids.map((id, index) => {
				const isHit = hits.find(pos => pos === id)
				const isMiss = misses.find(pos => pos === id)  
				return (
					<div className='defaultCellColor' key={index} id={id} >	
						<div 
							className={classNames({
								'hit' : isHit,
								'miss' : isMiss, 
								'defaultCellColor' : true
							})}
							key={index} 
							id={id}
							onClick={handleShotFired}
						/>
					</div>
				)		
			})}	  
		</div> 
    )
}