
//action-type 名称列表
import {
    CHANGE_DETAIL_NUMBER, CHANGE_DETAIL_PRICE ,
    CHANGE_MODAL_INFO , CHANGE_MODAL_SHOW ,
    DELETE_MODAL_GOODS , SAVE_CHANGE_DETAIL ,
    GET_ORIGINALDATA , GET_USEDATA ,
    SET_FILTER , SET_PAGE
} from "./action/acitonType";

//redux执行操作使用的函数
import { getNewObject , getTotal , getUseData , isNumberValue } from "./action/actionFunc";

//初始值
const defaultState = {
    pageSize:5,
    pageNum:1,
    total:0,
    filter:"",
    showModal:false,
    detailInfo:{},
    originalData:[],
    useData:[]
}

export default ( state = defaultState , action ) => {

    const { type , value , num , size } = action

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

        //设置数据筛选条件
        case SET_FILTER :
            return getNewObject(state, {
                filter: value
            })

        //修改弹出层展示
        case CHANGE_MODAL_SHOW :
            return getNewObject(state,{
                showModal: !state.showModal
            })

        //修改弹出层展示
        case CHANGE_MODAL_INFO :
            return getNewObject(state,{
                detailInfo: value
            })

        //修改页面页码
        case SET_PAGE :
            return getNewObject(state,{
                pageNum: num,
                pageSize: size
            })

        //修改弹出层展示的商品数量
        case CHANGE_DETAIL_NUMBER :
            return isNumberValue(value) ? getNewObject(state,{
                detailInfo: Object.assign({},state.detailInfo,{
                    num:value
                })
            }) : state;

        //修改弹出层展示的商品价格
        case CHANGE_DETAIL_PRICE :
            return isNumberValue(value) ? getNewObject(state,{
                detailInfo: Object.assign({},state.detailInfo,{
                    price:value
                })
            }) : state;

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

        default : return state;
    }

}