import axios from 'axios';
import {BehaviorSubject} from rxjs;

const API_URL   = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080') + "/api/user";
const headers   = {"Content-Type":"application/json; charset=UTF-8"}

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class UserService {
    get currentuserValue(){
        return currentUserSubject.value;
    }

    get currentUser(){
        return this.currentUserSubject.asObservable();
    }

    login(user) {
        //btoa Basic64 encoding use buf.toString('base64') instead
        const headers = {
            authorization: 'Basic ' + btoa(user.username + ":" + user.password)
        };

        return axios.get(`${API_URL}/login`, {headers: headers} )
            .then(response => {
                localStorage.setItem('currentUser', JSON.stringify(response.data));
                currentUserSubject.next(response.data)
            });
    }

    logout() {
        return axios.post(`${API_URL}/logout`, {})
            .then(response => {
                localStorage.removeItem('currentUser');
                currentUserSubject.next(null);
            })
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