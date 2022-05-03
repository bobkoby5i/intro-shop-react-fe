import React from "react";
import UserService from "../../services/user.service";
import "./RegisterPage.css";
import { User } from "../../models/user"

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        if (UserService.currentUserValue){
            this.props.history.push('/');
        }

        this.state = {
            user: new User('','',''),
            submited: false,
            loading: false,
            errorMessage: '',
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        const user = this.state.user;
        user[name] = value;
        this.setState({ user:user }) //can I use prev ?        
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({submited: true});
        const {user} = this.state;
        if(!(user.username && user.password && user.name)) {
            return;
        }
        this.setSatet({loading:true});
        UserService.register(user)
           .then(
                data => {
                   this.props.history.push("/login")
                }, 
                error => {
                    if(error.response.status === 409) {
                        this.setState({
                            errorMessage:"Username is not available. Already exists.",
                            loading:false
                        })
                    } else {
                        this.setState({
                            errorMessage:"Unexpected error occured",
                            loading:false
                        })                        
                    }
                }
            );
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
                   <form name="form" onSubmit={(e) => this.handleRegister(e)}>
                        <div className={'form-group' + (submitted && user.name ? 'has-error' : ''  )}>
                           <label htmlFor="name">Full Name</label>
                           <input type="text" className="form-control" name="name" value={user.name} onChange={(e)=>this.handleChange(e)}/>
                           {submitted && !user.name && 
                               <div className="alert alert-danger" role="alert">Full name required.</div>
                           }
                       </div>

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
                           <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button" diabled={loading}>Register</button>
                       </div>                 
                   </form>
               </div>
            </div>
        )
    }
}

export  {RegisterPage}