import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'

export default function Cell({ id }) {
  const [click, setClick] = useState(false)
  const { socket } = useGameContext()
  const [defaultCellColor, setDefaultCellColor] = useState(true)
  const [hit, setHit] = useState(false)

    const handleClickOnCell = (e) => {
    e.preventDefault()
	
    setClick(id)
    setDefaultCellColor(false)
    setHit(true)

    socket.emit('cell:clicked', click, id)
    console.log('CLICK ON ID', id, click)   
    }

    useEffect(() => {
        socket.on('click', function (click) {
            setClick(click)
        })
    }, [click])


 	return (

        <div className="defaultCellColor">
          	<div 
              	className={hit
                ? 'hit' 
                : 'defaultCellColor'} 
                onClick={handleClickOnCell} 
            >
                {defaultCellColor}
          	</div>
        </div>
    )
  }


