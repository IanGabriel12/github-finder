import React, {useState} from 'react';

import DataCard from './components/DataCard';
import RepoInfo from './components/RepoInfo';
import SearchBar from './components/SearchBar';
import LoadingIndicator from './components/LoadingIndicator';
import ProfileInfo from './components/UserProfileInfo';
import ProfileListItem from './components/ProfileListItem';

import githubAPI from './services/github';
import './App.css';
import GitHubIcon from './assets/githubicon.svg';

function App() {
  const [userInputValue, setUserInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [userInfo, setUserInfo] = useState(null) /* Type: Object */
  const [userRepos, setUserRepos] = useState(null) /* Type: Object */
  const [userFollowers, setUserFollowers] = useState(null) /* Type: Object */
  const [userFollowing, setUserFollowing] = useState(null) /* Type: Object */

  async function getUserData(username){
    try{
      setErrorMessage('')
      setIsLoading(true)

      const info = (await githubAPI.get(`users/${username}`)).data
      setUserInfo(info)

      const repositories = (await githubAPI.get(`users/${username}/repos`)).data
      setUserRepos(repositories)

      const followers = (await githubAPI.get(`users/${username}/followers`)).data
      setUserFollowers(followers)

      const following = (await githubAPI.get(`users/${username}/following`)).data
      setUserFollowing(following)
    } catch {
      setErrorMessage('Usuário não encontrado')
    }

    setIsLoading(false)
  }

  function handleNameClick(username){
    getUserData(username)
    setUserInputValue(username)
  }

  let repositoriesElements
  let followersElements
  let followingElements
  //Creating list items for each card with their respective data
  if(userRepos){
    repositoriesElements = userRepos.map((repository, index) => (
      <RepoInfo 
        repository={repository}
        key={index}
      />
    ))
  }

  if(userFollowers){
    followersElements = userFollowers.map((follower, index) => {
      follower.name = follower.login
      return <ProfileListItem 
        profile={follower} 
        key={index}
        onNameClick={() => handleNameClick(follower.name)}
      />
    })
  }

  if(userFollowing){
    followingElements = userFollowing.map((following, index) => {
      following.name = following.login
      return <ProfileListItem 
        profile={following} 
        key={index}
        onNameClick={() => handleNameClick(following.name)}
      />
    })
  }

  /** The element that will show on screen depending on the request result */
  let mainElement
  if(errorMessage){
    mainElement = <h1>{errorMessage}</h1>
  } else if (isLoading){
    mainElement = <LoadingIndicator />
  } else if(userInfo){
    mainElement = (
      <>
        <div className='profile-container'>
          <ProfileInfo 
            profile={userInfo}
            important
          />
        </div>
        
        <div className='data'>
          <DataCard title='Repositórios' elements={repositoriesElements}></DataCard>
          <DataCard title='Seguindo' elements={followingElements}></DataCard>
          <DataCard title='Seguidores' elements={followersElements}></DataCard>
        </div>
      </>
    )
  }
  

  return (
    <>
      <header>
        <img src={GitHubIcon} alt='GitHub icon'/>
        <h1>Finder</h1>
      </header>
      <SearchBar 
        value={userInputValue}
        onChange={e => setUserInputValue(e.target.value)}
        onEnter={() => getUserData(userInputValue)}
        onClick={() => getUserData(userInputValue)}
      />
      <hr id='separator'/>
      {mainElement}
    </>
  );
}

export default App;
