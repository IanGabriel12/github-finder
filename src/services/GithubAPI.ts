import axios from 'axios';
import { UserDto } from '../dto/UserDto';
import { RepoDto } from '../dto/RepoDto';
import { ProfileDto } from '../dto/ProfileDto';

export class GithubAPI {
    public static instance: GithubAPI;

    private connection = axios.create({
        baseURL: 'https://api.github.com'
    });;


    public static getInstance(): GithubAPI {
        if(!this.instance) {
            this.instance = new GithubAPI();
        }
        return this.instance;
    }

    public getDataFromUser(username: string) {
        return this.connection.get(`/users/${username}`).then(response => {
            const data = response.data as UserDto;
            data.starred_url = data.starred_url.replace('{/owner}{/repo}', '');
            data.following_url = data.following_url.replace('{/other_user}', '');
            return data;
        });
    }

    public getRepositoryList(url: string) {
        return this.connection.get(url).then(response => response.data as Array<RepoDto>);
    }

    public getProfilesList(url: string) {
        return this.connection.get(url).then(response => response.data as Array<ProfileDto>);
    }
}