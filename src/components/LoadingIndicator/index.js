import React, {useState, useEffect} from 'react'
import './styles.css'

const LoadingIndicator = () => {
   const [loadingText, setLoadingText] = useState('Carregando')

   useEffect(() => {
      const interval = setInterval(() => {
         setLoadingText(
            loadingText => (
               loadingText === 'Carregando...' ? 'Carregando' : loadingText + '.'
            )
         )
      }, 1000)

      return () => clearInterval(interval)
   }, [])



   return (
      <div className='loading-indicator'>
         <img 
            src='https://i.pinimg.com/originals/d6/40/57/d6405738890860b9844024299ee0c7a6.png'
            alt='octocat'
            className='loading-indicator__image'
         />
         <p>{loadingText}</p>
      </div>
   )
}

export default LoadingIndicator