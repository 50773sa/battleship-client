import { useState, useEffect } from 'react'
import socketio from 'socket.io-client' 
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL);


export default function Cell({ id }) {

    console.log('id:', id);


	const [click, setClick] = useState('false')

    const handleClickOnCell = () => {
		setClick(id)

        socket.emit('cell:clicked', click, id)
        console.log('CLICK ON ID', id, click)   
    }

    useEffect(() => {
        socket.on('click', function (click) {
            setClick(click)
        })
    }, [click])


  return (
    <div className={id.isEmpty ? "isEmpty" 
                    : id.isShip ? "isShip" 
                    : "isAction" } 
          onClick={handleClickOnCell}
    >
      {id.isIcon ? <span></span> : ""}

    </div>
  )
}



