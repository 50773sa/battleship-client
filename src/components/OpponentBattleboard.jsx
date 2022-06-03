import { /* useState,  */useEffect } from 'react' 
import { useGameContext } from '../contexts/GameContextProvider' 


export default function OpponentBattleboard({ id, hasShip }) {
	const { /* socket,  */ids/* , opponent, ships  */} = useGameContext()

	useEffect(() => {

	}, [])

	return (
		<div className='cell'>
			  {ids && ids.map((id, i) => {
					return (
						<div className='defaultCellColor'>
							<div hasShip = {hasShip}
								 className={
								'defaultCellColor'}
								/* onClick={handleShotFired} */
								key = {i} 
								id = {id}								
							>
							</div>
						</div>
					)}
			)}	  
		</div> 
    )
}