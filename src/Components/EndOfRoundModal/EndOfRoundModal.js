import React, { useState, useEffect } from 'react';
import './EndOfRoundModal-style.css';

const EndOfRoundModal = props => {

   const [ winner, setWinner ] = useState(props.lastOutcome.winner)
   const [ choice, setChoice ] = useState(props.lastOutcome.choice)
   const [ oppoChoice, setOppoChoice ] = useState(props.lastOutcome.oppoChoice)

   const { nextRoundClick } = props

   
   const whoWon = () => {

      if(!props.lastOutcome || !oppoChoice ||!winner) return null

      if(choice === 'timer elapsed') return(
         <div className="">
         You <span>lost</span> this round! <br/> You were beaten by your own indecision! Make sure to choose before the timer elapses.
      </div>
      )

      if(winner === 'user') return(
         <div className="">
            You <span>won</span> this round! <br/>A skilled performance! <br/> Your opponent chose {oppoChoice}.
         </div>
      )

      if(winner === 'opponent') return (
         <div className="">
            You <span>lost</span> this round! <br/> You were beaten by {oppoChoice}.
         </div>
      )

      if(winner === 'draw') return (
         <div className="">
            You <span>drew</span> this round! <br/> Your opponent also chose {oppoChoice}. 
         </div>
      )
   }

   return(
      <div className="modal-wrapper">

         {console.log(winner, choice, oppoChoice)}
         
         <div className="round-feedback">
            { props.lastOutcome && whoWon()}
         </div>
         
         <div className="next-round-btn" onClick={() => nextRoundClick()} >
            Next Round
         </div>

      </div>
   )
}

export default EndOfRoundModal;