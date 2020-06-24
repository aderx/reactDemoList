import React,{Component} from 'react'

import PropTypes from 'prop-types'

class Header extends Component{

    render() {
        return (
            <div className="header">
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

Header.propTypes = {
    title:PropTypes.string
}

Header.defaultProps = {
    title:"Header"
}

export default Header;