import React, {Component} from 'react';
import 'normalize.css';
import './App.css';
import styled from 'styled-components';

import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import {library} from '@fortawesome/fontawesome-svg-core'
import {faCrow} from '@fortawesome/free-solid-svg-icons'

import Home from "./components/Home";
import CrazyFlies from "./components/Crazy-flies";
import Shake from "./components/Shake-the-jar";

library.add(faCrow);

const StyledDiv = styled.div`
   & ul {
      background-color: #111;
      padding: 0;
      border-bottom: 2px solid red;
   }
   
   & ul li {
      display: inline;
      list-style-type: none;
   }
   
   & ul li a {
      display: inline-block;
      color: #fff;
      font-size: 1.2em;
      font-weight: bold;
      padding: 10px 20px;
      text-decoration: none;
      
      &:hover {
        color: red;
      }
      
      &.active {
        background-color: red;
        &:hover {
           color: #111;
        }
      }
   }
`;

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <StyledDiv>
                        <ul className="main-nav">
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/crazy-flies">Crazy flies</NavLink></li>
                            <li><NavLink to="/shake-jar" className='link-disabled'>Shake the Jar</NavLink></li>
                        </ul>
                    </StyledDiv>
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


