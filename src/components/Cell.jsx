import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'
import socketio from 'socket.io-client' 
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL);


export default function Cell({ id, room }) { //!Chat.js
  const [click, setClick] = useState(false)
  const [defaultCellColor, setDefaultCellColor] = useState(true)
  const [hit, setHit] = useState(false)
  const [currentShot, setCurrentShot] = useState('')
  const { username, socket } = useGameContext()


  	const handleShotFired = async (e) => {
		e.preventDefault()
		
		setClick(id)
		setDefaultCellColor(false)
		setHit(true)

      	const shotData = {
			room: room,
			player: username,
			shot: currentShot,
		}

		await socket.emit('shot:fired', shotData)
		socket.emit('cell:clicked', click, id)
		console.log('CLICK ON ID', id, click)   
	}


	// listen if shots are fired
	useEffect(() => {
		// listen to shot fired from server -handleShotFired 
		socket.on('receive:shot', (data) => {
			console.log('DATA FROM USEEFFECT: ', data)
			setCurrentShot((shot) => [...shot, data])
		})
	})


 	return (

        <div className="defaultCellColor">
          	<div 
              	className={hit
                ? 'hit' 
                : 'defaultCellColor'} 
                onClick={handleShotFired} 
            >
                {defaultCellColor}
          	</div>
        </div>
    )
  }


