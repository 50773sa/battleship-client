import Grid from '../components/Grid'


function GameAreaPage( players ) {

  return (
    <div>
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
					<div className="box"><Grid /></div> 

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
					<div className="box"><Grid /></div>


				</div>
			</section>
        </main>
    </div>
  )
}

export default GameAreaPage