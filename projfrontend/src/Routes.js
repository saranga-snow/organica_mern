import React from 'react';
import {Route,Switch,BrowserRouter as Router} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";

const Routes = () => {

    return(
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/signup" component={Signup}/>
                    <Route path="/signin" component={Signin}/>
                </Switch>
            </Router>

        </div>
    )
};

export default Routes;
