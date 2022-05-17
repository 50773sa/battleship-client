import { Link } from "react-router-dom"


function StartGamePage() {
	return (
		<div className='joinGameWrapper'>
			<div className="joinGameBox">
				<p>Battleship</p>
				<button 
					className='btn startGameBtn'
					as={Link}
					to='/'
					> Join Game
				</button>
			</div>
		</div>
	)
}

export default StartGamePage