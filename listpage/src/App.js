import React from 'react';
import './App.css';

//页头
import Header from './header/header'

function App() {
  return (
    <div className="App">

      <div className="content">
        <div className="search">
          <input type="text" placeholder="请输入商品名称"/>
          <button className="editBtn">查找</button>
        </div>
        <div className="showList">
          <li>
            <div className="goodsInfo">
              <p className="goodsName">商品1</p>
              <p className="goodsPrice">￥20.00</p>
            </div>
            <div className="goodsOption">
              <button className="editBtn">编辑</button>
              <p>剩余 5 个</p>
            </div>
          </li>
        </div>
        <div className="showPage">
            <div className="pageBtn">&lt;</div>
          <ul className="pageButton">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
            <div className="pageBtn">&gt;</div>
        </div>
      </div>
    </div>
  );
}

export default App;
