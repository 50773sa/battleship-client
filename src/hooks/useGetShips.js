import { useEffect, useState } from 'react'
import { columns, rows, }  from './useCellIds';
import { useGameContext } from '../contexts/GameContextProvider'
import useCellIds from './useCellIds';


function useGetShips() {
  const { ships } = useGameContext()

  console.log('SHIPS',ships)
  useCellIds()

      // Random function
      const getRandomIndex = (array, blocks) => {
        const randomId = Math.floor(Math.random() * (array.length - blocks));
        return array[randomId];
      }
  
      const setPosition = () => {
        ships.forEach((ship) => {
        
          let col = getRandomIndex(columns, ship.block)
          let row = getRandomIndex(rows, 0)
  
          console.log('ships position', ship)
  
          let hasDuplicates = ships.some(({ position }) =>
            position.some(
              (positions) => 
                positions === col + row ||
                positions === col + 1 + row ||
                positions === col - 1 +row
            ) 
          )
  
          if (hasDuplicates) {
            col = getRandomIndex(columns, ship.block)
            console.log('collision!')
            console.log('new col:', col)
          }
          while (ship.position.length < ship.block){
            ship.position.push(col + row)
            col = col +1
          }
  
          
  
          // Repeat for the number of blocks.
          // for (let i = 0; i < ship.block; i++){ 
          //   ship.position.push(col.toString() + row)
          //   col = col +1
          // }
          
        })

        return {ships} 
         
  } 
      useEffect(() => {
        setPosition()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    
  
}
  
  export default useGetShips