
//action-type 名称列表
import {
    SET_FILTER, SET_PAGE
} from "../action/acitonType";

//redux执行操作使用的函数
import { getNewObject } from "../action/actionFunc";

//初始值
const defaultState = {
    pageSize:5,
    pageNum:1,
    filter:""
}

export default ( state = defaultState , action ) => {

    const { type , value , num , size } = action

    switch( type ){

        //设置数据筛选条件
        case SET_FILTER :
            return getNewObject(state, {
                filter: value
            })

        //修改页面页码
        case SET_PAGE :
            return getNewObject(state,{
                pageNum: num,
                pageSize: size
            })

        default : return state;
    }

}