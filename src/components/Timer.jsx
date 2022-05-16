import React, { useEffect, useState } from 'react'

const Timer = ( { socket } ) => { // tar emot socket från APP.jsx 
	const [timerId, setTimerId] = useState()
	const [timeElapsed, setTimeElapsed] = useState(0)

	// 3 events när man klickar på en knapp i timern
	// (emit start clock to server)
	const handleStartTimerClick = () => {
		socket.emit('clock:start') // eventet emitas till severn som sedan ska skicka tillbaka
	}
	const handleStopTimerClick = () => {
		socket.emit('clock:stop')
	}
	const handleResetTimerClick = () => {
		socket.emit('clock:reset')
	}

	// Funktioner för att starta, stanna och reseta klockan
	const onStartTimer = () => {
		const intervalId = setInterval(() => {
			setTimeElapsed(prevTimeElapsed => prevTimeElapsed + 1)
		}, 10);

		setTimerId(intervalId)
	}

	const onStopTimer = () => {
		clearInterval(timerId)
		setTimerId(null)
	}

	const onResetTimer = () => {
		setTimeElapsed(0)
	}

	// useEffect körs när sidan först monteras MEN den är det sista som körs av allt i koden
	useEffect(() => {
		// lyssna efter clock:start events från servern
		socket.on('clock:start', onStartTimer)
		socket.on('clock:stop', onStopTimer)
		socket.on('clock:reset', onResetTimer)
	}, [socket])


	const seconds = Math.floor(timeElapsed / 100).toString().padStart(2, 0)
	const hundredths = (timeElapsed % 100).toString().padStart(2, 0)

	return (
		<div className="display-1 text-center">
			<div className="time-elapsed">
				<pre>{seconds}.{hundredths}</pre>
			</div>

			<div className="btn-group" role="group">
				<button onClick={handleStartTimerClick} disabled={timerId} className="btn btn-success">Start</button>
				<button onClick={handleStopTimerClick} disabled={!timerId} className="btn btn-warning">Stop</button>
				<button onClick={handleResetTimerClick} className="btn btn-danger">Reset</button>
			</div>
		</div>
	)
}

export default Timer
