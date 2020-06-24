import React,{Component} from 'react';

class ShowModal extends Component{
    constructor(props) {
        super(props);
    }

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
                                    type="text" value={this.props.info.price}
                                    onChange={this.changePrice.bind(this)}
                                    ref={input=>{this.inputPrice = input}}
                                />
                            </label>
                            <div id="getNum">
                                <span>商品数量</span>
                                <button>+</button>
                                <input type="text"  value={this.props.info.num} readOnly/>
                                <button>-</button>
                            </div>
                        </div>
                        <div className="showOption">
                            <button className="editBtn">保存修改</button>
                            <button className="editBtn delBtn">删除</button>
                        </div>

                    </div>
                </div>
            )
        }else{
            return "";
        }
    }

    closeModal(e){
        if(e.target.className === "showModal"){
            this.props.close()
        }
    }

    changePrice(){
        this.setState({
            price:Number(this.inputPrice.value)
        })
    }
}

export default ShowModal;