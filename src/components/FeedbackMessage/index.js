import React from 'react';
import GitCatImg from '../../assets/gitcat.png'
import './styles.css'

const FeedbackMessage = (props) => {
   /*Show a message that says whats current going on in the app */
   return (
      <div className='message-container'>
         <img src={GitCatImg} alt='gitcat'/>
         <div className='message-content'>
            <h3>{props.title}</h3>
            <div className='message-content__text'>
               <p>
                  {props.description}
               </p>
            </div>
         </div>
      </div>
   )
}

export default FeedbackMessage;