import { useRef, useState } from 'react'
import './styles.css'
import { GithubAPI } from '../../services/GithubAPI';
import React from '../../assets/react.svg';
import RepoList from '../../components/RepoList';
import ProfileCardList from '../../components/ProfileCardList';
import { UserDto } from '../../dto/UserDto';

function App() {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [htmlUrl, setHtmlUrl] = useState('');
  const [followersUrl, setFollowersUrl] = useState('');
  const [followingUrl, setFollowingUrl] = useState('');
  const [reposUrl, setReposUrl] = useState('');
  const [starredUrl, setStarredUrl] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const bodyRef = useRef<HTMLDivElement | null>(null);


  function handleButtonClick() {
    if (!username) return;
    setError(false);
    setLoading(true);

    fetchGithubData()
      .then(userData => {
        updateUserData(userData);
        scrollToBody();
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  }

  function scrollToBody() {
    if(bodyRef.current) {
      bodyRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  async function fetchGithubData() {
    return GithubAPI.getInstance().getDataFromUser(username);
  }

  function updateUserData(userData: UserDto) {
    setLogin(userData.login);
    setBio(userData.bio);
    setAvatarUrl(userData.avatar_url);
    setHtmlUrl(userData.html_url);
    setReposUrl(userData.repos_url);
    setStarredUrl(userData.starred_url);
    setFollowersUrl(userData.followers_url);
    setFollowingUrl(userData.following_url);
  }

  function handleError() {
    console.log('Erro ao fazer a requisição para o usuário do Github ' + username);
    setError(true);
  }

  return (
    <main>
      <header>
        <img src={React} alt="React logo" />
      </header>

      <div className='hero'>
        <h1>Github Finder</h1>
        <p>Busque informações sobre devs no Github. Começe digitando um nome de usuário abaixo.</p>
        <div className='input-wrapper'>
          <input type='text' name='username' value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
          <button type='button' onClick={handleButtonClick}>Pesquisar</button>
        </div>
        {isLoading && <span>Procurando usuário...</span>}
      </div>


      <div className="body" ref={bodyRef}>
        {!isLoading && hasError && <span>Erro ao buscar usuário</span>}
        {!isLoading && !hasError && login &&
          (
            <>
              <div className='user-profile'>
                <div className='profile-top'>
                  <img src={avatarUrl} alt="Avatar do usuário" />
                  <h2>{login}</h2>
                </div>
                <div className='profile-bottom'>
                  <p>{bio}</p>
                  <a href={htmlUrl}>Ver no GitHub</a>
                </div>
              </div>
              <div className='repositories'>
                <h2>Repositórios</h2>
                <RepoList reposUrl={reposUrl}/>
              </div>
              <div className='starred'>
                <h2>Com estrela</h2>
                <RepoList reposUrl={starredUrl}/>
              </div>
              <div className='following'>
                <h2>Seguindo</h2>
                <ProfileCardList profilesUrl={followingUrl}/>
              </div>
              <div className='followers'>
                <h2 >Seguidores</h2>
                <ProfileCardList profilesUrl={followersUrl}/>
              </div>
            </>
          )
        }

      </div>
    </main>
  )
}

export default App
