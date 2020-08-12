import React, { useState, useEffect } from 'react';
import './App.css';
import OptionCard from './Components/OptionCard/OptionCard';
import Modal from './Components/EndOfRoundModal/EndOfRoundModal';

function App() {

  const [ playerScore, setPlayerScore ] = useState(0);
  const [ opponentScore, setOpponentScore ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const [ counter, setCounter ] = useState();
  const [ firstPagePaint, setFirstPagePaint ] = useState(true);
  // const [ rollNextRound, setRollNextRound ] = useState(false)

  const triggerRound = choice => {
    setFirstPagePaint(false);
    setCounter();
    const opponentSelection = makeOpponentSelection();
    const winner = determineWinner(choice, opponentSelection);
    // console.log(`User chose: ${choice}, Opponent chose: ${opponentSelection}, Winner is: ${winner}`)
    endOfRoundSequence(winner, opponentSelection);
  }

  const makeOpponentSelection = () => {
    const determinant = Math.floor(Math.random() * 3)
    if(determinant === 0) return 'rock';
    if(determinant === 1) return 'paper';
    if(determinant === 2) return 'scissors';
  }

  const determineWinner = (choice, oppo) => {
    if(choice === 'timer elapsed') return 'opponent'
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
    // write function that passes oppoSelection to the modal so you can display what beat the user
  }

  const modalClickNextRound = () => {
    // close modal, trigger countdown via setting a counter state value --> useEffect is watching counter state to know when to trigger 
    setShowModal(false)
    setCounter(5)
  }

    useEffect(() => {
      const countdownInterval = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
      if (counter <= 0) { 
        triggerRound('timer elapsed') 
        clearInterval(countdownInterval)
      }
      return () => clearInterval(countdownInterval);
    }, [counter]);

    const handleCountdownRender = () => {
      if(firstPagePaint) return <div className="welcomeMsg">Make a choice to start the game</div>

      if(counter === 0) return <div> Time's up! Make your choice before the timer elapses! </div> 
      
      if(!firstPagePaint) {
        if(counter > 0) return <div>Countdown: {counter}</div>
      }
    }


  return (
    <>
    
      { showModal && <Modal nextRoundClick={modalClickNextRound} /> }
      {/* replace hardcoded modal with function call that returns the Modal */}
      
      <div className="App">

        {handleCountdownRender()}

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
