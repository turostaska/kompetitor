import axios from 'axios';

const AUTH_SIGN_UP_REST_API_URL = "http://localhost:8080/api/auth/sign-up";
const AUTH_LOGIN_REST_API_URL = "http://localhost:8080/api/auth/login";

class UserService {

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

const userService = new UserService();
export default userService;