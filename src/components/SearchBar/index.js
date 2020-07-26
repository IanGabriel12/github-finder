import React from 'react'
import {FiSearch} from 'react-icons/fi'
import './styles.css'

const SearchBar = (props) => {
   function handleKeyDown(event){
      console.log(event)
      if (event.key === 'Enter'){
         props.onEnter()
      }
   }
   return (
      <div className='search-bar'>
         <FiSearch 
            className='search-bar__icon'
            size={24} 
            fill='#303030' 
            stroke='#eeeeee' 
            onClick={props.onClick}
         />
         <input 
            value={props.value} 
            onChange={props.onChange}
            onKeyDown={handleKeyDown}
            placeholder='Digite o nome de usuário'
         />
      </div>
   )
}

export default SearchBar