import React,{Component} from 'react'

class Header extends Component{
    render() {
        return (
            <div className="header">
                <h1>{this.props.title ? this.props.title : Header}</h1>
            </div>
        )
    }
}

export default Header;