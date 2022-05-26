import { createContext, useContext, useState } from 'react'
import socketio from "socket.io-client";

const GameContext = createContext()
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL);

export const useGameContext = () => {
    return useContext(GameContext)
}

const GameContextProvider = ({ children }) => {
    const [gameUsername, setGameUsername] = useState() // save all connected players usernames 
    const [players, setPlayers] = useState([]) // saves all connected players to this players-array
    const [ships, setShips] = useState([ 
        {
          name: "shipA",
          block: 4,
          position: [], 
          className: 'ships',
          sunk: false,       
        },
        {
          name: "shipB",
          block: 3,
          position: [], 
          className: 'ships',
          sunk: false,          
        },
        {
          name: "shipC",
          block: 2,
          position: [], 
          className: 'ships', 
          sunk: false,         
        },
        {
          name: "shipD",
          block: 2, 
          position: [], 
          className: 'ships', 
          sunk: false,         
        }
    ]) 

    const values = {
        gameUsername,
        setGameUsername,
        socket,
        players, 
        setPlayers,
        ships,
        setShips
    }

    return (
        <GameContext.Provider value={values}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider