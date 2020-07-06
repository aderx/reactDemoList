import React, { Component } from "react";

import { Pagination } from "antd";

import { connect } from 'react-redux'

import { GET_USEDATA , SET_PAGE } from "../../store/action/acitonType";

/**
 * 分页组件
 * @author 张小富
 * @date 2020/7/2 16:02
 * @props
 */
class PaginationFunc extends Component {
    render() {
        const { pageNum , pageSize , total , changePage } = this.props;
        return (
            <Pagination
                style={ {float:'right'} }
                showSizeChanger
                current={ pageNum }
                pageSize={ pageSize }
                pageSizeOptions={ ['5','10','15'] }
                total={ total }
                onChange={ changePage }
            />
        )
    }
}

const stateToProps = (state) => {

    const { pageSize , pageNum , total } = state.listPage;

    return {
        pageSize: pageSize,
        pageNum: pageNum,
        total: total
    }

}

const dispatchToProps = (dispatch) => {

    return {

        /**
         * 修改页面分页参数
         * @param num 当前页面页码
         * @param size 分页数据条数
         */
        changePage(num,size){
            //修改页面页码和展示数据条数
            dispatch({
                type: SET_PAGE,
                num,
                size
            })
            //更新页面展示数据
            dispatch({
                type: GET_USEDATA
            })
        }

    }

}

export default connect(stateToProps,dispatchToProps)(PaginationFunc);