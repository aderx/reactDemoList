import React, { Component } from "react";

import 'antd/dist/antd.css'

import { connect } from 'react-redux'

import { GET_ORIGINALDATA , GET_USEDATA } from "../store/action/acitonType";

//搜索组件
import Search from "./Search";
//列表组件
import ShowList from './ShowList'
//分页组件
import PaginationFunc from './PaginationFunc'
//弹出层组件
import ModalLayout from './ModalLayout'


/**
 * 页面内容区域
 * @author 张小富
 * @date 2020/7/2 14:31
 */
class Content extends Component{
    constructor(props) {
        super(props);
        //获取原始数据
        fetch("./data/data.json")
            .then(res=>res.json())
            .then(data=>props.setData(data))
            .then(()=>props.getData())
    }

    render() {
        return (
            <>
                <Search />
                <PaginationFunc />
                <ShowList />
                <ModalLayout />
            </>
        )
    }
}

const dispatchToProps = (dispatch)=> {

    return {

        /**
         * 将获取到的原始数据添加进store中
         * @param data 获取到的原始数据
         */
        setData(data) {
            dispatch({
                type: GET_ORIGINALDATA,
                value: data
            })
        },

        /**
         * 获取筛选后的数据
         */
        getData() {
            dispatch({
                type: GET_USEDATA
            })
        }

    }

}

export default connect(null,dispatchToProps)(Content);