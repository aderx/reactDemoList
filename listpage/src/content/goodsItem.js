import React,{Component} from 'react'

class GoodsItem extends Component{
    render() {
        return (
            <li>
                <div className="goodsInfo">
                    <p className="goodsName">{this.props.data.name}</p>
                    <p className="goodsPrice">￥{this.props.data.price.toFixed(2)}</p>
                </div>
                <div className="goodsOption">
                    <button className="editBtn" onClick={this.getEditModal.bind(this)}>编辑</button>
                    <p>剩余 {this.props.data.num} 个</p>
                </div>
            </li>
        )
    }

    getEditModal(){
        this.props.edit(this.props.data);
    }
}

export default GoodsItem;