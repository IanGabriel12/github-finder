import './styles.css'
import GitHubIcon from '../../assets/github.svg';
import { RepoDto } from '../../dto/RepoDto';

export default function RepoCard (props: { repo: RepoDto}) {
    return (
        <li className='repo-card'>
            <a href={props.repo.html_url}>
            <div className='repo-card-body'>
                <h3>{props.repo.name}</h3>
                <p>{props.repo.description}</p>
            </div>
            <div className='repo-card-info'>
                <img src={GitHubIcon} alt="React"/>
                <span>Ver no github</span>
            </div>
            </a>
        </li>
    )
}