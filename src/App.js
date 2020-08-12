import React, { useState } from 'react';
import './App.css';
import OptionCard from './Components/OptionCard/OptionCard';

function App() {

  const [ playerScore, setPlayerScore ] = useState(0);
  const [ opponentScore, setOpponentScore ] = useState(0);

  const triggerRound = choice => {
    const opponentSelection = makeOpponentSelection();
    console.log(`User's: ${choice}, Opponent's: ${opponentSelection}`)
  }

  const makeOpponentSelection = () => {
    const determinant = Math.floor(Math.random() * 3)
    if(determinant === 0) return 'rock';
    if(determinant === 1) return 'paper';
    if(determinant === 2) return 'scissors';
  }

  return (
    <>  
      <div className="App">

        <div className="scorecard">
          Your Score: {playerScore} <br/>
          Opponent's Score: {opponentScore}
        </div>
        
        <div className="options-wrapper">
          <OptionCard clickHandler={triggerRound} type='rock'/>
          <OptionCard clickHandler={triggerRound} type='paper'/>
          <OptionCard clickHandler={triggerRound} type='scissors'/>
        </div>

      </div>

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"></link>

    </>
  );
}

export default App;
