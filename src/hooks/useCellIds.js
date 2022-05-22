import { useState, useEffect }from 'react'

export const columns = [1,2,3,4,5,6,7,8,9,10];
export const rows = ["A","B","C","D","E","F","G","H","I","J",];

function useCellIds() {
    const [ids, setIds] = useState([]);
	
	
	const getIds = () => {
		const cellIds = [];
		columns.forEach((colmun) => {
			rows.forEach((row) => cellIds.push({id:colmun + row, isIcon: true, isEmpty: true}));
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
