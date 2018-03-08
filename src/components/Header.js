import React, {Component} from 'react';
import JarControls from './Jar-controls';


class Header extends Component {
    render() {
        return (
            <div>
                <h2>Add flies</h2>
                < JarControls/>
            </div>
        )
    }
}

export default Header
