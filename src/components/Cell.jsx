import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'
import useGetShips from '../hooks/useGetShips'


export default function Cell({ id, ship }) {
  const [defaultCellColor, setDefaultCellColor] = useState(true)
  const [hit, setHit] = useState(false)
  const [miss, setMiss] = useState(false)
  const [currentShot, setCurrentShot] = useState(id)
  const { socket, ships } = useGameContext()

  //const ships_id = Object.keys(ships).find(id => (id !== id.ships))
  console.log("ID:", id, "Ship:", ship)

  //console.log('SHIPS**************', ships)
  const handleShotFired = async (e) => {
		e.preventDefault()
		console.log('E.TARGET.CLASSNAME: ', e.target.className)

		setDefaultCellColor(false)
		setMiss(true)

		const shotData = {
			shot: currentShot,
		} 

		if (id.id === ships.position) {
			return (
				setHit(true),
				setMiss(false),
				console.log('YES********************')
			)
		}
   
		await socket.emit('shot:fired', shotData)
		// socket.emit('cell:clicked', click, id)
		console.log('CLICK ON ID', id, currentShot)   
	}

	// listen if shots are fired
	useEffect(() => {
		// listen to shot fired from server -handleShotFired 
		socket.on('receive:shot', (data) => {
			// console.log('DATA FROM USEEFFECT: ', data)
			setCurrentShot(id)
		})	
	},[])


 	return (

        <div className="defaultCellColor">
          	<div 
              	className={miss
                ? 'miss' 
                : 'defaultCellColor '} 
                onClick={handleShotFired} 
            >
                {defaultCellColor}
		

				</div>
        </div>
    )
  }


