import { MouseEventHandler } from 'react';
import InfoIcon from '../../assets/info.svg'
import { ProfileDto } from '../../dto/ProfileDto'
import './styles.css';

export default function ProfileCard(props: { profile: ProfileDto, onClick?: MouseEventHandler<HTMLButtonElement> }) {
    const handleClick = props.onClick ? props.onClick : () => {};
    return (
        <li className='profile-card'>
            <button className='profile-button' onClick={handleClick}>
                <div className='profile-card-body'>
                    <img src={props.profile.avatar_url} alt={`Foto de ${props.profile.login}`} />
                    <p>{props.profile.login}</p>
                </div>
                <img src={InfoIcon} alt="teste" className='info-icon'/>
            </button>
        </li>
    )
}