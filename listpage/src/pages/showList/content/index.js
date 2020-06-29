import React,{Component} from 'react'

//数据检索功能组件
import SearchData from './search'
//切换页面功能组件
import PageChange from './pagination'
//商品列表功能组件
import GoodsItem from './listItem'
//商品编辑功能组件
import ShowModal from './modal'

class Content extends Component{
    constructor(props) {
        super(props);
        this.state ={
            pageNum:1,
            pageSize:5,
            goodsList:[],//所有商品
            useData:[],//需要展示的商品
            goodsInfo:{},//弹窗需要展示的商品信息
            showModal:false,//是否显示弹窗
            filter:""
        }
        this.filterLength = 0;//filter过滤后的数据条数
        //引入数据文件
        fetch("../data/data.json")
            .then(data=>{
                return data.json();
            })
            .then(data=>{
                this.setState({
                    goodsList:data
                })
                this.filterData(data)
            })
    }

    render(){
        const {useData,pageSize,pageNum,showModal,goodsInfo} = this.state;
        return (
            <div className="content">
                <SearchData
                    search={this.filterData}
                />
                <ul className="showList">
                    {
                        useData.map((item,index)=> {
                            return (
                                <GoodsItem
                                    data={item}
                                    index={index}
                                    key={item.id + "@" + index}
                                    modal={this.modalOption}
                                />
                            )
                        })
                    }
                    <p className="endData">共检索出 {this.filterLength} 条数据，当前页面已展示 {useData.length} 条！</p>
                </ul>
                <PageChange
                    pageSize={pageSize}
                    pageNum={pageNum}
                    len={this.filterLength}
                    setPageNum={this.setPageNum}
                    changeSize={this.changeSize}
                    onRef={this.onRef}
                />
                <ShowModal
                    show={showModal}
                    info={goodsInfo}
                    close={this.modalOption}
                    infoEdit={this.goodsInfoEdit}
                    save={this.editSave}
                    del={this.delItem}
                />
            </div>
        )
    }

    //过滤并筛选出当前分页数据
    filterData = (data,fil) => {
        const {pageNum,pageSize,goodsList,filter} = this.state,
            beginNum = (pageNum-1)*pageSize
            ,uData = data ? data : goodsList
        ;
        //判断是否存在过滤条件。
        //若存在则使用其，并且拷贝一份到state内，若不存在则使用state内的过滤条件
        let uFilter = "";
        if(fil || fil === ""){
            uFilter = fil;
            this.setState({
                filter:fil
            })
        }else{
            uFilter = filter
        }
        //进行第一遍数据过滤（关键词过滤）
        let nData = uData.filter(item=>{
            return (!uFilter || uFilter === item.name)
        });
        //用于获取第一次筛选后的数据总条数
        this.filterLength = nData.length;
        this.setState({
            useData:nData.slice(beginNum,beginNum+pageSize)
        },()=>{
            const {useData,pageNum} = this.state;
            //若当前页分页没有数据时，并且分页不处于第一页时，调用子组件“前一页”方法，并修改总分页数
            if(useData.length === 0 && pageNum !== 1){
                this.child.setPage(-1);
            }
        });
    }

    //修改当前分页地址
    setPageNum = (page) => {
        if(page !== this.state.pageNum){
            this.setState({
                pageNum:page
            },()=>{
                this.filterData();
            });
        }
    }

    //修改当前一页内容可以显示的条数
    changeSize = (size)=> {
        this.setState({
            pageSize:Number(size)
        },()=>{
            this.filterData();
        })
    }

    //弹窗操作
    modalOption = (item,show) => {
        //提取要展示的数据时使用深拷贝，目的是分离修改和保存操作
        //此处若使用浅拷贝会导致useData的数据一起被修改，这不是需要的
        //当修改时只修改提取出的数据，当保存时才修改原数据
        this.setState({
            goodsInfo:JSON.parse(JSON.stringify(item)),
            showModal:show
        })
    }

    //商品信息预修改、
    goodsInfoEdit = (price,num) => {
        let {goodsInfo} = this.state;
        //判断价格是否已修改
        if(price){
            goodsInfo.price=price;
        }
        //判断商品数量是否已修改，若已修改则按照大于0则＋1，否则-1
        if(num){
            if(num>0){
                goodsInfo.num++;
            }else{
                goodsInfo.num--;
            }
        }

        this.setState({
            goodsInfo
        })
    }

    //保存商品信息
    editSave = () => {
        let {goodsInfo,goodsList}=this.state;
        //找到需要修改的数据，修改其数据
        goodsList.some(item=>{
            if(item.id === goodsInfo.id){
                item.price =goodsInfo.price;
                item.num = goodsInfo.num;
                return true;
            }
            return false;
        })
        alert("商品信息已保存！")
    }

    //删除一条商品
    delItem = () => {
        const {goodsInfo,goodsList} = this.state;
        let nData=[];
        nData = goodsList.filter(item=>{
            return item.id !== goodsInfo.id ;
        })
        //过滤数组，将需要删除的过滤出去
        //修改原列表。避免查找渲染等情况下被删除数据再出现
        this.setState({
            goodsList:nData
        },()=>{
            this.filterData();
        });
        alert("已成功删除一条商品信息!")
    }

    onRef = (ref) => {
        this.child = ref;
    }
}

export default Content;