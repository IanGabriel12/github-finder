import { useState } from 'react'
import './styles.css'
import { useDebounce } from '../../hooks/useDebounce';
import { GithubAPI } from '../../services/GithubAPI';
import React from '../../assets/react.svg';
import RepoCard from '../../components/RepoCard';
import RepoList from '../../components/RepoList';
import ProfileCardList from '../../components/ProfileCardList';

function App() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  useDebounce(async () => {
    if(username) {
      const userData = await GithubAPI.getInstance().getDataFromUser(username);
      setName(userData.login);
    }
  }, username);

  return (
    <main>
      <header>
        <img src={React} alt="React logo" />
      </header>

      <div className='hero'>
        <h1>Github Finder</h1>
        <p>Busque informações sobre devs no Github. Começe digitando um nome de usuário abaixo.</p>
        <input type="text" name='username'/>
        <span>Procurando usuário...</span>
      </div>

      <div className="body">
        <div className='user-profile'>
          <div className='profile-top'>
            <img src={React} alt="Teste" />
            <h2>Nome de usuário</h2>
          </div>
          <div className='profile-bottom'>
            <p>Apaixonado por aprender</p>
            <a href="http://github.com/iangabriel12">Ver no GitHub</a>
          </div>
        </div>
        <div className='repositories'>
          <h2>Repositórios</h2>
          <RepoList />
        </div>
        <div className='starred'>
          <h2>Com estrela</h2>
          <RepoList />
        </div>
        <div className='following'>
          <h2>Seguindo</h2>

          <ProfileCardList />
        </div>
        <div className='followers'>
          <h2 >Seguidores</h2>

          <ProfileCardList />

        </div>
      </div>
    </main>
  )
}

export default App
