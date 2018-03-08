import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

const StyledTable = styled.table`
color: orange;
`;

class ScoreTable extends Component {
    render() {
        return (
            <table>
                <tr>
                    <th></th>
                    <th>Killed</th>
                    <th>Alive</th>
                    <th>Points</th>
                </tr>
                <tr>
                    <th>Slow</th>
                </tr>
                <tr>
                    <th>Normal</th>
                </tr>
                <tr>
                    <th>Fast</th>
                </tr>
            </table>
        )
    }
}

export default ScoreTable
