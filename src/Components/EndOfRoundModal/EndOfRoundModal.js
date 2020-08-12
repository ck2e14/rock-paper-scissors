import React from 'react';
import './EndOfRoundModal-style.css';

const EndOfRoundModal = props => {

   const { winner, nextRoundClick } = props

   return(
      <div className="modal-wrapper">

         <div className="next-round-btn" onClick={() => nextRoundClick()} >
            Next Round
         </div>

      </div>
   )

}

export default EndOfRoundModal;