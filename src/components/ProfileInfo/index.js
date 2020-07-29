import React from 'react';
import {FiExternalLink, FiEye} from 'react-icons/fi'
import './styles.css';

const ProfileListItem  = (props) => {
   /*Display information for a profile of an user that is not the searched one*/
   return (
      <div className='profile-container'>
         <div className='profile-information'>
            <img 
               src={props.profile.avatar_url}
               alt='user avatar'
               />
            <h5>{props.profile.login}</h5>
         </div>
         <FiEye 
            onClick={props.onEyeClick}
            className='profile__visualize-action'
            stroke='#303030' 
            size={32}
         />
         <a href={props.profile.html_url}>
            <FiExternalLink stroke='#303030' size={32}/>
         </a>
      </div>
   )
}

export default ProfileListItem