import React from "react";
import {HashRouter, Switch, Route} from 'react-router-dom';
import Register from './register/index';
import Login from './login/index';
import List from './pages/index';


class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/pages" component={List}></Route>
                </Switch>
            </HashRouter>
        )
    }
}

export default App
