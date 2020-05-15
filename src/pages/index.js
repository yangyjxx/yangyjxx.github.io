import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import List from "./list/index";
import Create from "./create/index";
import Me from "./me/index";
import Alllist from "./alllist/index";
import Edit from "./edit/index";
import Today from './today/index'
import Complete from  './complete/index'

class Index extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/pages" component={List}></Route>
                    <Route path="/pages/create" component={Create}></Route>
                    <Route path="/pages/me" component={Me}></Route>
                    <Route path="/pages/alllist" component={Alllist}></Route>
                    <Route path="/pages/edit/:id" component={Edit}></Route>
                    <Route path="/pages/today" component={Today}></Route>
                    <Route path="/pages/complete" component={Complete}></Route>
                </Switch>
            </div>
        );
    }
}

export default Index;