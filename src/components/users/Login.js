import React from "react";
import {UserService} from "../../services/local/UsersService";
import {AxiosUsersService} from "../../services/remote/AxiosUsersService";
import {NotificationService} from "../../services/local/NotificationService";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            show_message: false,
            classNameForMessage: '',
            userChangedCallback: this.onUserStateUpdate.bind(this)
        }
    }

    onUserStateUpdate(user) {
        // TODO: redirect the user
        console.log('Login::onUserStateUpdate()')
    }

    componentWillMount() {
        UserService.subscribe(this.state.userChangedCallback)
    }

    componentWillUnmount() {
        UserService.unsubscribe(this.state.userChangedCallback);
    }

    onSubmitForm(evt) {
        NotificationService.setIsLoading(false);
        AxiosUsersService.login(this.state).then(res => {
            if (res.data && res.data.success) {
                this.setState({
                    show_message: true,
                    message: res.data.full_messages && res.data.full_messages.length > 1 ? res.data.full_messages[0] : 'I guess You logged In successfully',
                    classMessage: 'text-success'
                });
                res.data.user.token = res.data.token;
                UserService.saveUser(res.data.user);
                NotificationService.setIsLoading(false);
                NotificationService.dispatch('Logging successfull');
                this.props.history.push('/');
            }
        }).catch(err => {
            NotificationService.dispatch(err.message);
            this.setState({
                show_message: true,
                message: err,
                classMessage: 'text-danger'
            });
        });
    }

    onInputChange(key, evt) {
        this.setState({[key]: evt.target.value});
    }

    render() {
        return (
            <div className="container col-lg-4">
                {this.state.show_message &&
                <span className={this.state.classNameForMessage}>
                                    {this.state.message}
                                </span>
                }
                <form className="form-horizontal">
                    <fieldset>
                        <div id="legend">
                            <legend className="">Login</legend>
                        </div>
                        <div className="control-group">
                            <label className="control-label" htmlFor="username">Username</label>
                            <div className="controls">
                                <input type="text" id="username" name="username"
                                       value={this.state.username}
                                       onChange={(evt) => this.onInputChange('username', evt)}
                                       placeholder="your username"
                                       className="form-control"/>
                            </div>
                        </div>

                        <div className="control-group">
                            <label className="control-label" htmlFor="password">Password</label>
                            <div className="controls">
                                <input type="password" id="password"
                                       name="password" placeholder="Your password"
                                       value={this.state.password}
                                       onChange={(evt) => this.onInputChange('password', evt)}
                                       className="form-control"/>
                                <p className="help-block">the password you will be using</p>
                            </div>
                        </div>

                        <div className="control-group col-lg-2">
                            <div className="controls">
                                <button className="btn btn-success text-center" type="button"
                                        onClick={this.onSubmitForm.bind(this)}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}


export default Login;
