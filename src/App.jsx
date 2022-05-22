// styles
import './App.scss';

import { Routes, Route } from 'react-router-dom'

// pages
import StartGamePage from './pages/StartGamePage';
import GameAreaPage from './pages/GameAreaPage';

import Header from './components/Header'

const App = () => {

	return (
	    <div id="App">
		<Header />
		
		<div className='main-wrapper'>
			<div className="box">
				
			<Routes>
				<Route path="/" element={<StartGamePage />} />
				<Route path="/game" element={<GameAreaPage />} />
			</Routes> 
			</div>
		</div>  
    </div>
	)
}

export default App;