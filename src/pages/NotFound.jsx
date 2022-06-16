import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom' 
import { useGameContext } from '../contexts/GameContextProvider'


const NotFound = () => {
    const { socket } = useGameContext()
    const navigate = useNavigate()

	const newGame = () => { 
		// go back to start Page
		navigate("/")
		socket.emit('new:game')
	}


    return (
        <div className="fullBgMsg">
            <div>
                <h1>Oops, Page Not Found...</h1>
                <Button onClick={newGame}>≪ Go Back</Button>
            </div>
        </div>
    )
}

export default NotFound