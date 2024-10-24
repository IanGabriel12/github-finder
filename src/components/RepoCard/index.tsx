import './styles.css'
import React from '../../assets/react.svg';

export default function RepoCard () {
    return (
        <li className='repo-card'>
            <a href="">
            <div className='repo-card-body'>
                <h3>Título do repositório</h3>
                <p>Descrição do repositório</p>
            </div>
            <div className='repo-card-info'>
                <img src={React} alt="React"/>
                <span>Ver no github</span>
            </div>
            </a>
        </li>
    )
}