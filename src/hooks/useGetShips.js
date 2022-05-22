import { useEffect, useState } from 'react'
import { columns, rows }  from './useCellIds';

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

    const setPositions = () => {
      ships.map((ship) => {
        const randomIndex = Math.floor(Math.random() * columns.length)
        let col = columns[randomIndex]
        const row = rows[randomIndex]

        // Repeat for the number of blocks.
        for (let i = 0; i < ship.block; i++){ 
          ship.position.push(col.toString() + row)
          col = col +1
        }
        
        return ships
      })
    } 

    setPositions()

  return{ ships }
}

export default useGetShips
