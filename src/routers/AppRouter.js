import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import NotFoundPage from '../components/NotFoundPage';
import HelpPage from '../components/HelpPage';
import Crypto from '../components/Crypto'

const AppRouter = () => (
        <BrowserRouter> 
            <Switch>
                <Route path="/" component={App} exact={true}/>
                <Route path="/crypto/:id" component={Crypto}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    
);

export default AppRouter;


