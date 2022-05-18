import { Link } from 'react-router-dom'
import { useState } from 'react'
import Grid from '../components/Grid'


function GameAreaPage(players) {
	const [row, setRow] = useState([
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10"
	])

	const [col, setCol] = useState([
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
	])

	const [ref, setRef] = useState([
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
	])


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
			<div>
				<h2>Players</h2>
				<ul id="online-players">
					{Object.values(players).map((player, index) =>
						<li key={index}>{player}</li>
					)}
				</ul>
			</div>

			<section className='gameAreaWrapper'>
				<div className="gameArea">
					<p>Player 1</p>

					<span>Ships left 4/4</span>
					<div className="box"><Grid rows = {row} columns = {col} refs = {ref} /></div> 

				</div>

				<div className="shipsLeftWrap">
					<div className="shipsLeftPlayer1">
						<h3>≪ Player 1</h3>
						<p>Ships left: 4 / 4</p>
					</div>

					<div className="shipsLeftPlayer2">
						<h3>Player 2 ≫</h3>
						<p>Ships left: 4 / 4</p>
					</div>

					<div className="whosTurn">
						<p>Your/Opponents turn</p>
					</div>
				</div>


				<div className="gameArea">
					<p>Player 2</p>

					<span>Ships left 4/4</span>
					<div className="box"><Grid rows = {row} columns = {col} refs = {ref} /></div> 

				</div>
			</section>
        </main>
    </div>
  )
}

export default GameAreaPage