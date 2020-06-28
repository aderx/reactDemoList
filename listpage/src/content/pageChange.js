import React,{Component} from 'react'

class PageChange extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNum : 1,//当前处于哪一页面
        }
    }

    render() {
        //根据页面数量生成对应数量的切换按钮
        let plist =[];
        for(let i=1;i<=this.props.total;i++){
            //若当前页面为正在展示的页面，则添加选中样式
            if(this.state.pageNum === i){
                plist.push(<li id="choose" key={i} onClick={this.changePage.bind(this,i)}>{i}</li>)
            }else{
                plist.push(<li key={i} onClick={this.changePage.bind(this,i)}>{i}</li>)
            }
        }
        return (
            <div className="showPage">
                <div
                    className={["pageBtn",this.state.pageNum===1 ? "ban":""].join(" ")}
                    onClick={this.setPgae.bind(this,-1)}
                >&lt;</div>
                <ul className="pageButton">
                    {plist}
                </ul>
                <div
                    className={["pageBtn",this.state.pageNum===this.props.total ? "ban":""].join(" ")}
                    onClick={this.setPgae.bind(this,1)}
                >&gt;</div>
                <div className="pageBtn pageSelect">
                    <select
                        ref={select=>{this.select=select}}
                        value={this.props.size}
                        onChange={this.changeSize.bind(this)}
                    >
                        <option value="5">5 条/页</option>
                        <option value="10">10 条/页</option>
                    </select>
                </div>
            </div>
        )
    }

    //上一页/下一页按钮
    setPgae(num){
        let pageNum = this.state.pageNum;
        //根据传递的参数的正负值，判断是上一页还是下一页功能
        //只有不是第一页时才可以点击上一页按钮
        if(num < 0 && pageNum !==1){
            //上一页
            pageNum--;
        }
        //只有不是最后一页时才可以点击下一页按钮
        if(num >=0 && pageNum !== this.props.total){
            //下一页
            pageNum++;
        }
        //实现组件样式更新
        this.setState({
            pageNum
        });
        //实现数据同步改变
        this.props.changePage(pageNum);
    }

    //直接点击页数切换
    changePage(i){
        //先修改组件内数据以实现组件样式变更
        if(i!==this.state.pageNum){
            this.setState({
                pageNum:i
            })
        }
        //后调用父级方法，实现数据同步变更
        this.props.changePage(i);
    }

    //修改页面数据条数
    changeSize(){
        //调用父级方法，实现数据同步改变
        this.props.changeSize(this.select.value);
        //调用子级方法，切换到第一页
        this.changePage(1);
    }
}

export default PageChange;