//---------------
// initial value
//---------------

//import { useEffect, useState } from 'react'
import { columns, rows }  from './useCellIds'

function useGetShips() {

    const ships = [
      {
        name: "shipA",
        block: 4,
        position: [],   
      },
      {
        name: "shipB",
        block: 3,
        position: [],          
      },
      {
        name: "shipC",
        block: 2,
        position: [],         
      },
      {
        name: "shipD",
        block: 2,
        position: [],       
      }
    ]

    // Random function
    const getRandomIndex = (array, blocks) => {
      const randomId = Math.floor(Math.random() * (array.length - blocks));
      return array[randomId];
    }
    
      ships.forEach((ship) => {      
        // create random col and row
        let col = getRandomIndex(columns, 0)
        let row = getRandomIndex(rows, ship.block - 1)

      
        let hasDuplicates = (tempCol, tempRow, blocks) => {
          const checkPosi = []
          for (let i = 0; i < blocks; i++) {
            checkPosi.push (tempRow + i + tempCol)
          }
          const isDuplicate = ships.some(({ position }) =>
            position.some((posi) => checkPosi.includes(posi))
          )
          return isDuplicate
        }                

        if (hasDuplicates(col, row, ship.block)) {
          /* console.log('Duplicates') */
          do{
            col = getRandomIndex(columns, 0)
            row = getRandomIndex(rows, ship.block - 1)
          } while (hasDuplicates(col, row , ship.block ))          
        }
        
        while(ship.position.length < ship.block) {
          ship.position.push(row + col)
          row = row +1
        }
      })

      return ships        
}

export default useGetShips
