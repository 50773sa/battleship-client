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
 /*    const [playerSocket, setPlayerSocket] = useState("")
    const [playerName, setPlayerName] = useState("")
	const [opponentSocket, setOpponentSocket] = useState("") 
    const [opponentName, setOpponentName] = useState("") */
    const [player, setPlayer] = useState("")
    const [opponent, setOpponent] = useState("")
    const [myTurn, setMyTurn] = useState()
    const [ships, setShips] = useState ([])


    const values = {
        gameUsername,
        setGameUsername,
        socket,
        players, 
        setPlayers,
        player,
        setPlayers,
        opponent,
        setOpponent,
        /* playerSocket,
        setPlayerSocket,
        playerName,
        setPlayerName,
        opponentSocket,
        setOpponentSocket,
        opponentName,
        setOpponentName, */
        myTurn,
        setMyTurn,
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