import { BaseApiService } from "./BaseApiService.js";

export class AuthService extends BaseApiService {
    constructor(baseurl, sessionService){
        super(baseurl);
        this.sessionService = sessionService;
    }

    async login(user){
        let url = `${this.baseUrl}/users/login`;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        };
        let result = await this._internalFetchJson();
        this.sessionService.setAccessToken(result.accessToken);

        return result;
    }

    async register(user){
        let url = `${this.baseUrl}/users/register`;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        };
        let result = await this._internalFetchJson();
        this.sessionService.setAccessToken(result.accessToken);

        return result;
    }

    async logout(){
        let url = `${this.baseUrl}/users/logout`;
        let options = {
            method: 'GET',
            headers: {
                'X-Authorization': this.sessionService.getAccessToken()
            }
        };

        let result = await this._internalFetchJson();
        this.sessionService.removeAccessToken();

        return result;
    }

    isUserLoggedIn(){
        return this.sessionService.getAccessToken() !== undefined;
    }
}