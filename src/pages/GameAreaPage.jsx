import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cell from '../components/Cell'



function GameAreaPage(players) {
	const [ids, setIds] = useState([]);
	const columns = ["1","2","3","4","5","6","7","8","9","10"];
	const rows = ["A","B","C","D","E","F","G","H","I","J",];
	const getIds = () => {
		const cellIds = [];
		columns.map((colmun) => {
			rows.map((row) => cellIds.push({id:colmun + row, isIcon: true, isDefault: true}));
		});
		setIds(cellIds);
	};
	useEffect(() => {
		getIds();
	},[])

	
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
					<div className="box">
						<div className='cell'>
							{ids && ids.map((id, i) => 
							<Cell key = {i} id = {id} />
						)}
						</div>
						
					</div> 

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
					<div className="box">
						<div className='cell'>
								{ids && ids.map((id, i) => 
								<Cell key = {i} id = {id} />
							)}
						</div>
					</div> 

				</div>
			</section>
        </main>
    </div>
  )
}

export default GameAreaPage