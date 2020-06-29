import React,{Component,Fragment} from 'react';
import './App.css';

//页头
import Header from './pages/showList/header/index'
//页面内容
import Content from './pages/showList/content'

class App extends Component{
  render() {
      return (
          <Fragment>
              <Header/>
              <Content/>
          </Fragment>
      )
  }
}

export default App;
