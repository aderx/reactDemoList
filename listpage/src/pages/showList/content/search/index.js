import React,{Component} from 'react'

/**
 * 商品信息搜索组件
 * @author 张小富
 * @date 2020/7/1 10:20
 * @props filter 商品信息筛选关键词
 */
class Search extends Component{
    render() {
        const {filter} = this.props;
        return (
            <div className="search">
                <input
                    type="text"
                    placeholder="请输入商品名称"
                    value={filter}
                    onChange={this.changeValue}
                />
                <button
                    className="editBtn"
                    onClick={this.goSearch}
                >查找</button>
            </div>
        )
    }

    /**
     * 开始查找匹配的商品
     */
    goSearch = () => {
        this.props.search()
    }

    /**
     * 筛选关键词修改
     * @param e 事件的$event对象
     */
    changeValue = e =>{
        this.props.setFilter(e.target.value);
    }
}

export default Search;