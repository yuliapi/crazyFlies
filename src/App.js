import React, {Component} from 'react';
import {connect} from "react-redux";
import 'normalize.css';
import './App.css';
import styled from 'styled-components';

import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCrow } from '@fortawesome/free-solid-svg-icons'



import Home from "./components/Home";
import CrazyFlies from "./components/Crazy-flies";
import Shake from "./components/Shake-the-jar";

library.add(faCrow)
class App extends Component {
    render() {


        return (
            <HashRouter>
                <div>
                    <ul className="main-nav">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/crazy-flies">Crazy flies</NavLink></li>
                        <li><NavLink to="/shake-jar">Shake the Jar</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/crazy-flies" component={CrazyFlies}/>
                        <Route path="/shake-jar" component={Shake}/>
                    </div>
                </div>

            </HashRouter>
        );
    }
}

export default App


