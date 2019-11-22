import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import User from './Components/User/User';
import Auth from './Components/Auth/Auth';
import Profile from './Components/Profile/Profile';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import Records from './Components/Records/Records';
import Achievements from './Components/Achievements/Achievements';
import Match from './Components/Match/Match';
import {Switch, Route} from 'react-router-dom';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path={`/user/:id`} component={User} />
        <Route path={'/auth'} component={Auth} />
        <Route path={'/profile'} component={Profile} />
        <Route path={'/leaderboard'} component={Leaderboard} />
        <Route path={'/records'} component={Records} />
        <Route path={'/match/:id'} component={Match} />
        <Route path={'/achievements'} component={Achievements} />
    </Switch>
)