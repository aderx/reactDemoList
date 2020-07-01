import React,{Component} from 'react'

//数据检索功能组件
import Search from './search'
//分页管理功能组件
import Pagination from './pagination'
//商品列表功能组件
import ListItem from './listItem'
//弹出层功能组件
import Modal from './modal'


/**
 * 内容区域组件
 * @author 张小富
 * @date 2020/7/1 10:56
 * @props
 */
class Content extends Component{
    constructor(props) {
        super(props);
        this.state ={
            pageNum:1,//当前页码
            pageSize:5,//当前页面可展示得数据条数
            goodsList:[],//所有商品列表
            useData:[],//需要展示的商品列表
            goodsInfo:{},//弹出层展示的商品信息
            showModal:false,//是否显示弹出层
            filter:""//数据过滤的关键词
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
                },()=>{
                    this.filterData()
                })
            })
    }

    render(){
        const { useData , pageSize , pageNum , showModal , goodsInfo } = this.state;
        return (
            <div className="content">
                <Search
                    search={this.filterData}
                    setFilter={this.setFilter}
                />
                <ul className="showList">
                    {
                        useData.map((item,index)=> {
                            return (
                                <ListItem
                                    data={item}
                                    index={index}
                                    key={item.id}
                                    modal={this.modalOption}
                                />
                            )
                        })
                    }
                    <p className="endData">共检索出 { this.filterLength } 条数据，当前页面已展示 { useData.length } 条！</p>
                </ul>
                <Pagination
                    pageSize={pageSize}
                    pageNum={pageNum}
                    len={this.filterLength}
                    setPageNum={this.setPageNum}
                    changeSize={this.changeSize}
                />
                <Modal
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

    /**
     * 过滤数据，筛选出当前页面展示的数据
     */
    filterData = () => {
        const { pageNum , pageSize , goodsList , filter } = this.state
            ,beginNum = (pageNum-1) * pageSize
        ;
        this.filterLength = 0;
        this.setState({
            useData : goodsList.filter(item=>{
                if( !filter || filter === item.name ){
                    this.filterLength ++;
                    return true;
                }
                return false;
            }).slice( beginNum , beginNum+pageSize)
        });
    }

    /**
     * 设置数据检索关键词
     * @param value 数据检索关键词
     */
    setFilter = (value) => {
        this.setState({
            filter:value
        })
    }

    /**
     * 修改当前页面的页码
     * @param num 修改后的页面页码
     */
    setPageNum = (num) => {
        if(num !== this.state.pageNum){
            this.setState({
                pageNum:num
            },()=>{
                this.filterData();
            });
        }
    }

    /**
     * 修改一页显示多少条数据
     * @param size 修改后的数据条数
     */
    changeSize = (size)=> {
        this.setState({
            pageSize:Number(size)
        },()=>{
            this.filterData();
        })
    }

    /**
     * 弹窗的操作行为，打开或者关闭弹窗
     * @param data 弹窗所需要的商品信息
     * @param show 是否展示弹窗，true展示，false不展示
     */
    modalOption = (data,show) => {
        //此处若使用浅拷贝会导致useData的数据一起被修改，这是不期望的结果。因此使用深拷贝
        this.setState({
            goodsInfo:JSON.parse(JSON.stringify(data)),
            showModal:show
        })
    }

    /**
     * 修改商品信息
     * @param price 修改后的商品价格
     * @param num 需要修改的商品数量偏移量
     */
    goodsInfoEdit = (price,num) => {
        let { goodsInfo } = this.state;
        //当数据未改变时，不修改数据，减少渲染
        if(price === goodsInfo.price && num === goodsInfo.num){
            return ;
        }
        //判断价格是否已修改
        if(price){
            goodsInfo.price = price;
        }
        //判断商品数量是否已修改
        if(num){
            goodsInfo.num += num;
        }
        this.setState({
            goodsInfo
        })
    }

    /**
     * 保存已经修改的商品信息
     */
    editSave = () => {
        let { goodsInfo , goodsList } = this.state , { id , price , num } = goodsInfo;
        //找到需要修改的数据，修改其数据
        goodsList.some(item=>{
            if(item.id === id){
                item.price = price;
                item.num = num;
                return true;
            }
            return false;
        })
        alert("商品信息已保存！")
    }

    /**
     * 删除当前弹出层展示的这条数据
     */
    delItem = () => {
        const { goodsInfo , goodsList } = this.state;

        //过滤数组，排除需要删除的数据
        this.setState({
            goodsList:goodsList.filter(item=>{
                return item.id !== goodsInfo.id ;
            })
        },()=>{
            this.filterData();
            alert("已成功删除一条商品信息!");
        });
    }
}

export default Content;