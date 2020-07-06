
//action-type 名称列表
import {
    CHANGE_DETAIL_NUMBER, CHANGE_DETAIL_PRICE ,
    CHANGE_MODAL_INFO
} from "../action/acitonType";

//redux执行操作使用的函数
import { getNewObject , isNumberValue } from "../action/actionFunc";

//初始值
const defaultState = {
    detailInfo:{},
}

export default ( state = defaultState , action ) => {

    const { type , value } = action

    switch( type ){

        //修改弹出层展示
        case CHANGE_MODAL_INFO :
            return getNewObject(state,{
                detailInfo: value
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

        default : return state;
    }

}