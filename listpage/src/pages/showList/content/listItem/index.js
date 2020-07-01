import React,{Component} from 'react'

/**
 * 商品列表组件
 * @author 张小富
 * @date 2020/7/1 10:18
 * @props name 商品名称
 * @props price 商品价格
 * @props num 商品数量
 */
class ListItem extends Component{
    render() {
        const { name , price , num } = this.props.data;
        return (
            <li>
                <div className="goodsInfo">
                    <p className="goodsName">{ name }</p>
                    <p className="goodsPrice">￥{Number( price ).toFixed(2)}</p>
                </div>
                <div className="goodsOption">
                    <button className="editBtn" onClick={this.getEditModal}>编辑</button>
                    <p>剩余 { num } 个</p>
                </div>
            </li>
        )
    }

    /**
     * 显示用于展示商品信息的弹出层
     */
    getEditModal = ()=>{
        const { modal , data } = this.props;
        modal( data , true );
    }
}

export default ListItem;