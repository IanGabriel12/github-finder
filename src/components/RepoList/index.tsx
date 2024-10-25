import { useEffect, useState } from "react";
import RepoCard from "../RepoCard";
import './styles.css'
import { GithubAPI } from "../../services/GithubAPI";
import { RepoDto } from "../../dto/RepoDto";
import Spinner from "../Spinner";
import ErrorIcon from "../../assets/xmark.svg";

export default function RepoList(props: { reposUrl: string }) {

    const [repos, setRepos] = useState<RepoDto[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    function fetchRepos() {
        setLoading(true);
        setError(false);

        GithubAPI
            .getInstance()
            .getRepositoryList(props.reposUrl)
            .then((data) => setRepos(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        if(!props.reposUrl) return;
        fetchRepos();
    }, [props.reposUrl])

    let componentToRender: React.JSX.Element;

    if(isLoading) {
        componentToRender = (
            <div className='repo-list-wrapper'>
                <Spinner width={50} height={50} borderWidth={5}/>
                <p>Carregando repositórios...</p>
            </div>
        )
    } else if (!isLoading && hasError) {
        componentToRender = (
            <div className='repo-list-wrapper repo-list-error'>
                <img src={ErrorIcon} alt="Erro" />
                <p>Erro ao carregar repositórios</p>
            </div>
        )
    } else {
        componentToRender = <>{repos.map(repo => <RepoCard key={repo.name} repo={repo} />)}</>
    }

    return (
        <ul className='repo-list'>
            {componentToRender}
        </ul>
    )
}