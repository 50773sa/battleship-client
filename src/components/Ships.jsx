import React, { useState } from 'react'
import { columns, rows }  from '../hooks/useCellIds';


function Ships(props) {
    const [pos, setPos] = useState(null) // Ships Position

    const ships = [
      {
        name: "shipOne",
        block: 4,
        position: null,        
      },
      {
        name: "shipTwo",
        block: 3,
        position: null, 
      },
      {
        name: "shipThree",
        block: 2,
        position: null, 
      },
      {
        name: "shipFour",
        block: 2,
        position: null, 
      }
    ]

    
    // random function
    const getRandom = ((arr) => Math.floor(Math.random() * arr.length)
    )
    
    const rdmCol = getRandom(columns)
    const rdmRow = getRandom(rows)
    
    console.log('random col + row', columns[rdmCol], rows[rdmRow] ) // visa random id 

    const getRdmId = columns[rdmCol] + rows[rdmRow] //get random ID
   

    
    const rdmPos = () => {
      const randomPos = ships.map(ship => { // upprepa 4 gånger (alla 4 båtar)
        //ここで各shipそれぞれにランダム配置の値を渡す？
      })
      setPos(randomPos)
    }
  
  return (
    
    <div>
      
    </div>
  )
}

export default Ships
