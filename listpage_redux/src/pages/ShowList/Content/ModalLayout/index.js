import React, { Component } from "react";

import { Modal , Input , Button } from 'antd'

import { connect } from 'react-redux'

import {
    CHANGE_DETAIL_NUMBER , CHANGE_MODAL_SHOW ,
    CHANGE_DETAIL_PRICE , GET_USEDATA ,
    DELETE_MODAL_GOODS , SAVE_CHANGE_DETAIL
} from "../../store/action/acitonType";

class ModalLayout extends Component {
    render() {
        const { show , detailInfo , changePrice , changeNum , saveInfo , delInfo , closeModal } = this.props,
            { name , price , num , id } = detailInfo
        ;
        return (
            <>
                <Modal
                    title="商品详细信息"
                    visible={ show }
                    onCancel={ closeModal }
                    footer={(
                        <>
                            <Button
                                type="primary"
                                onClick={  () => saveInfo(id) }
                            >保存</Button>
                            <Button
                                type="primary"
                                danger
                                onClick={  () => delInfo(id) }
                            >删除</Button>
                        </>
                    )}
                >
                    <Input
                        className="modal_input"
                        value={ name }
                        readOnly
                    />
                    <Input
                        className="modal_input"
                        prefix="￥"
                        suffix="RMB"
                        value={ price }
                        onChange={ changePrice }
                    />
                    <Input
                        className="modal_input"
                        prefix="剩余"
                        suffix="个"
                        value={ num }
                        onChange={ changeNum }
                    />
                </Modal>
            </>
        )
    }
}

const stateToProps = (state) => {

    const { showModal , detailInfo } = state.listPage;

    return {
        show: showModal,
        detailInfo:detailInfo
    }

}

const dispatchToProps = (dispatch) => {

    return {

        /**
         * 修改页面的页码
         * @param e $event事件
         */
        changeNum:e=>{
            dispatch({
                type: CHANGE_DETAIL_NUMBER,
                value: e.target.value
            });
        },

        /**
         * 修改商品价格
         * @param e $event事件
         */
        changePrice:e=>{
            dispatch({
                type: CHANGE_DETAIL_PRICE,
                value: e.target.value
            });
        },

        /**
         * 保存当前修改后的数据
         * @param value 当前展示的商品的ID
         */
        saveInfo:(value)=>{
            //修改原始数组中的数据
            dispatch({
                type:SAVE_CHANGE_DETAIL,
                value
            })
            //重新生成页面展示的数据
            dispatch({
                type:GET_USEDATA
            })
        },

        /**
         * 删除当前展示的商品
         * @param value 当前展示的商品的ID
         */
        delInfo:(value)=>{
            //修改原始数组中的数据
            dispatch({
                type:DELETE_MODAL_GOODS,
                value
            })
            //重新生成页面展示的数据
            dispatch({
                type:GET_USEDATA
            })
        },

        /**
         * 关闭弹出层
         */
        closeModal(){
            dispatch({
                type:CHANGE_MODAL_SHOW
            })
        }

    }

}

export default connect(stateToProps,dispatchToProps)(ModalLayout);