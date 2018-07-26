import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components';
import { Link } from 'react-router-dom'

const StyledDiv = styled.div `
    @import url('https://fonts.googleapis.com/css?family=Karla');
    width: 75%;
    max-width: 740px;
    margin: 20px auto;
    font-family: 'Karla', sans-serif;
    font-size: 1.3em;
    line-height: 1.5em;
    & > p {
      margin-bottom: 20px;
    }
    & > p > span {
    text-transform: uppercase;
       font-size: 1.2em;
       font-weight: 800
 
    }
    & > ul {
       list-style-type: none; 
       margin:  0 0 20px 20px;
    }
    & > ul > li {
       padding: 5px;
       line-height: 1.3em;
       display: flex;
       align-items: center;
       
       & a {
          display: inline !important;
       }

       & svg {
          margin-right: 10px;
          &.completed {
             color: #4cca4c;
          }
          &.current {
             color: #f1ee31;
          }
          &.future {
             color: #f94316;
          } 
       }
    } 
`;

class Home extends Component {
    render() {
        return (
            <StyledDiv>
                <p><span>w</span>e are the team of two: me, IP, as Front-End Developer and Viktor the Magician standing for
                    architecture and back-end.</p>
                <p><span>o</span>ur project is <em>Jar of Memories</em> - a resource to collect and review good
                    memories and emotions.</p>
                <p><span>w</span>e don't want it to look like Facebook, Twitter or one more blog platform. Aslso we don't want it to
                    be dull. So just imagine the emotional moments you are keeping in - are butterflies, stars, pearls or
                    even <em>flies</em> in jar.</p>
                <p><span>h</span>ere are some bites - projects to play with design and animation:</p>
                <ul>
                    <li>
                        <FontAwesomeIcon icon="crow" size="lg" className='completed' />
                        put crazy flies into the jar, make them move inside and respect bounds, make them fast and slow, make them unorganized;
                    </li>
                    <li>
                        <FontAwesomeIcon icon="crow" size="lg" className='current'/>
                        shake the jar and give speed boost to lazy sleeping flies;
                    </li>
                    <li>
                        <FontAwesomeIcon icon="crow" size="lg" className='future'/>
                        jar carousel with synchronized description and time line;
                    </li>
                    <li>
                        <FontAwesomeIcon icon="crow" size="lg" className='future'/>
                        something next
                    </li>
                </ul>
                <p><span>i</span> believe, once they will become a parts of one.</p>

            </StyledDiv>
        );
    }
}

export default Home;