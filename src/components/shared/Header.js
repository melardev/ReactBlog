import React from 'react'
import {NavLink} from 'react-router-dom'
import {UserService} from "../../services/local/UsersService";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            is_authenticated: false,
            can_create_articles: false,
        };
    }

    componentWillMount() {
        UserService.subscribe(this.onUserUpdated.bind(this))
    }

    componentWillUnmount() {
        UserService.subscribe(this.onUserUpdated.bind(this));
    }

    onUserUpdated(user) {
        this.setState({
            is_authenticated: user && !!user.username,
            can_create_articles: user && (user.isAdmin || user.isAuthor)
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">React Blog</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/" exact activeStyle={{color: 'white'}}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/articles"
                                         activeStyle={{color: 'white'}}>Articles</NavLink>
                            </li>
                            {this.state.can_create_articles && <li className="nav-item">
                                <NavLink className="nav-link" to="/articles/new"
                                         activeStyle={{color: 'white'}}>Create Article</NavLink>
                            </li>
                            }
                            {this.state.is_authenticated ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/profile"
                                                 activeStyle={{color: 'white'}}>Profile</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/logout"
                                                 activeStyle={{color: 'white'}}>Logout</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register"
                                                 activeStyle={{color: 'white'}}>Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login"
                                                 activeStyle={{color: 'white'}}>Login</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
}

export default Header;
