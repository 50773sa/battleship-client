// styles
import './App.css';

import socketio from 'socket.io-client'
import { useEffect } from 'react';
import StartGamePage from './pages/StartGamePage';

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL) 


const App = () => {


	return (
		<div>
			{/* <StartGamePage /> */}
			<GameAreaPage />
		</div>
	)
}

export default App;
