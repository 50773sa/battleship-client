import { createContext, useContext, useState } from 'react'
import socketio from "socket.io-client";

const GameContext = createContext()
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL);

export const useGameContext = () => {
    return useContext(GameContext)
}

const GameContextProvider = ({ children }) => {
    const [gameUsername, setGameUsername] = useState() 
    const [players, setPlayers] = useState([]) 
    const [player, setPlayer] = useState()
	const [opponent, setOpponent] = useState()
	const [thisPlayer, setThisPlayer] = useState()
	const [thisPlayerName, setThisPlayerName] = useState()
	const [otherPlayer, setOtherPlayer] = useState()
	const [otherPlayerName, setOtherPlayerName] = useState()
    const [myTurn, setMyTurn] = useState()
    const [ships, setShips] = useState ([])


    const values = {
        gameUsername,
        setGameUsername,
        socket,
        players, 
        setPlayers,
        player,
        setPlayer,
        opponent,
        setOpponent, 
        thisPlayer, 
        setThisPlayer,
        thisPlayerName, 
        setThisPlayerName, 
        otherPlayer,
        setOtherPlayer,
        otherPlayerName, 
        setOtherPlayerName,
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