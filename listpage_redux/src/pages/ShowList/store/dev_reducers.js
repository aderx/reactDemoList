
import { combineReducers } from "redux";

import editDetail from './reducer/editDetail'
import getAndEdItData from "./reducer/getAndEdItData";
import setValue from "./reducer/setValue";

export default combineReducers({
    editDetail,
    getAndEdItData,
    setValue
})