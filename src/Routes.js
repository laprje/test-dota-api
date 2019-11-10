import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import User from './Components/User/User';
import {Switch, Route} from 'react-router-dom';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path={`/user/:id`} component={User} />
    </Switch>
)