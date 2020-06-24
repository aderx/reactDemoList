import React,{Component} from 'react'

//数据检索功能组件
import SearchData from './searchData'
//切换页面功能组件
import PageChange from './pageChange'
//商品列表功能组件
import GoodsItem from './goodsItem'
//商品编辑功能组件
import ShowModal from './showDetail'

class Content extends Component{
    constructor(props) {
        super(props);
        this.state ={
            maxShow:5,//每页展示数据数量
            nowShow:0,//当前页数据开始下标
            goodsList:[
                {
                    id:"G-1",
                    name:"商品",
                    price:50,
                    num:10
                },
                {
                    id:"G-2",
                    name:"商品1",
                    price:0,
                    num:100
                },
                {
                    id:"G-3",
                    name:"商品2",
                    price:69,
                    num:9
                },
                {
                    id:"G-4",
                    name:"商品3",
                    price:5,
                    num:5
                },
                {
                    id:"G-5",
                    name:"商品4",
                    price:100.03,
                    num:0
                },
                {
                    id:"G-1",
                    name:"商品",
                    price:50,
                    num:10
                },
                {
                    id:"G-2",
                    name:"商品1",
                    price:0,
                    num:100
                },
                {
                    id:"G-3",
                    name:"商品2",
                    price:69,
                    num:9
                },
                {
                    id:"G-4",
                    name:"商品3",
                    price:5,
                    num:5
                },
                {
                    id:"G-5",
                    name:"商品4",
                    price:100.03,
                    num:0
                },
                {
                    id:"G-1",
                    name:"商品",
                    price:50,
                    num:10
                },
                {
                    id:"G-2",
                    name:"商品1",
                    price:0,
                    num:100
                },
                {
                    id:"G-3",
                    name:"商品2",
                    price:69,
                    num:9
                },
                {
                    id:"G-4",
                    name:"商品3",
                    price:5,
                    num:5
                },
                {
                    id:"G-5",
                    name:"商品4",
                    price:100.03,
                    num:0
                },
            ],//所有商品
            useData:[],//需要展示的商品
            goodsInfo:{},//单一展示的商品信息
            showModal:false
        }
        //初始时页面需要展示的为所有商品
        this.state.useData = this.state.goodsList;
        this.index=0;//当前页面展示数据条数
        //THIS绑定
        this.changeSize = this.changeSize.bind(this);
        this.changePage = this.changePage.bind(this);
        this.searchList = this.searchList.bind(this);
        this.editGoods = this.editGoods.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    render(){
        //每次渲染时重新开始计算条数
        this.index=0;
        return (
            <div className="content">
                <SearchData
                    findData={this.searchList}
                />
                <ul className="showList">
                    {
                        this.state.useData.map((item,index)=> {
                            //从下标为 nowShow 的数据开始显示，最多显示 maxShow 条商品
                            if(this.state.nowShow <= index && index <= this.state.nowShow+this.state.maxShow-1){
                                //计算此次渲染共渲染出多少条数据
                                this.index++;
                                return (
                                    <GoodsItem
                                        data={item}
                                        index={index}
                                        key={item.id + "@" + index}
                                        edit={this.editGoods}
                                    />
                                )
                            }
                            return false
                        })
                    }
                    <p className="endData">共检索出 {this.state.useData.length} 条数据，当前页面已展示 {this.index} 条！</p>
                </ul>
                <PageChange
                    size={this.state.maxShow}
                    len={this.state.useData.length}
                    changePage={this.changePage}
                    changeSize={this.changeSize}
                />
                <ShowModal
                    show={this.state.showModal}
                    info={this.state.goodsInfo}
                    close={this.closeModal}
                />
            </div>
        )
    }

    //搜索并过滤数据
    searchList(filter){
        //将过滤后的数据替换展示的数据
        this.setState({
            useData:this.state.goodsList.filter(item=>{
                return (!filter || filter === item.name)
            })
        });
    }

    //修改当前是哪一页面
    changePage(pageNum){
        let computeShow = (pageNum-1)*this.state.maxShow;
        this.setState({
            nowShow:computeShow
        })
    }

    //修改当前一页内容总数
    changeSize(size){
        this.setState({
            maxShow:Number(size)
        })
    }

    //打开弹窗
    editGoods(item){
        this.setState({
            goodsInfo:item,
            showModal:true
        })
    }

    //关闭弹窗
    closeModal(){
        this.setState({
            goodsInfo:{},
            showModal:false
        })
    }
}

export default Content;