import { createContext, useContext, useState, useEffect } from 'react'
import socketio from "socket.io-client";
import useGetShips from '../hooks/useGetShips';
import useCellIds from '../hooks/useCellIds';

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
    const [shipPosition, setShipPosition] = useState(useGetShips())
    const [playerNumberOfShips, setPlayerNumberOfShips] = useState(4)
    const [opponentNumberOfShips, setOpponentNumberOfShips] = useState(4)
    const [gameFull, setGameFull] = useState(false)

	const ids = useCellIds()
   	

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

        ships,
        setShips,  

        shipPosition, 
        setShipPosition,

        playerNumberOfShips,
        setPlayerNumberOfShips,
        opponentNumberOfShips,
        setOpponentNumberOfShips,

        myTurn,
        setMyTurn,

        ids,

        gameFull,
        setGameFull
    }


	//** Place the ships when page is mounted **/
	useEffect(() => {		
		setShips(shipPosition)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

    return (
        <GameContext.Provider value={values}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContextProvider