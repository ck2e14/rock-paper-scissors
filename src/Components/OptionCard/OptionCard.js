import React from 'react';
import './OptionCard-style.css';

const OptionCard = props => {

   const { type, clickHandler } = props

   if(type === 'rock') {
      return (
         <div className="option-card-wrapper" onClick={() => clickHandler('rock')}>
            PIC OF ROCK
         </div>
      )
   }

   if(type === 'paper') {
      return (
         <div className="option-card-wrapper" onClick={() => clickHandler('paper')}>
            PIC OF PAPER
         </div>
      )
   }

   if(type === 'scissors') {
      return (
         <div className="option-card-wrapper" onClick={() => clickHandler('scissors')}>
            PIC OF SCISSORS 
         </div>
      )
   }
}

export default OptionCard