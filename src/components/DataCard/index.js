import React, {useState} from 'react';
import {FiArrowDown} from 'react-icons/fi';
import LoadingIndicator from '../LoadingIndicator'
import './styles.css'

const DataCard = (props) => {
   /*
   Receives a title and a array of elements
   Display those elements with a vertical margin between them
   */
   const [isOpen, setIsOpen] = useState(false);

   let cardContent
   let isEmpty = true
   if(!props.elements){
      cardContent = <LoadingIndicator inverted/>
   }else if(props.elements.length === 0){
      cardContent = <p className='empty__text'>Não há nada aqui</p>
   }else{
      isEmpty = false
      cardContent = (
         <ul>
            {props.elements.map((element, index) => (
               <li key={index}>
                  {element}
               </li>
            ))}
         </ul>
      )
   }

   return (
      <div className='card'>
         <div className={'card-header ' + (isOpen ? 'card-header--open' : '')}>
            <h4>{props.title}</h4>
            <FiArrowDown 
               onClick={() => setIsOpen(!isOpen)}
               stroke='#e4e4e4' 
               size={24} 
               className={'card-header__icon ' + (isOpen ? 'card-header__icon--open' : '')} 
            />
         </div>
         <div 
            className={
               'card-content ' + 
               (isOpen ? 'card-content--open ' : '') + 
               (isEmpty ? 'card-content--empty ' : '')
            }
         >
            {cardContent}
         </div>
      </div>
   )
}

export default DataCard