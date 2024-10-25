import { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";
import { ProfileDto } from "../../dto/ProfileDto";
import { GithubAPI } from "../../services/GithubAPI";
import Spinner from "../Spinner";
import ErrorIcon from '../../assets/xmark.svg';
import './styles.css'

export default function ProfileCardList(props: { profilesUrl: string, onCardClick: (username: string) => any }) {

    const [profiles, setProfiles] = useState<ProfileDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    async function fetchProfiles() {
        setHasError(false);
        setIsLoading(true);

        GithubAPI
            .getInstance()
            .getProfilesList(props.profilesUrl)
            .then(setProfiles)
            .catch(() => setHasError(true))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        if(!props.profilesUrl) return;
        fetchProfiles();
    }, [props.profilesUrl]); 

    let componentToRender: React.JSX.Element;

    if(isLoading) {
        componentToRender = (
            <div className='profile-list-wrapper'>
                <Spinner width={30} height={30} borderWidth={3}/>
                <p>Carregando usuários...</p>
            </div>
        )
    } else if (!isLoading && hasError) {
        componentToRender = (
            <div className='profile-list-wrapper profile-list-error'>
                <img src={ErrorIcon} alt="Erro" />
                <p>Erro ao carregar usuários</p>
            </div>
        )
    } else {
        componentToRender = <>{profiles.map(profile => <ProfileCard 
                key={profile.login} 
                profile={profile}
                onClick={() => props.onCardClick(profile.login)}
                />
        )}</>
    }

    return (
        <ul className='profile-list'>
            {componentToRender}
        </ul>
    )
}