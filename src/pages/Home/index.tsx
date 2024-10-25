import { useRef, useState } from 'react'
import './styles.css'
import { GithubAPI } from '../../services/GithubAPI';
import React from '../../assets/react.svg';
import RepoList from '../../components/RepoList';
import ProfileCardList from '../../components/ProfileCardList';
import { UserDto } from '../../dto/UserDto';
import Spinner from '../../components/Spinner';
import ErrorIcon from '../../assets/xmark.svg';

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
  const [userHasSubmitted, setUserHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const bodyRef = useRef<HTMLDivElement | null>(null);


  function handleButtonClick(currentUsername: string) {
    if (!currentUsername) return;
    setError(false);
    setLoading(true);
    setUserHasSubmitted(true);

    fetchGithubData(currentUsername)
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

  async function fetchGithubData(currentUsername: string) {
    return GithubAPI.getInstance().getDataFromUser(currentUsername);
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

  function handleError(error: {response: {status: number}}) {
    const NOT_FOUND = 404;
    const FORBIDDEN = 403;

    const status = error.response.status;
    if(status == NOT_FOUND) {
      setErrorMessage(`Não foi possível encontrar o usuário ${username}`);
    } else if (status == FORBIDDEN) {
      setErrorMessage("Ops, acho que estouramos nosso limite da API do github, tente novamente daqui a pouco")
    } else {
      setErrorMessage("Erro inesperado");
    }
    setError(true);
  }

  function handleCardClick(username: string) {
    setUsername(username);
    handleButtonClick(username);
  }

  let renderOnBody: React.JSX.Element;

  if(!userHasSubmitted) {
    renderOnBody = <p className='body-placeholder'>Digite um nome de usuário na barra de pesquisa acima</p>
  } else if(isLoading) {
    renderOnBody = (
      <div className='body-loading'>
        <Spinner width={50} height={50} borderWidth={5}/>
        <p>Recuperando dados do usuário {username}...</p>
      </div>
    )
  } else if (hasError) {
    renderOnBody = (
      <div className='body-error'>
        <img src={ErrorIcon} alt="Ícone de erro"/>
        <p>{errorMessage}</p>
      </div>
    )
  } else {
    renderOnBody = (
      <div className='content'>
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
          <ProfileCardList onCardClick={handleCardClick} profilesUrl={followingUrl}/>
        </div>
        <div className='followers'>
          <h2 >Seguidores</h2>
          <ProfileCardList onCardClick={handleCardClick} profilesUrl={followersUrl}/>
        </div>
      </div>
    )
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
          <button type='button' onClick={() => handleButtonClick(username)}>Pesquisar</button>
        </div>
        <span className='loader-wrapper' style={{
          visibility: isLoading ? 'unset' : 'hidden'
        }}>
            <Spinner width={10} height={10} borderWidth={2}/> 
            <span className='loader-wrapper-text'>Procurando usuário {username}... </span>
        </span>
      </div>


      <div className="body" ref={bodyRef}>
        {renderOnBody}
      </div>
    </main>
  )
}

export default App
