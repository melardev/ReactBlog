import React from "react";
import {UserService} from "../../services/local/UsersService";
import {AxiosUsersService} from "../../services/remote/AxiosUsersService";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            message: '',
            classMessage: 'text-info',
            show_message: false,
        }
    }

    onSubmitForm(evt) {
        AxiosUsersService.create(this.state).then(res => {
            if (res.data && res.data.success) {
                this.setState({
                    show_message: true,
                    message: res.data.full_messages && res.data.full_messages.length > 1 ? res.data.full_messages[0] : 'I guess You registered successfully',
                    classMessage: 'text-success'
                });
            }
        }).catch(err => {
            this.setState({
                show_message: true,
                message: err,
                classMessage: 'text-danger'
            });
        });
    }

    onUserStateUpdate(user) {
        // TODO: redirect the user
    }

    componentWillMount() {
        UserService.subscribe(this.onUserStateUpdate)
    }

    componentWillUnmount() {
        UserService.unsubscribe(this.onUserStateUpdate);
    }

    onInputChange(key, evt) {
        this.setState({[key]: evt.target.value});
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        {this.state.show_message &&
                        <span className={this.state.classMessage}>
                                    {this.state.message}
                                </span>
                        }
                        <form className="form-horizontal">
                            <fieldset>
                                <div id="legend">
                                    <legend className="">Register</legend>
                                </div>

                                <div className="control-group">
                                    <label className="control-label" htmlFor="email">First name</label>
                                    <div className="controls">
                                        <input type="text" id="username" name="first_name"
                                               placeholder="first name"
                                               value={this.state.first_name}
                                               onChange={(evt) => this.onInputChange('first_name', evt)}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label" htmlFor="email">Last name</label>
                                    <div className="controls">
                                        <input type="text" id="username" name="last_name"
                                               value={this.state.last_name}
                                               onChange={(evt) => this.onInputChange('last_name', evt)}
                                               placeholder="last name"
                                               className="form-control"/>
                                    </div>
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
                                    <label className="control-label" htmlFor="email">E-mail</label>
                                    <div className="controls">
                                        <input type="text" id="email" name="email"
                                               placeholder="your email"
                                               value={this.state.email}
                                               onChange={(evt) => this.onInputChange('email', evt)}
                                               className="form-control"/>
                                    </div>
                                </div>

                                <div className="control-group">

                                    <label className="control-label" htmlFor="password">Password</label>
                                    <div className="controls">
                                        <input type="password" id="password"
                                               name="password" placeholder=""
                                               value={this.state.password}
                                               onChange={(evt) => this.onInputChange('password', evt)}
                                               className="form-control"/>
                                        <p className="help-block">the password you will be using</p>
                                    </div>
                                </div>

                                <div className="control-group">

                                    <label className="control-label" htmlFor="password_confirm">Password
                                        (Confirm)</label>
                                    <div className="controls">
                                        <input type="password" id="password_confirmation"
                                               name="password_confirm"
                                               placeholder=""
                                               value={this.state.password_confirmation}
                                               onChange={(evt) => this.onInputChange('password_confirmation', evt)}
                                               className="form-control"/>
                                        <p className="help-block">confirm the password you provided</p>
                                    </div>
                                </div>

                                <div className="control-group">
                                    <div className="controls">
                                        <button className="btn btn-success" type="button"
                                                onClick={this.onSubmitForm.bind(this)}>
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            );
    }
}

export default Register;