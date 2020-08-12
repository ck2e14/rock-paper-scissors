import React from 'react';
import './OptionCard-style.css';

const OptionCard = props => {

   const { type, clickHandler, img } = props

   if(type === 'rock') {
      return (
         <div className="option-card-wrapper" onClick={() => clickHandler('rock')}>
            <img src={img} alt="rock option" className="card-bg"/>
         </div>
      )
   }

   if(type === 'paper') {
      return (
         <div className="option-card-wrapper" onClick={() => clickHandler('paper')}>
            <img src={img} alt="paper option" className="card-bg"/>
         </div>
      )
   }

   if(type === 'scissors') {
      return (
         <div className="option-card-wrapper" onClick={() => clickHandler('scissors')}>
            <img src={img} alt="scissors option" className="card-bg"/>
         </div>
      )
   }
}

export default OptionCard