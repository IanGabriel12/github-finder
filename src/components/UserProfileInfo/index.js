import React from 'react'
import './styles.css'

const ProfileInfo = (props) => (
   <div className={'user-profile ' + (props.important ? 'user-profile--important' : '')}>
      <img 
         alt='avatar'
         src={props.profile.avatar_url}
      />
      <div className='profile-name'>
         {
            props.important ? 
            <h2>{props.profile.name}</h2> : 
            <h4 onClick={props.onNameClick}>{props.profile.name}</h4>
         }
         <a href={props.profile.html_url}>Ver no GitHub</a>
      </div>
   </div>
)

export default ProfileInfo