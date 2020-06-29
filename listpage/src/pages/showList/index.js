import React,{Component,Fragment} from 'react';
import './index.css';

//页头
import Header from './header/index'
//页面内容
import Content from './content'

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
