import React, { useState } from 'react';
import './App.css';

function App() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [targetDateInput, setTargetDateInput] = useState('');
  const [targetTimeInput, setTargetTimeInput] = useState('');

  const handleDateChange = (event) => {
    setTargetDateInput(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTargetTimeInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const targetDateTime = new Date(`${targetDateInput}T${targetTimeInput}`);
    setCountdownFromDate(targetDateTime);
  };

  const setCountdownFromDate = (targetDateTime) => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const difference = targetDateTime - currentTime;

      if (difference < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);
  };

  return (
    <div className="App">
      <div className="countdown-options">
        <h2>Select Countdown</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="date" 
            value={targetDateInput} 
            onChange={handleDateChange} 
            required 
            className="countdown-input"
          />
          <input 
            type="time" 
            value={targetTimeInput} 
            onChange={handleTimeChange} 
            required 
            className="countdown-input"
          />
          <button type="submit" className="countdown-button">Set Countdown</button>
        </form>
      </div>

      <div id="countdown">
        <h1>Countdown Timer</h1>
        <p id="timer">
          <span>{countdown.days}</span>
          <span className="timer-unit">Days</span>
          <span>{countdown.hours}</span>
          <span className="timer-unit">Hours</span>
          <span>{countdown.minutes}</span>
          <span className="timer-unit">Minutes</span>
          <span>{countdown.seconds}</span>
          <span className="timer-unit">Seconds</span>
        </p>
      </div>
    </div>
  );
}

export default App;
