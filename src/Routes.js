import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import User from './Components/User/User';
import Auth from './Components/Auth/Auth';
import Profile from './Components/Profile/Profile';
import {Switch, Route} from 'react-router-dom';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path={`/user/:id`} component={User} />
        <Route path={'/auth'} component={Auth} />
        <Route path={'/profile'} component={Profile} />
    </Switch>
)