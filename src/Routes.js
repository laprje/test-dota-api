import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard'
import {Switch, Route} from 'react-router-dom'

export default (
    <Switch>
        <Route exact path='/' component={Dashboard}/>
    </Switch>
)