import React, { useState, useEffect } from 'react';
import BackgroundSlider from 'react-background-slider'
import './App.css';
import OptionCard from './Components/OptionCard/OptionCard';
import Modal from './Components/EndOfRoundModal/EndOfRoundModal';
import rock from './Assets/Media/Rock.png'
import paper from './Assets/Media/paper.png'
import scissors from './Assets/Media/scissors.png'
import scissorsbg from './Assets/Media/scissorsbg3.jpg'
import rocksbg from './Assets/Media/rocksbg4.jpg'
import paperbg from './Assets/Media/paperbg2.jpg'

function App() {

  const [ playerScore, setPlayerScore ] = useState(0);
  const [ opponentScore, setOpponentScore ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const [ counter, setCounter ] = useState();
  const [ firstPagePaint, setFirstPagePaint ] = useState(true);
  const [ activeBackgrounds, setActiveBackgrounds ] = useState(true)
  const [ lastOutcome, setLastOutcome ] = useState({winner: '', oppoChoice: ''})

  // General function-flow of app 
  // 1) User selects choice
  // 2) 'triggerRound()' is called, passed choice (first round has no time limit)
  // 3) Opponent's choice randomly selected 
  // 4) determineWinner() called
  // 5) endOfRoundSequence() called to display modal feedback on win/loss/draw
  // 6) 'Next Round' btn closes modal, passes integer to 'counter' hooked state
  // 7) useEffect is watching 'counter' (undefined upon init to stop you losing a round straight away after first paint :P )
  // 8) useEffect decrements counter (-1 /second). Either making a choice or timer elapsing re-calls triggerRound(), 
  // in turn clearing counter back to undefined to kill the counter decrementing
  // 9) if elapsed  timer, 'timer elapsed' passed as choice to determineWinner() to default the win to opponent 

  const triggerRound = choice => {
    setFirstPagePaint(false);
    setCounter();
    const opponentSelection = makeOpponentSelection();
    const winner = determineWinner(choice, opponentSelection);
    setLastOutcome({winner: winner, choice: choice, oppoChoice: opponentSelection})
    // console.log(`User chose: ${choice}, Opponent chose: ${opponentSelection}, Winner is: ${winner}`)
    endOfRoundSequence(winner, opponentSelection);
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
    setShowModal(false)
    setCounter(5)
  }

  const handleCountdownRender = () => {
    if(firstPagePaint) return <div className="welcomeMsg">Make a choice to start the game!</div>

    if(counter === 0) return <div> Time's up! Make your choice before the timer elapses! </div> 
    // TODO: Put this user feedback inside the modal. Currently it just flashes briefly because the timer hitting 0 calls triggerRound() which clears the value, thus clearing the condition to display this message. 
    
    if(!firstPagePaint) {
      if(counter > 0) return <div id="countdown" className="countdown-timer">Countdown: <span id="countdown-span">{counter}</span></div>
    }
  }

  const activeBackdrop = () => {
    if(activeBackgrounds === true ) {
      return (  
        <BackgroundSlider
          images={[ scissorsbg, paperbg, rocksbg]}
          duration={7} transition={.25} 
        />
      )
    }
  }

  const toggleBackdrop = () => setActiveBackgrounds(!activeBackgrounds)

  return (
    <>

      { showModal && <div className="shader-layer-end-of-round"></div> }
      { showModal && <Modal nextRoundClick={modalClickNextRound} lastOutcome={lastOutcome}/> }

      <div className="App">
      
        {activeBackdrop()}

        <div className="toggle-active-backdrop-btn" onClick={() => toggleBackdrop()}>
          Toggle active backdrop 
        </div>

        {handleCountdownRender()}

        <div className="title t1"><span>R</span>ock</div>
        <div className="title t2"><span>P</span>aper</div>
        <div className="title t3"><span>S</span>cissors</div>

        <div className="scorecard">
          Your Score: <span>{playerScore}</span> <br/>
          Opponent's Score: <span>{opponentScore}</span>
        </div>
        
        <div className="options-wrapper">
          <OptionCard clickHandler={triggerRound} type='rock' img={rock}/>
          <OptionCard clickHandler={triggerRound} type='paper' img={paper}/>
          <OptionCard clickHandler={triggerRound} type='scissors' img={scissors}/>
        </div>

      </div>

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"></link>

    
    </>
  );
}

export default App;
