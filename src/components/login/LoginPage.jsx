import React from "react";
import UserService from "../../services/user.service";
import {useNavigate} from 'react-router-dom';
//import { useNavigation } from '@react-navigation/native'; // TODO co to za rzonica ? 
import {User} from "../../models/user"

import './LoginPage.css';

class LoginPage1 extends React.Component {
    constructor(props){
        super(props);

        if (UserService.currentUserVale){
            //this.props.histry.push('/')
            this.props.navigation('/');
        }

        this.state = {
            user: new User('',''),
            errorMessage: '',
            submited: false,
            loading: false,
        }

    }

    handleChange(e) {
        const {name, value} = e.target;
        const user = this.state.user;
        user[name] = value;
        this.setState({ user:user }) //can I use prev ?
    }

    handleLogin(e) {
         e.preventDefault();
         console.log("Inside handleLogin")
         this.setState({submited: true});
         const {user} = this.state;
         if(!user.username && !user.password) {
             return;
         }
         this.setState({loading:true});
         UserService.login(user)
            .then(data => {
                    //this.props.history.push("/")
                    this.props.navigation('/');
                }, error => {
                    this.setState({
                        errorMessage:"Username or password is not valid.",
                        loading:false
                    })
            });
     }

     render(){
         const {user, submitted, loading, errorMessage } = this.state;
         return (
             <div className = "col-md-12">
                <div className="card card-container">
                    <img id="profile-id" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                    { errorMessage && 
                        <div className="alert alert-danger" role="alert">
                            <strong>Error!</strong> {errorMessage}
                        </div>
                    }
                    <form name="form" onSubmit={(e) => this.handleLogin(e)}>
                        <div className={'form-group' + (submitted && user.username ? 'has-error' : ''  )}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={user.username} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.username && 
                                <div className="alert alert-danger" role="alert">Username is required.</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && user.password ? 'has-error' : ''  )}>
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" name="password" value={user.password} onChange={(e)=>this.handleChange(e)}/>
                            {submitted && !user.password && 
                                <div className="alert alert-danger" role="alert">Password is required.</div>
                            }
                        </div>       
                        <div className="form-group">
                            <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button" disabled={loading}>Login</button>
                        </div>                 
                    </form>
                </div>
             </div>
         )
     }
}

// export { LoginPage }

// Wrap and export
const LoginPage = (props) => {
    //const navigation = useNavigation(); // TODO co to za roznica ? !
    const navigation = useNavigate();
  
    return <LoginPage1 {...props} navigation={navigation} />;
}


export {LoginPage}