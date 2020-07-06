
//action-type 名称列表
import {
    CHANGE_MODAL_SHOW,
    DELETE_MODAL_GOODS,
    GET_ORIGINALDATA,
    GET_USEDATA,
    SAVE_CHANGE_DETAIL
} from "../action/acitonType";

//redux执行操作使用的函数
import { getNewObject , getTotal , getUseData } from "../action/actionFunc";

//初始值
const defaultState = {
    total:0,
    showModal:false,
    originalData:[],
    useData:[]
}

export default ( state = defaultState , action ) => {

    const { type , value } = action

    switch( type ){

        //添加原始数据
        case GET_ORIGINALDATA :
            return getNewObject(state,{
                originalData: value
            })

        //获取筛选后的当前页数据
        case GET_USEDATA :
            return getNewObject(state,{
                total:getTotal(state).length,
                useData: getUseData(state)
            })

        //保存修改后的数据
        case SAVE_CHANGE_DETAIL :
            return getNewObject(state,{
                originalData: state.originalData.map(item=>{
                    if(item.id === value){
                        const { price , num } = state.detailInfo;
                        item.price = price;
                        item.num = num;
                    }
                    return item;
                }),
                showModal: false
            })

        //删除当前这条数据
        case DELETE_MODAL_GOODS :
            return getNewObject(state,{
                originalData: state.originalData.filter(item=>item.id!==value),
                showModal: false
            })

        //修改弹出层展示
        case CHANGE_MODAL_SHOW :
            return getNewObject(state,{
                showModal: !state.showModal
            })

        default : return state;
    }

}