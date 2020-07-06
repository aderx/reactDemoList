import React, { Component } from "react";

import { List , Button } from "antd";

import { connect } from 'react-redux';

import { CHANGE_MODAL_INFO , CHANGE_MODAL_SHOW } from "../../store/action/acitonType";

/**
 * 列表组件
 * @author 张小富
 * @date 2020/7/2 16:02
 * @props
 */
class ShowList extends Component {
    render() {
        const { uData , editModal } = this.props;
        return (
            <List
                className="listGround"
                bordered
                dataSource = { uData }
                renderItem = {
                    item => (
                        <List.Item>
                            <p>{ item.name }</p>
                            <p>￥{ item.price }</p>
                            <p>剩余{ item.num }个</p>
                            <Button
                                onClick={ () => editModal(item) }
                            >编辑</Button>
                        </List.Item>
                    )
                }
            />
        )
    }
}

const stateToProps = (state)=>{

    const { useData } = state.listPage;

    return {
        uData: useData
    }

}

const dispatchToProps = (dispatch)=>{

    return {

        /**
         * 编辑按钮点击事件
         * @param data 当前所在的这一条数据
         */
        editModal(data){

            //修改弹出层展示数据
            dispatch({
                type: CHANGE_MODAL_INFO,
                value: data
            })

            //修改是否展示弹出层
            dispatch({
                type: CHANGE_MODAL_SHOW
            })
        }

    }

}

export default connect(stateToProps,dispatchToProps)(ShowList)