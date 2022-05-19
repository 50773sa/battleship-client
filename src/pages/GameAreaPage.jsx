import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cell from '../components/Cell'


export const columns = ["1","2","3","4","5","6","7","8","9","10"];
export const rows = ["A","B","C","D","E","F","G","H","I","J",];

function GameAreaPage() {

	const [ids, setIds] = useState([]);
	
	const getIds = () => {
		const cellIds = [];
		columns.forEach((colmun) => {
			rows.forEach((row) => cellIds.push({id:colmun + row, isIcon: true, isDefault: true}));
		});
		setIds(cellIds);
	};
	useEffect(() => {
		getIds();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	
  return (
    <div>
        <main>

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