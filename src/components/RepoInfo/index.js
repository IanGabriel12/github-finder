import React from 'react'
import {FiExternalLink} from 'react-icons/fi'
import './styles.css'

const RepoInfo = (props) => {
   /*Receives all repository data from a single object and displays it*/
   return (
      <div className='repo-container'>
         <div className='repo-information'>
            <h5>{props.repository.name}</h5>
            <p>{props.repository.description}</p>
         </div>
         <a href={props.repository.html_url}>
            <FiExternalLink className='repo-container__action-icon' stroke='#303030' size={32}/>
         </a>
      </div>
   )
}

export default RepoInfo