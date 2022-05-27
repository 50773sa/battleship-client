//import { useEffect, useState } from 'react'
import { columns, rows }  from '../hooks/useCellIds';

function GetShips() {

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

    const setPositions = () => {
      ships.forEach((ship) => {
      
        // create random col and row
        let col = getRandomIndex(columns, ship.block)+1
        let row = getRandomIndex(rows, 0)

        console.log('ships position', ship.position)

        // 
        let hasDuplicates = (tempCol, tempRow, blocks) => 
          ships.some(({ position }) => 
            position.some((posi) => 
            posi === tempCol + tempRow ||
            posi === tempCol + 1 + tempRow ||
            posi === tempCol + (blocks - 1) + tempRow ||
            posi === tempCol + (blocks - 2) + tempRow
          ))

        if (hasDuplicates(col, row, ship.block)) {
          console.log('Duplicates')
          do{
            col = getRandomIndex(columns, ship.block)
            row = getRandomIndex(rows, 0)
          } while (hasDuplicates(col, row))          
        }
        
        while(ship.position.length < ship.block) {
          ship.position.push(col + row)
          col = col +1
        }
        

        // Repeat for the number of blocks.
        // for (let i = 0; i < ship.block; i++){ 
        //   ship.position.push(col.toString() + row)
        //   col = col +1
        // }
        
      })
      return (

        <div className="ships">
        
        { ships }
        
        </div>
        
        )
    } 

    setPositions()
}

export default GetShips
