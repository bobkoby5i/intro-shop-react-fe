import axios from 'axios';
import {BehaviorSubject} from rxjs;

const API_URL   = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080') + "/api/user";
const headers   = {"Content-Type":"application/json; charset=UTF-8"}

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class UserService {
    get currentUserValue(){
        return currentUserSubject.value;
    }

    get currentUser(){
        return this.currentUserSubject.asObservable();
    }

    async login(user) {
        //btoa Basic64 encoding use buf.toString('base64') instead
        const headers = {
            authorization: 'Basic ' + btoa(user.username + ":" + user.password)
        };

        const response = await axios.get(`${API_URL}/login`, { headers: headers });
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        currentUserSubject.next(response.data);
    }

    async logout() {
        const response = await axios.post(`${API_URL}/logout`, {});
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
    }

    register(user) {
        return axios.post(`${API_URL}/registration`,  JSON.stringify(user), {headers: headers});
    }


    findAllProducts(){
        return axios.get(`${API_URL}/products`, {headers: headers});
    }

    purchaseProduct(transaction){
        return axios.post(API_URL, "purchase", JSON.stringify(transaction),{headers: headers});
    }
}

export default new UserService();