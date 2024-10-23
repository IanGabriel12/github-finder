import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { UserDto } from '../dto/UserDto';

export class GithubAPI {
    public static instance: GithubAPI;

    private connection = axios.create({
        baseURL: 'https://api.github.com'
    });;

    private GithubAPI() {
    }

    public static getInstance(): GithubAPI {
        if(!this.instance) {
            this.instance = new GithubAPI();
        }
        return this.instance;
    }

    public getDataFromUser(username: string) {
        return this.connection.get(`/users/${username}`).then(response => response.data as UserDto);
    }
}