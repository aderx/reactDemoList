import React , { Component } from 'react';

import './index.css'

import Header from './Header';
import Content from "./Content";


/**
 * 页面主体
 * @author 张小富
 * @date 2020/7/2 14:29
 */
class ShowList extends Component {
  render() {
    return (
        <>
            <Header />
            <Content />
        </>
    )
  }
}

export default ShowList;
