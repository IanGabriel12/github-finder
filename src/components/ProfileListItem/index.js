import React from 'react';
import ProfileInfo from '../UserProfileInfo';
import './styles.css';

const ProfileListItem  = (props) => (
   <div className='profile-item-container'>
      <ProfileInfo profile={props.profile} onNameClick={props.onNameClick}/>
   </div>
)

export default ProfileListItem