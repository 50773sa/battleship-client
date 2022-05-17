import React from 'react'


function GameAreaPage() {
  return (
    <div>
        <header>
            <h1>Battleship</h1>
            <button className='btn leaveGameBtn'>Leave Game</button>
        </header>

        <main>
			<section className='gameAreaWrapper'>
				<div className="gameArea">
					<p>Player 1</p>
					<span>Ships left 4/4</span>
					<div className="box"></div>
				</div>

				<div className="gameArea">
					<p>Player 2</p>
					<span>Ships left 4/4</span>
					<div className="box"></div>
				</div>
			</section>
        </main>
    </div>
  )
}

export default GameAreaPage