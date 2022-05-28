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
        isSunk: false,  
        className: 'isShip'     
      },
      {
        name: "shipB",
        block: 3,
        position: [], 
        isSunk: false,  
        className: 'isShip'          
      },
      {
        name: "shipC",
        block: 2,
        position: [], 
        isSunk: false,  
        className: 'isShip'          
      },
      {
        name: "shipD",
        block: 2,
        position: [], 
        isSunk: false,   
        className: 'isShip'         
      }
    ]
    // Random function
    const getRandomIndex = (array, blocks) => {
      const randomId = Math.floor(Math.random() * (array.length - blocks));
      //console.log(array.length, blocks)
      return array[randomId];
    }
    
      ships.forEach((ship) => {      
        // create random col and row
        let col = getRandomIndex(columns, 0)
        let row = getRandomIndex(rows, ship.block - 1)
        //console.log('ships position', ship.position)

      
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
          console.log('Duplicates')
          do{
            col = getRandomIndex(columns, 0)
            row = getRandomIndex(rows, ship.block - 1)
          } while (hasDuplicates(col, row , ship.block ))          
        }
        
        while(ship.position.length < ship.block) {
          ship.position.push(row + col)
          row = row +1
        }
        //console.log('ships posi', ship.position)
      })
      console.log('ships', ships)
      return ships         
}

export default useGetShips
