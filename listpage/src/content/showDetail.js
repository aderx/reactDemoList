import React,{Component} from 'react';

class ShowModal extends Component{

    render() {
        if(this.props.show){
            return (
                <div className="showModal" onClick={this.closeModal.bind(this)}>
                    <div className="showBack">
                        <p className="modalTitle">商品信息修改</p>
                        <div className="showInput">
                            <label>
                                <span>商品名称</span>
                                <input
                                    type="text"
                                    value={this.props.info.name}
                                    readOnly
                                />
                            </label>
                            <label>
                                <span>商品价格</span>
                                <input
                                    type="text" value={Number(this.props.info.price).toFixed(2)}
                                    onChange={this.changePrice.bind(this)}
                                    ref={input=>{this.inputPrice = input}}
                                />
                            </label>
                            <div id="getNum">
                                <span>商品数量</span>
                                <button onClick={this.changeNum.bind(this,-1)}>-</button>
                                <input type="text"  value={this.props.info.num} readOnly/>
                                <button onClick={this.changeNum.bind(this,1)}>+</button>
                            </div>
                        </div>
                        <div className="showOption">
                            <button className="editBtn" onClick={this.saveEdit.bind(this)}>保存修改</button>
                            <button className="editBtn delBtn" onClick={this.delInfo.bind(this)}>删除</button>
                        </div>

                    </div>
                </div>
            )
        }else{
            return "";
        }
    }

    //关闭弹窗
    closeModal(e){
        if(e.target.className === "showModal"){
            this.props.close({},false);
        }
    }

    //修改商品价格信息
    changePrice(){
        this.props.infoEdit(this.inputPrice.value);
    }

    //修改商品数量，根据传递参数的正负判断是加还是减（>0为加，否则为减）
    changeNum(op){
        this.props.infoEdit(null,op);
    }

    //保存修改的数据到原数组
    saveEdit(){
        this.props.save();
        this.props.close({},false);
    }

    //删除当前这条信息
    delInfo(){
        if(window.confirm("确定要删除这条商品信息吗？")){
            this.props.del();
            this.props.close({},false);
        }
    }
}

export default ShowModal;