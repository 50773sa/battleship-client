import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'
import Cell from '../components/Cell'
import useCellIds from '../hooks/useCellIds';
import useGetShips from '../hooks/useGetShips';
import StartGamePage from './StartGamePage';

function GameAreaPage({ room, username }) {
	const [player, setPlayer] = useState('') 
	const [opponent, setOpponent] = useState('')
	const { socket } = useGameContext()
	const ids = useCellIds()
	const {ships} = useGetShips()

	// // Spara till senare när vi har id p spelarna

 	// const randomPlayerStarts = () => {
	// 	const random = Math.floor(Math.random() * 20 /10)
	// 	console.log('RANDOMPLAYER', random)
	// }	
	// randomPlayerStarts(players)	 

	

  return (
    <div>
        <main>
			<section className='gameAreaWrapper'>
				<div className="gameArea">
					<p>You: {username}</p>

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
							<h3>Opponent ≫</h3>
							<p>Ships left: 4 / 4</p>
						</div>

						<div className="whosTurn">
							<p>Your/Opponents turn</p>
						</div>
					</div>


					<div className="gameArea">
						<p>Opponent: </p>

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