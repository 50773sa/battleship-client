import { useGameContext } from '../contexts/GameContextProvider' 

export default function OpponentBattleboard({ id, hasShip }) {

	const { ids } = useGameContext()


	const OpponentBattleboardCell = ({ id }) => {		
			return(
				<div className='defaultCellColor' 
					onClick={() => {
						console.log(`Clicked ${id}`)
				}} 
				/>	
			)
	}

	return (
		<div className='cell'>
			{ids && ids.map((id, index) => 				
					<OpponentBattleboardCell 
						key={index} 
						id={id} 
						//hasShip={hasShip} 
					/>				
			)}	  
		</div> 
    )
}