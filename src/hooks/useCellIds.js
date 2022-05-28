import { useState, useEffect }from 'react'
import useGetShips from './useGetShips'

export const columns = ["A","B","C","D","E","F","G","H","I","J",]
export const rows = [1,2,3,4,5,6,7,8,9,10]

function useCellIds() {
    const [ids, setIds] = useState([])
	const [ships, setShips] = useState ([])
	const shipPosition = useGetShips()
	
	const getIds = () => {
		const cellIds = []
		columns.forEach((col) => {
			rows.forEach((row) => cellIds.push( row + col))
		});
		setIds(cellIds)
		console.log('CELL ID', cellIds)
	};
	useEffect(() => {
		getIds()
		setShips(shipPosition)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
    
  return ids
  
}

export default useCellIds
