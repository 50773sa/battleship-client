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
    const [myTurn, setMyTurn] = useState()

    const values = {
        gameUsername,
        setGameUsername,
        socket,
        players, 
        setPlayers,
        myTurn,
        setMyTurn
    }

    return (
        <GameContext.Provider value={values}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider