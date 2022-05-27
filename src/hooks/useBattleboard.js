import { useState, useEffect }from 'react'

function useBattleboard() {
    const [battleboard, setBattleboard] = useState(createBattleboard)


    // create cells and place them in battleboard state


    // place ships in battleboard

    const placeShips = () => {

    }

    return {
        battleboard,
        placeShips
    }
}

    const game = () => {
        const myBattleboard = useBattleboard()
        const opponentBattleboard = useBattleboard()

        myBattleboard.placeShips()

 
  return (
    <div>useBattleboard</div>
  )
}

export default useBattleboard