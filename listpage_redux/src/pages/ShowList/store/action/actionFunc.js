/**
 * 合并所给对象和state，生成一个新的对象
 * @param state 修改前的state数据
 * @param obj 需要合并的数据
 * @returns {Object} 合并后新的对象
 */
export function getNewObject(state , obj){
    return Object.assign({},state,obj)
}

/**
 * 获取数据过滤后的数据
 * @param state 修改前的state数据
 * @returns {Array} 筛选后的数据
 */
export function getTotal(state){
    const { originalData , filter } = state;
    return originalData
        .filter(item=>(filter === "" || filter === item.name))
}

/**
 * 获取当前页面展示的数据
 * @param state 修改前的state数据
 * @returns {Array} 处理后得到的useData
 */
export function getUseData(state){
    const { pageSize , pageNum } = state ,
        startIndex = ( pageNum - 1 ) * pageSize;
    return getTotal(state)
        .slice( startIndex , startIndex + pageSize );
}

/**
 * 判断给定的数据是不是数字
 * @param value 需要判断的数据
 * @returns {boolean} 判断结果
 */
export function isNumberValue(value){
    const reg = /^-?\d*(\.\d*)?$/;
    return (!isNaN(value) && reg.test(value)) || value === '' || value === '-';
}