import { useEffect, useState } from "react";
import RepoCard from "../RepoCard";
import './styles.css'
import { GithubAPI } from "../../services/GithubAPI";
import { RepoDto } from "../../dto/RepoDto";

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
        componentToRender = <li>Carregando...</li>
    } else if (!isLoading && hasError) {
        componentToRender = <li>Erro ao carregar os repositórios</li>
    } else {
        componentToRender = <>{repos.map(repo => <RepoCard key={repo.name} repo={repo} />)}</>
    }

    return (
        <ul className='repo-list'>
            {componentToRender}
        </ul>
    )
}