import React from 'react'
import {FiSearch} from 'react-icons/fi'
import './styles.css'

const SearchBar = (props) => {
   /*
   Return a input and a button that updates state and
   executes an action when the button is clicked
   */
   return (
      <div className='action-container'>
         <div className='action-container__search-box'>
            <FiSearch stroke='#e4e4e4' size={30} className='action-container__search-box__icon'/>
            <input 
               placeholder='Digite um nome de usuário'
               onChange={props.handleInput}
               value={props.value}
            ></input>
         </div>
         <button onClick={props.handleSubmit}>Pesquisar</button>
      </div>
   )
}

export default SearchBar