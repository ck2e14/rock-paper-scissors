import React, { useState } from 'react';
import './App.css';
import OptionCard from './Components/OptionCard/OptionCard';
import Modal from './Components/EndOfRoundModal/EndOfRoundModal';

function App() {

  const [ playerScore, setPlayerScore ] = useState(0);
  const [ opponentScore, setOpponentScore ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);

  const triggerRound = choice => {
    const opponentSelection = makeOpponentSelection();
    const winner = determineWinner(choice, opponentSelection);
    console.log(`User chose: ${choice}, Opponent chose: ${opponentSelection}, Winner is: ${winner}`)
    endOfRoundSequence(winner, opponentSelection)
  }

  const makeOpponentSelection = () => {
    const determinant = Math.floor(Math.random() * 3)
    if(determinant === 0) return 'rock';
    if(determinant === 1) return 'paper';
    if(determinant === 2) return 'scissors';
  }

  const determineWinner = (choice, oppo) => {
    if(choice === oppo) return 'draw'

    if(choice === 'rock') { // user-chose-rock outcomes
      if(oppo === 'paper') return 'opponent'
      if(oppo === 'scissors') return 'user'
    }

    if(choice === 'paper') { // user-chose-paper outcomes
      if(oppo === 'scissors') return 'opponent'
      if(oppo === 'rock') return 'user'
    }

    if(choice === 'scissors') { // user-chose-scissors outcomes
      if(oppo === 'rock') return 'opponent'
      if(oppo === 'paper') return 'user'
    }
  }

  const endOfRoundSequence = (whoWon, oppoSelection) => {
    if(whoWon === 'user') setPlayerScore(playerScore + 1) 
    if(whoWon === 'opponent') setOpponentScore(opponentScore + 1) 
    setShowModal(true)
  }

  const modalClickNextRound = () => {
    setShowModal(false)
  }

  return (
    <>  
    { showModal && <Modal nextRoundClick={modalClickNextRound} /> }
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
