import React from 'react'
import './styles.css'

const ProfileInfo = (props) => {
   /*Receives a profile object from the /users route and display the name and the description */
   return (
      <div className='current-profile'>
         <div className='current-profile-header'>
            <img src={props.profile.avatar_url} alt='current user avatar'/>
            <h3>{props.profile.name || 'Sem nome'}</h3>
         </div>
         <div className='current-profile-description'>
            <p>{props.profile.bio || 'Sem descrição'}</p>
            <a href={props.profile.html_url}>Ver no GitHub</a>
         </div>
      </div>
   )
}

export default ProfileInfo