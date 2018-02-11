import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

import Main from 'app/content/main.jsx';
import LoginForm from 'app/content/login/form.jsx';
import FileMain from 'app/content/file/main.jsx';
import LogMain from 'app/content/log/main.jsx';

import NotFound from 'app/content/layout/not-found.jsx';

ReactDOM.render((
    <Router history={browserHistory} >
        <Route path="/" component={Main} >
            <IndexRoute component={LoginForm} />
            <Route path="files" component={FileMain} />
            <Route path="logs" component={LogMain} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
), document.getElementById('app-main'));