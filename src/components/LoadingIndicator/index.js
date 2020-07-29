import React from 'react'
import './styles.css'

const LoadingIndicator = (props) => {
   /*
   Returns a loading indicator that 
   normally is black but its color 
   can be inverted to white
   */
   return (
      <div className={'loading-indicator ' + (props.inverted ? 'loading-indicator--inverted' : '')}>
         <div className='loading-balls'>
            <div className='loading__ball'></div>
            <div className='loading__ball'></div>
            <div className='loading__ball'></div>
         </div>
         <p>Carregando...</p>
      </div>
   )
}

export default LoadingIndicator