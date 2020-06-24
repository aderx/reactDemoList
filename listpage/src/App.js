import React,{Component,Fragment} from 'react';
import './App.css';

//页头
import Header from './header/header'
//页面内容
import Content from './content/content'

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
