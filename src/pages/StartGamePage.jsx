
import { Link } from 'react-router-dom'

function StartGamePage() {



  return (
    <div className='joinGameWrapper'>
        <div className="joinGameBox">
            <p>Battleship</p>
            <Link to="/waitingroom">
				<button 
					className='btn startGameBtn'
					> Join Game
				</button>
			</Link>
        </div>
    </div>
  )
}

export default StartGamePage