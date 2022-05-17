import socketio from 'socket.io-client'
import { useEffect } from 'react';
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL) // denna ligger utanför App för att inte denna anslutningen ska köras två gånger. Hade den körts två gånger hade varje webbläsare fått två olika id´n eftersom den körst två gånger. 

// styles
import './App.scss';


const App = () => {


	return (
		<div>

		</div>
	)
}

export default App;
