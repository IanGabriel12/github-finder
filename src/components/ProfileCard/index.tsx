import React from '../../assets/react.svg'

export default function ProfileCard() {
    return (
        <li className='profile-card'>
            <a href="http://github.com/iangabriel12">
            <div className='profile-card-body'>
                <img src={React} alt="teste" />
                <p>Teste</p>
            </div>
            <img src={React} alt="teste" />
            </a>
        </li>
    )
}