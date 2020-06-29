import React,{Component} from 'react'

class PageChange extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalPage:Math.ceil(props.len/props.pageSize) || 1
        }
        this.setPage = this.setPage.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentDidUpdate() {
        const total = Math.ceil(this.props.len/this.props.pageSize);
        if(total !== this.state.totalPage && total >=1){
            this.setState({
                totalPage:total
            })
        }
    }

    render() {
        const {pageNum,pageSize} = this.props,{totalPage} = this.state;
        return (
            <div className="showPage">
                <div
                    className={`pageBtn ${pageNum===1 ? "ban":""}`}
                    onClick={this.setPage.bind(this,-1)}
                >&lt;</div>
                <ul className="pageButton">
                    {[...new Array(totalPage)].map((item,index)=>{
                        return (<li
                            className={pageNum === index+1 ? "choose":""}
                            key={index}
                            onClick={this.changePage.bind(this,index)}
                        >{index+1}</li>)
                    })}
                </ul>
                <div
                    className={`pageBtn ${pageNum===totalPage ? "ban":""}`}
                    onClick={this.setPage.bind(this,1)}
                >&gt;</div>
                <div className="pageBtn pageSelect">
                    <select
                        ref={select=>{this.select=select}}
                        value={pageSize}
                        onChange={this.changeSize}
                    >
                        <option value="5">5 条/页</option>
                        <option value="10">10 条/页</option>
                    </select>
                </div>
            </div>
        )
    }

    //上一页/下一页按钮
    setPage = num=>{
        let {pageNum} = this.props;
        //根据传递的参数的正负值，判断是上一页还是下一页功能
        //只有不是第一页时才可以点击上一页按钮
        if(num < 0 && pageNum !==1){
            //上一页
            pageNum--;
        }
        //只有不是最后一页时才可以点击下一页按钮
        if(num >=0 && pageNum !== this.state.totalPage){
            //下一页
            pageNum++;
        }
        //实现数据同步改变
        this.changePage(pageNum-1);
    }

    //分页切换
    changePage = (index) =>{
        this.props.setPageNum(index+1);
    }

    //修改页面数据条数
    changeSize = () => {
        //调用父级方法，实现数据同步改变
        this.props.changeSize(this.select.value);
        //切换到分页的第一页
        this.changePage(1);
    }
}

export default PageChange;