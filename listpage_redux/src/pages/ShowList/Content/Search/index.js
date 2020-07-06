import React, { Component } from "react";

import { Input , Button } from "antd";

import { connect } from 'react-redux'

import { GET_USEDATA , SET_FILTER } from "../../store/action/acitonType";

/**
 * 搜索组件
 * @author 张小富
 * @date 2020/7/2 16:02
 * @props
 */
class Search extends Component {
    render() {
        const { filterValue , actionSearch , changeFilter } = this.props;
        return (
            <>
                <Input
                    id = "searchInput"
                    placeholder = "请输入商品名称"
                    value = { filterValue }
                    onChange = { changeFilter }
                />
                <Button
                    type="primary"
                    onClick={ actionSearch }
                >查询</Button>
            </>
        )
    }
}

const stateToProps = (state) => {

    const { filter } = state.listPage;

    return {
        filterValue: filter
    }

}

const dispatchToProps = (dispatch) => {

    return {

        /**
         * 数据检索按钮点击事件
         */
        actionSearch(){
            dispatch({
                type: GET_USEDATA
            })
        },

        /**
         * 修改搜索过滤条件
         * @param e $event事件
         */
        changeFilter(e){
            dispatch({
                type: SET_FILTER,
                value: e.target.value
            })
        }

    }

}

export default connect(stateToProps,dispatchToProps)(Search);