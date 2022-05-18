import { Link } from 'react-router-dom'
import Grid from '../components/Grid'


function GameAreaPage() {

  return (
    <div>
        <header>
            <h1>Battleship</h1>
			<Link to="/">
				<button 
					className='btn leaveGameBtn'
					> Leave Game
				</button>
			</Link>
        </header>

        <main>
			<section className='gameAreaWrapper'>
				<div className="gameArea">
					<p>Player 1</p>
					<span>Ships left 4/4</span>
					<div className="box"><Grid /></div> 
				</div>

				<div className="gameArea">
					<p>Player 2</p>
					<span>Ships left 4/4</span>
					<div className="box"><Grid /></div>
				</div>
			</section>
        </main>
    </div>
  )
}

export default GameAreaPage