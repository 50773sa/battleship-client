/**
 * Gameover
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function Gameover() {
    const navigate = useNavigate()
    const newGame = () => { 
        // go back to start Page
        navigate(`/`)
    }

  return (
    <div className='popup-backdrop'>
        <div className='popup'>
            <h1>GAME OVER</h1>
            <h2>XXX WIN</h2>
            <Button onClick={newGame}>NEW GAME</Button>
        </div>
        
    </div>
  )
}

export default Gameover