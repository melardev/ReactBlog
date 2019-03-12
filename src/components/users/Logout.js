import React from 'react';
import {NavLink} from "react-router-dom";
import {UserService} from "../../services/local/UsersService";

class Logout extends React.Component {

    componentWillMount() {
        UserService.clearSession();
    }

    render() {
        return (
            <div className="well text-center">
                <h1>
                    Logged out successfully
                </h1>
                <NavLink to="/">Home</NavLink>
            </div>
        );
    }
}

export default Logout;