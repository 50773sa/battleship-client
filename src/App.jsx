// styles
import './App.scss';

import { Routes, Route } from 'react-router-dom'

// pages and components
import StartGamePage from './pages/StartGamePage';
import GameAreaPage from './pages/GameAreaPage';
import NotFound from './pages/NotFound';
import Header from './components/Header'

const App = () => {

	return (
	    <div id="App">
		<Header />
		
		<div className='main-wrapper'>
			<div className="box">
				
			<Routes>
				<Route path="/" element={<StartGamePage />} />
				<Route path="/game/:room_id" element={<GameAreaPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes> 
			</div>
		</div>  
    </div>
	)
}

export default App;