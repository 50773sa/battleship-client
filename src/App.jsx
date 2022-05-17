// styles
import './App.scss';

import socketio from 'socket.io-client'
import Navigation from './components/Navigation'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';

// pages
import StartGamePage from './pages/StartGamePage';
import GameAreaPage from './pages/GameAreaPage';

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL) 


const App = () => {

	return (
	    <div id="App">
		<Navigation />
		<Container className='main-wrapper'>
			<div className="box">

			<Routes>
				<Route path="/" element={<StartGamePage />} />
				<Route path="/game" element={<GameAreaPage />} />
							
			</Routes>
			</div>
		</Container>  
    </div>
	)
}

export default App;
