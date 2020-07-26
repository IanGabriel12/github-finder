import React, {useState} from 'react';
import {FiArrowDown} from 'react-icons/fi';
import LoadingIndicator from '../LoadingIndicator'
import './styles.css'

const DataCard = (props) => {
   /*Receives a title and a list of components, and adds a vertical margin to these components*/

   const [isOpen, setIsOpen] = useState(false);

   let cardContent

   if(!props.elements){
      cardContent = (
         <div className={
            'data-card-content data-card-content--empty ' + (isOpen ? 'data-card-content--open' : '')
         }>
            <LoadingIndicator />
         </div>
      )
   }else if(props.elements.length === 0){
      cardContent = (
         <div className={
            'data-card-content data-card-content--empty ' + (isOpen ? 'data-card-content--open' : '')
         }>
            <p>Não há nada aqui...</p>
         </div>
      )
   }else{
      cardContent = (
         <div 
            className={'data-card-content ' + (isOpen ? 'data-card-content--open' : '')}
         >
         <ul>
            {props.elements.map((element, index) => (
               <li key={index}>{element}</li>
            ))}
         </ul>
         </div>
      )
   }

   return (
      <div className='data-card'>
         <div className='data-card-header'>
            <h3>{props.title}</h3>
            <FiArrowDown 
               onClick={() => setIsOpen(!isOpen)}
               className={'data-card-header__icon ' + (isOpen ? 'data-card-header__icon--open' : '')}
               size={24}
            />
         </div>
         {cardContent}
      </div>
   )
}

export default DataCard