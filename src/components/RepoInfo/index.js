import React from 'react'
import './styles.css'

const RepoInfo = (props) => (
   <div className='content-item'>
      <h4>{props.repository.name}</h4>
      <p>{props.repository.description}</p>
   </div>
)

export default RepoInfo