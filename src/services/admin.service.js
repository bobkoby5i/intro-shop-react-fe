import axios from 'axios';
import UserService from './user.service';


const API_URL   = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080') + "/api/admin";


class AdminService {

  constructor(){
    UserService.currentUser.subscribe(data => {
      this.headers = {
        'Content-Type':'application/json; charset=UTF-8',
        'authorization':"Bearer " + (data ? data.token: '')
      };
    });
  }

  updateUser(user) {
    return axios.put(`${API_URL}/user-update` , JSON.stringify(user), {headers: this.headers});
  }

  deleteUser(user) {
    return axios.delete(`${API_URL}/user-delete`, JSON.stringify(user), {headers:this.headers});
  }

  findAllUsers(){
    return axios.get(`${API_URL}/user-all`, {headers: this.headers});
  }
}

export default new AdminService();