import React,{Component} from 'react'

/**
 * 分页组件
 * @author 张小富
 * @date 2020/7/1 10:21
 * @props pageNum 当前分页页码
 * @props pageSize 一页显示数据条数
 */
class Pagination extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalPage:Math.ceil( props.len / props.pageSize ) || 1
        }
    }

    componentDidUpdate() {
        const { len , pageSize , pageNum } = this.props
            ,{ totalPage } = this.state
            ,total = Math.ceil( len / pageSize );

        //当页面数据条数发生改变时，修改记录中的总数
        if(total !== totalPage && total >= 1){
            this.setState({
                totalPage : total
            },()=>{
                //当展示的数据条数为 0 ，并且不在第一页时，就前移一页。否则就直接跳转到第一页
                if( len - ( pageSize * ( pageNum - 1 ) ) === 0 && pageNum !== 1 ){
                    this.setPage(-1);
                }else{
                    this.changePage(1);
                }
            })
        }
    }

    render() {
        const { pageNum , pageSize } = this.props
            ,{ totalPage } = this.state;

        return (
            <div className="showPage">
                <div
                    className={`pageBtn ${ pageNum === 1 ? "ban" : "" }`}
                    onClick={this.setPage.bind( this , -1 )}
                >&lt;</div>
                <ul className="pageButton">
                    {[...new Array(totalPage)].map((item,index)=>{
                        return (<li
                            className={ pageNum === index+1 ? "choose" : ""}
                            key={index}
                            onClick={this.changePage.bind( this , index+1 )}
                        >{ index+1 }</li>)
                    })}
                </ul>
                <div
                    className={`pageBtn ${ pageNum === totalPage ? "ban" : ""}`}
                    onClick={this.setPage.bind( this , 1 )}
                >&gt;</div>
                <div className="pageBtn pageSelect">
                    <select
                        value={ pageSize }
                        onChange={this.changeSize}
                    >
                        <option value="5">5 条/页</option>
                        <option value="10">10 条/页</option>
                    </select>
                </div>
            </div>
        )
    }

    /**
     * 逐页切换按钮
     * @param num 页面切换位移量
     */
    setPage = num => {
        let { pageNum } = this.props;
        const { totalPage } = this.state;

        //第一页时禁止前进，最后一页禁止后退
        if((typeof num !== "number") || (num < 0 && pageNum === 1) || (num >= 0 && pageNum === totalPage)){
            return ;
        }

        pageNum += num;

        //修改页码
        this.changePage(pageNum);
    }

    /**
     * 切换当前分页
     * @param index 分页页码（1开始）
     */
    changePage = index => {
        this.props.setPageNum(index);
    }

    /**
     * 修改当前一页展示数据条数
     */
    changeSize = e => {
        const size = e.target.value
            ,{ pageSize } = this.props;

        //当页面条数不变时不执行操作
        if(size === pageSize){
            return ;
        }

        this.props.changeSize(size);
        //切换到分页的第一页
        this.changePage(1);
    }
}

export default Pagination;