import { useEffect } from 'react'
import { useGameContext } from '../contexts/GameContextProvider'


export default function Battleboard({ hasShip }) {
	const { ships, ids } = useGameContext()

	const BattleboardCell = ({ hasShip }) =>{
		
		return (
			<div className={ hasShip ? "isShip" : "defaultCellColor"} />			 
		  )
	}

	


	useEffect(() => {
	/* 	const data = {
			player,
			ships
		} */
	}, [])

 	return (
		<div className='cell'>
			{ids && 
				ids.map((id, i) => {
					const hasShip = ships?.some(({ position }) => position?.some((posi) => posi === id))
					return <BattleboardCell 
						key = {i} 
						id = {id} 
						hasShip = {hasShip} />
				}
			)}	
		</div> 
    )
}