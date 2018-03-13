import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {hideModal, resetGame} from "../actions";

const mapStateToProps = state => {
    return {
        modal: state.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {

        hideModal: () => dispatch(hideModal()),

        resetGame: () => dispatch(resetGame())
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
  overflow-scrolling: touch;
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

const Dialog = styled.div`
  position: relative;
  outline: 0;
  width: 100%;
  background: white;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  max-width: 520px;
  cursor: default;
`;

const Header = styled.div`
  padding: 16px 8px 8px 8px
`;

const Body = styled.div`
  padding-bottom: 16px
`;

class Modal extends Component {
    handleClick = () => {
        this.props.hideModal();
    };
    componentWillUnmount() {
        this.props.resetGame()
    }

    render() {
        let paragraph;
        let head;
        if (this.props.modal.modalType === 'aheadOfTime') {
            head = <h2>Well done!!!</h2>;
            paragraph =
                <p>You've killed them all ahead of time. Next time challenge yourself with more and faster flies </p>
        } else {
            head = <h2>Sorry, time is out.</h2>;
            paragraph = <p>It was nice try!</p>;
        }
        return (
            <div className='modal'>
                <Overlay/>
                <Content>
                    <Dialog>
                        <Header>
                            <button onClick={this.handleClick}>close</button>
                            {head}
                        </Header>
                        <Body>
                        {paragraph}
                        </Body>
                    </Dialog>
                </Content>
            </div>
        );
    }

}

const ConnectedModal = connect(mapStateToProps, mapDispatchToProps)(Modal);
export default ConnectedModal;
