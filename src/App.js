import React, {useState} from 'react';

import DataCard from './components/DataCard';
import RepoInfo from './components/RepoInfo';
import ProfileInfo from './components/ProfileInfo';
import SearchBox from './components/SearchBox';
import LoadingIndicator from './components/LoadingIndicator';
import CurrentProfileInfo from './components/CurrentProfileInfo';
import FeedbackMessage from './components/FeedbackMessage';

import githubAPI from './services/github';
import './App.css';
import GitHubIcon from './assets/githubicon.svg';


function App() {
  const [userInputValue, setUserInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentProfile, setCurrentProfile] = useState(null) /* Type: Object */
  const [userRepos, setUserRepos] = useState(null) /* Type: Object */
  const [userFollowers, setUserFollowers] = useState(null) /* Type: Object */
  const [userFollowing, setUserFollowing] = useState(null) /* Type: Object */


  function clearData(){
    setUserRepos(null);
    setUserFollowers(null);
    setUserFollowing(null);
    setCurrentProfile(null);
  }

  async function getUserData(username){
    clearData() //To prevent that old content from another user stay while the new content is not loaded
    setErrorMessage(null)
    setIsLoading(true)

    githubAPI.get(`users/${username}`)
      .then(response => {
        setCurrentProfile(response.data)
        setIsLoading(false)

        githubAPI.get(`users/${username}/repos`)
          .then(response => setUserRepos(response.data))

        githubAPI.get(`users/${username}/followers`)
          .then(response => setUserFollowers(response.data))
    
        githubAPI.get(`users/${username}/following`)
          .then(response => setUserFollowing(response.data))
      })
      .catch(() => {
        setErrorMessage('Usuário não encontrado')
        setIsLoading(false)
      })
  }

  function handleEyeClick(username){
    getUserData(username)
    setUserInputValue(username)
  }

  function handleSubmit(){
    if(currentProfile){
      if(currentProfile.login.toLowerCase() === userInputValue.trim().toLowerCase()) return
    }
    
    getUserData(userInputValue)
  }


  let mainContent;

  if(isLoading){

    mainContent = <LoadingIndicator />

  }else if(errorMessage){

    mainContent = (<FeedbackMessage 
      title='Usuário não encontrado'
      description='Parece que esse usuário não existe. Verifique qualquer erro na digitação (a pesquisa não diferencia caracteres maiúsculos de minúsculos)'
    />)

  }else if(!currentProfile){

    mainContent = (<FeedbackMessage 
      title='Nada por enquanto'
      description='Digite um nome de usuário na caixa de pesquisa para que as informações dele sejam exibidas aqui.'
    />)

  }else{

    let repositoriesElements
    if (userRepos){
      repositoriesElements = userRepos.map((repo, index) => (
        <RepoInfo repository={repo} key={index}/>
      ))
    }

    let followersElements
    if (userFollowers){
      followersElements = userFollowers.map((userProfile, index) => (
        <ProfileInfo profile={userProfile} key={index} onEyeClick={() => handleEyeClick(userProfile.login)}/>
      ))
    }
    
    let followingElements
    if (userFollowing){
      followingElements = userFollowing.map((userProfile, index) => (
        <ProfileInfo profile={userProfile} key={index} onEyeClick={() => handleEyeClick(userProfile.login)}/>
      ))
    }

    mainContent = (
      <>
        <CurrentProfileInfo profile={currentProfile}/>
        <div className='extra-information'>
          <DataCard title='Repositórios' elements={repositoriesElements}/>
          <DataCard title='Seguidores' elements={followersElements}/>
          <DataCard title='Seguindo' elements={followingElements}/>
        </div>
      </>
    )

  }


  
  
  return (
    <>
      <header>
        <div className='header-logo'>
          <img src={GitHubIcon} alt='GitHubIcon'/>
          <h1>Finder</h1>
        </div>
      </header>
      <article className='description-box'>
        <div className='description-text'>
          <h2>Aqui você encontra <br/> o que precisa</h2>
          <p>
            Digite um nome de usuário na caixa ao lado e encontre
            as principais informações sobre ele.
          </p>
        </div>
        <SearchBox 
          value={userInputValue}
          handleInput={event => setUserInputValue(event.target.value)}
          handleSubmit={handleSubmit}
        />
      </article>
      <main>
        {mainContent}
      </main>
    </>
  )
}

export default App;
