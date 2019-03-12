import React from 'react';
import './../App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ArticleList from "./articles/ArticleList";

import Header from "./shared/Header";
import Notifications from "./shared/Notifications";
import ArticleDetails from "./articles/ArticleDetails";
import Register from "./users/Register";
import Login from "./users/Login";
import Logout from "./users/Logout";
import NotFound from "./NotFound";
import Footer from "./shared/Footer";

const App = (props) => (
    <BrowserRouter>
        <>
            <div className="container">
                <Header/>
                <Notifications/>
                <Switch>
                    <Redirect exact={true} from='/' to='/articles'/>
                    <Route
                        path={["/articles",
                            "/articles/by_tag/:tag_slug", "/articles/by_category/:category_slug",
                            "/articles/by_author/:username"]}
                        exact component={ArticleList}/>
                    <Route exact={true} from='/articles/new' component={(props) => <h1>Not Implemented</h1>}/>
                    <Route path="/articles/:slug" component={ArticleDetails}/>

                    {/* Authentication routes */}
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/logout" component={Logout}/>


                    <Route component={NotFound}/>
                </Switch>
            </div>
            <Footer/>
        </>
    </BrowserRouter>
);

export default App;
