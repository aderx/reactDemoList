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
            totalPage:1,//总分页数
            goodsList:[],//所有商品
            useData:[],//需要展示的商品
            goodsInfo:{},//单一展示的商品信息
            showModal:false,//是否显示弹窗
        }
        this.index=0;//计算当前页面已经展示的数据条数
        //THIS绑定
        this.changeSize = this.changeSize.bind(this);
        this.changePage = this.changePage.bind(this);
        this.searchList = this.searchList.bind(this);
        this.modalOption = this.modalOption.bind(this);
        this.goodsInfoEdit = this.goodsInfoEdit.bind(this);
        this.editSave = this.editSave.bind(this);
        this.delItem = this.delItem.bind(this);
        //引入数据文件
        fetch("../data.json")
            .then(data=>{
                return data.json();
            })
            .then(data=>{
                this.setState({
                    goodsList:data,
                    useData:data,
                    totalPage:Math.ceil(data.length/this.state.maxShow)
                })
            })
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
                                //计算此次渲染共渲染出多少条数据，用于展示当前分页总数据条数
                                this.index++;
                                return (
                                    <GoodsItem
                                        data={item}
                                        index={index}
                                        key={item.id + "@" + index}
                                        modal={this.modalOption}
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
                    total={this.state.totalPage}
                    changePage={this.changePage}
                    changeSize={this.changeSize}
                    onRef={this.onRef.bind(this)}
                />
                <ShowModal
                    show={this.state.showModal}
                    info={this.state.goodsInfo}
                    close={this.modalOption}
                    infoEdit={this.goodsInfoEdit}
                    save={this.editSave}
                    del={this.delItem}
                />
            </div>
        )
    }

    //搜索并过滤数据
    searchList(filter){
        //将过滤后的数据替换展示的数据
        let nData = this.state.goodsList.filter(item=>{
            return (!filter || filter === item.name)
        })
        this.setState({
            useData:nData,
            totalPage:Math.ceil(nData.length/this.state.maxShow)
        });
    }

    //修改当前分页地址
    changePage(pageNum){
        let computeShow = (pageNum-1)*this.state.maxShow;
        this.setState({
            nowShow:computeShow
        })
    }

    //修改当前一页内容可以显示的条数
    changeSize(size){
        this.setState({
            maxShow:Number(size),
            totalPage:Math.ceil(this.state.useData.length/size)
        })
    }

    //弹窗操作
    modalOption(item,show){
        //提取要展示的数据时使用深拷贝，目的是分离修改和保存操作
        //当修改时只修改提取出的数据，当保存时才修改原数据
        this.setState({
            goodsInfo:JSON.parse(JSON.stringify(item)),
            showModal:show
        })
    }

    //商品信息预修改、
    goodsInfoEdit(price,num){
        let info = this.state.goodsInfo;
        //判断价格是否已修改
        if(price){
            info.price=price;
        }
        //判断商品数量是否已修改，若已修改则按照大于0则＋1，否则-1
        if(num){
            if(num>0){
                info.num++;
            }else{
                info.num--;
            }
        }

        this.setState({
            goodsInfo:info
        })
    }

    //保存商品信息
    editSave(){
        let info=this.state.goodsInfo;
        //找到需要修改的数据，修改其数据
        this.state.useData.forEach(item=>{
            if(item.id === info.id){
                item.price =info.price;
                item.num = info.num;
            }
        })
        alert("商品信息已保存！")
    }

    //删除一条商品
    delItem(){
        let info=this.state.goodsInfo,nData=[];
        nData = this.state.goodsList.filter(item=>{
            return item.id !== info.id ;
        })
        //过滤数组，将需要删除的过滤出去
        //修改原列表。避免查找渲染等情况下被删除数据再出现
        this.setState({
            goodsList:nData,
            useData:nData
        },()=>{
            //若当前页分页没有数据时，并且分页不处于第一页时，调用子组件“前一页”方法，并修改总分页数
            let total = this.state.totalPage;
            if(this.index === 0 && total !== 1){
                this.setPage(-1);
                total--;
                this.setState({
                    totalPage:total
                })
            }
        });
        alert("已成功删除一条商品信息!")
    }

    onRef(ref){
        this.setPage = ref;
    }
}

export default Content;