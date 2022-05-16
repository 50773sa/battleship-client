import socketio from 'socket.io-client'
import Timer from './components/Timer';
import './App.css';
import { useEffect } from 'react';

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL) // denna ligger utanför App för att inte denna anslutningen ska köras två gånger. Hade den körts två gånger hade varje webbläsare fått två olika id´n eftersom den körst två gånger. 

const App = () => {

/* 	// kör detta när appen mountas 
	useEffect(() => {
		socket.emit ('hello')
	}, []) */

/* 	const onClockStart = () => {
	
	}

	const handleStartClock = () => {
		socket.emit('clock:start')
	} */
	
	return (
		<div className="container text-center">
			<Timer socket={socket} /> {/* skickar socket så den kan nås i Timer.jsx */}
		</div>
	)
}

export default App;
