import { useState } from 'react'
import './styles.css'
import { useDebounce } from '../../hooks/useDebounce';
import { GithubAPI } from '../../services/GithubAPI';
import React from '../../assets/react.svg';

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
            <p></p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </main>
  )
}

export default App
