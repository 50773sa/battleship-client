import { useState, useEffect }from 'react'
import { useGameContext } from '../contexts/GameContextProvider'

export const columns = [1,2,3,4,5,6,7,8,9,10];
export const rows = ["A","B","C","D","E","F","G","H","I","J",];

function useCellIds() {
    const [ids, setIds] = useState([]);
	const { ships } = useGameContext()
	console.log('IDS', ids)
	

	const getIds = () => {
		const cellIds = [];
		columns.forEach((column) => {
			rows.forEach((row) => cellIds.push({id: column + row}));
		});
		setIds(cellIds);
	};
	useEffect(() => {
		getIds();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
    
  return ids
}

export default useCellIds
