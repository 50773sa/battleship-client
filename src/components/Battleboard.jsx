import { /* useState, */ useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ id, hasship }) {
	const { /* player, */ ships, ids} = useGameContext()


	useEffect(() => {

	/* 	const data = {
			player,
			ships
		} */
		

	}, [])

 	return (
		<div className='cell'>
			 {ids && ids.map((id, index) => {
					const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return ( 
						<div className='defaultCellColor'>
							<div hasShip = {hasShip}
								className={
								hasShip ? 'isShip'
								:  'defaultCellColor'}	 
								key = {index} 
								id = {id}			
							>
							</div>
						</div>
					)
				}
			)}	 		
		</div> 
    )
}