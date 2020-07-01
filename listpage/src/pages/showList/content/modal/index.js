import React,{Component} from 'react';

/**
 * 弹出层组件，用于展示并修改商品信息
 * @author 张小富
 * @date 2020/7/1 10:18
 * @props show 是否展示弹出层
 * @props info 展示的商品信息
 */
class Modal extends Component{
    render() {
        const { show , info } = this.props , { name , price , num } = info;
        return (
            <div
                className={show ? "showModal" : "hideModal"}
                onClick={this.closeModal}
            >
                <div className="showBack">
                    <p className="modalTitle">商品信息修改</p>
                    <div className="showInput">
                        <label>
                            <span>商品名称</span>
                            <input
                                type="text"
                                value={ name || "" }
                                readOnly
                            />
                        </label>
                        <label>
                            <span>商品价格</span>
                            <input
                                type="text"
                                value={Number( price || 0 ).toFixed(2)}
                                onChange={this.changePrice}
                            />
                        </label>
                        <div id="getNum">
                            <span>商品数量</span>
                            <button
                                onClick={this.changeNum.bind(this,-1)}
                            >-</button>
                            <input
                                type="text"
                                value={ num || 0 }
                                readOnly
                            />
                            <button
                                onClick={this.changeNum.bind(this,1)}
                            >+</button>
                        </div>
                    </div>
                    <div className="showOption">
                        <button
                            className="editBtn"
                            onClick={this.saveEdit}
                        >保存修改</button>
                        <button
                            className="editBtn delBtn"
                            onClick={this.delInfo}
                        >删除</button>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 关闭当前弹出的窗口
     * @param e 事件的$event对象
     */
    closeModal = e => {
        if(e.target.className === "showModal"){
            this.props.close({},false);
        }
    }

    /**
     * 修改商品价格信息
     * @param e 事件的$event对象
     */
    changePrice = e =>{
        this.props.infoEdit(e.value);
    }

    /**
     * 修改商品数量
     * @param number 数量的加减量
     */
    changeNum = number => {
        this.props.infoEdit(null,number);
    }

    /**
     * 保存修改的数据到原始数组，并关闭弹窗
     */
    saveEdit = () => {
        const { save , close } = this.props;
        save();
        close({},false);
    }

    /**
     * 从原始的数据中删除当前展示的数据，并关闭弹窗
     */
    delInfo = () => {
        if(window.confirm("确定要删除这条商品信息吗？")){
            const { del , close } = this.props;
            del();
            close({},false);
        }
    }
}

export default Modal;