import React,{Component} from 'react'

class SearchData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            filter:""
        }
    }
    render() {
        return (
            <div className="search">
                <input
                    type="text"
                    placeholder="请输入商品名称"
                    ref={input=>{this.input=input}}
                    value={this.state.filter}
                    onChange={this.changeValue.bind(this)}
                />
                <button
                    className="editBtn"
                    onClick={this.goSearch.bind(this)}
                >查找</button>
            </div>
        )
    }

    //查找按钮的事件
    goSearch(){
        this.props.findData(this.state.filter)
        this.setState({
            filter:""
        })
    }

    //输入框内容修改
    changeValue(e){
        this.setState({
            filter:this.input.value
        })
    }
}

export default SearchData;