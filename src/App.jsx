// styles
import './App.scss';

/* import socketio from 'socket.io-client' */

import { Routes, Route } from 'react-router-dom'
/* import { useEffect } from 'react'; */

// pages
import StartGamePage from './pages/StartGamePage';
import GameAreaPage from './pages/GameAreaPage';
import WaitingroomPage from './pages/WaitingroomPage';

/* const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)  */

const App = () => {

	return (
	    <div id="App">
		<div className='main-wrapper'>
			<div className="box">
				
			<Routes>
				<Route path="/" element={<StartGamePage /* socket={socket} */ />} />
				<Route path="/waitingroom" element={<WaitingroomPage />} />
				<Route path="/games/:game_id" element={<GameAreaPage />} />
				{/* <Route path="/game" element={<GameAreaPage />} />	 */}
			</Routes> 
			</div>
		</div>  
    </div>
	)
}

export default App;