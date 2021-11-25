import axios from 'axios';

const AUTH_SIGN_UP_REST_API_URL = "http://localhost:8080/api/auth/sign-up";
const AUTH_LOGIN_REST_API_URL = "http://localhost:8080/api/auth/login";

class UserService {
    constructor() {
        this.succeededSignUp=false;
        this.succeededLogin=false;
        this.userToken="";
    }

    get succeededLogin(): boolean {
        return this.#_succeededLogin;
    }

    set succeededLogin(value: boolean) {
        this.#_succeededLogin = value;
    }
    set succeededSignUp(value: boolean) {
        this.#_succeededSignUp = value;
    }
    set userToken(value: string) {
        this.#_userToken = value;
    }
    get userToken(): string {
        return this.#_userToken;
    }
    get succeededSignUp(): boolean {
        return this.#_succeededSignUp;
    }

    #_userToken = "";
    #_succeededSignUp = false;
    #_succeededLogin = false;

    postSignup = (user) => {
        return axios.post(AUTH_SIGN_UP_REST_API_URL, {
            username: user.username,
            password: user.password
        }).catch(error => {
            alert(error.message);
            console.error('There was an error!', error);
        });
    }
    postLogin = (user) => {
            return axios.post(AUTH_LOGIN_REST_API_URL, {
                username: user.username,
                password: user.password,
                crossDomain: true
            }).catch(error => {
                alert(error.message);
                console.error('There was an error!', error);
            });
    };
}

const NewUserService = new UserService();
export default NewUserService;