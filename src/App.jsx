import socketio from 'socket.io-client'
import Navigation from './components/Navigation'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL) // denna ligger utanför App för att inte denna anslutningen ska köras två gånger. Hade den körts två gånger hade varje webbläsare fått två olika id´n eftersom den körst två gånger. 

// pages
import StartGamePage from './pages/StartGamePage';
import GameAreaPage from './pages/GameAreaPage';


// styles
import './App.scss';


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
