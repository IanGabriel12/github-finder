import React from '../../assets/react.svg'
import { ProfileDto } from '../../dto/ProfileDto'
import './styles.css';

export default function ProfileCard(props: { profile: ProfileDto }) {
    return (
        <li className='profile-card'>
            <a href={props.profile.html_url}>
            <div className='profile-card-body'>
                <img src={props.profile.avatar_url} alt="teste" />
                <p>{props.profile.login}</p>
            </div>
            <img src={React} alt="teste" />
            </a>
        </li>
    )
}