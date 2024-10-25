import { useEffect, useState } from "react";
import ProfileCard from "../ProfileCard";
import { ProfileDto } from "../../dto/ProfileDto";
import { GithubAPI } from "../../services/GithubAPI";

export default function ProfileCardList(props: { profilesUrl: string }) {

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
        componentToRender = <li>Carregando...</li>
    } else if (!isLoading && hasError) {
        componentToRender = <li>Erro ao carregar os usuários</li>
    } else {
        componentToRender = <>{profiles.map(profile => <ProfileCard key={profile.login} profile={profile}/>)}</>
    }

    return (
        <ul className='profile-list'>
            {componentToRender}
        </ul>
    )
}