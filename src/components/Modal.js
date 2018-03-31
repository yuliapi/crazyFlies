import React, {Component} from 'react';
import styled from 'styled-components';

import {Transition} from 'react-transition-group'

import {connect} from "react-redux";


import Dialog from '../elements/ModalDialog'


const mapStateToProps = state => {
    return {
        modal: state.modal,
    };
};


const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .65);
`;

const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  overflow: auto;
  text-align: center;
  padding: 4px;
  cursor: pointer;

  &:after {
    vertical-align: middle;
    display: inline-block;
    height: 100%;
    margin-left: -.05em;
    content: '';
  }
`;

const duration = 500;
class Modal extends Component {
    render() {
        const contentSmart = {
            text: "You've killed them all ahead of time. Next time challenge yourself with more and faster flies.",
            head: 'Well done!!!'
        };
        const contentGeneral = {
            text: "It was a nice try!",
            head: "Sorry, time is out."
        };
        let content;
        this.props.type === 'aheadOfTime' ? content = contentSmart : content = contentGeneral;
        return (

        <Transition in={this.props.in}
                    timeout={duration}
                    mountOnEnter={true}
                    unmountOnExit={true}>

                <div className='modal'>
                    <Overlay/>
                    <Content>
                        <Dialog head={content.head} text={content.text} in={this.props.in}/>
                    </Content>
                </div>
        </Transition>
    )
    }
}

const ConnectedModal = connect(mapStateToProps, null)(Modal);
export default ConnectedModal;
