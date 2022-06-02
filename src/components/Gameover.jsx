/**
 * Gameover
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useGameContext } from '../contexts/GameContextProvider'

function Gameover() {
  const { thisPlayerName, otherPlayerName, playerNumberOfShips, opponentNumberOfShips } = useGameContext()
  const { winner, setWinner } = useState()

  const navigate = useNavigate()
  const newGame = () => { 
        // go back to start Page
        navigate(`/`)
  }

    console.log('players 1 ships nr.', playerNumberOfShips)
    console.log('player 2 ships nr. ', opponentNumberOfShips)
    console.log('winner', {thisPlayerName} )


    if(opponentNumberOfShips === 0){
      console.log('winner', {thisPlayerName})
      setWinner({thisPlayerName})
    } else if(playerNumberOfShips === 0){
      console.log('winner', {otherPlayerName})
      setWinner({otherPlayerName})
    }
    
  return (
    <div className='popup-backdrop'>
        <div className='popup'>
            <h1>GAME OVER</h1>
            <h2>{winner} WIN</h2>
            <Button onClick={newGame}>NEW GAME</Button>
        </div>
        
    </div>
  )
}

export default Gameover