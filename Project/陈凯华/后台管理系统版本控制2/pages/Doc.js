import React, { Component } from 'react'
import {NavLink, Redirect,withRouter, Switch} from 'react-router-dom'
import { RouteWithSubRoutes } from '../App';
import {  Table } from 'antd';
import './doc.css';
import './core1.css';

//律师信息
class Core1 extends  Component{
  constructor(){
    super();
    //声明状态
    this.state={
      lawyer:[],
    }
  }
  componentDidMount(){
    fetch('https://www.responsibility.pro:2347/lawyer')
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        this.setState({lawyer:res})
    })
  }
  render(){
    const columns = [
      {
        title:'id',
        dataIndex:'id'
      },
      {
        title: '名字',
        dataIndex: 'name',
        
      },
      {
        title: '居住地',
        dataIndex: 'homeland',
      },
      {
        title: '工作室',
        dataIndex: 'workspace',
      },
      {
        title:'执业时间',
        dataIndex:'worktime'
      },
      {
        title: '解答次数',
        dataIndex: 'answerrate',
      },
      {
        title:'好评率',
        dataIndex:'praiserate'
      },
      {
        title:'注销操作',
        dataIndex:'id',
        render: (record) => <button class = "btnstyle btn2" onClick={
          ()=>fetch('https://www.responsibility.pro:2347/dellawyer/' + {record}.record).then(this.props.history.go(0))} 
          >注销</button>
        // render: c => <button>增加</button>,
      },
    ];
    return (
        <div id="box">
            <Table id="customers"  dataSource={this.state.id} columns={columns} dataSource={this.state.lawyer} />
        </div>
    );
  }
}
//用户信息
class Core2 extends  Component{
    constructor(){
      super();
      //声明状态
      this.state={
        user:[]
      }
  }
  componentDidMount(){
    fetch('https://www.responsibility.pro:2347/users')
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        this.setState({user:res})
    })
  }
  render(){
    const columns = [
      {
        title:'id',
        dataIndex:'id'
      },
      {
        title:'likes',
        dataIndex:'likes'
      },
      {
        title: '名字',
        dataIndex: 'name',
        
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '电话号码',
        dataIndex: 'phone',
      },
      {
        title:'禁言操作',
        dataIndex:'id',
        render:(record)=>{
          return(
            <button id = "consult" class = "btnstyle btn1" onClick={()=>fetch('https://www.responsibility.pro:2347/updateusers/' + {record}.record)
            .then(this.props.history.go(0))} >
            禁言</button>
          )}
          // const arr=[{value:'取消禁言'}]
          // function a(number){
          //   fetch('https://www.responsibility.pro:2347/updateusers/' + number);
          // }
          // //获取likes
          // function b(number){
          //   fetch('https://www.responsibility.pro:2347/likes/' + number)
          //   .then(res=>res.json())
          //   .then(res=>{
          //     console.log('likes值为:'+parseInt(JSON.stringify(res)))
          //     if(parseInt(JSON.stringify(res)) == 1){
          //       arr[0].value = '禁言'
          //     }
          //     else if(parseInt(JSON.stringify(res)) == 0){
          //       arr[0].value = '取消禁言'
          //     }
          //   })
          //   // return likes
          // }
          
      },
      {
        title:'注销操作',
        dataIndex:'id',
        render: (record) => <button class = "btnstyle btn2" onClick={()=>fetch('https://www.responsibility.pro:2347/delusers/' + {record}.record)
        .then(this.props.history.go(0))}>注销</button>
      },
    ];
    return (
        <div id="box">
            <Table id="customers"  columns={columns} dataSource={this.state.user} />
        </div>
    );
  }

}
//用户咨询
class Core3 extends Component{
  constructor(){
    super();
    //声明状态
    this.state={
      user:[]
    }
}
  componentDidMount(){
    fetch('https://www.responsibility.pro:2347/consult')
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        this.setState({user:res})
    })
  }
  render(){
    const columns = [
      {
        title:'id',
        dataIndex:'id'
      },
      {
        title:'consult_id',
        dataIndex:'consult_id'
      },
      {
        title: '名字',
        dataIndex: 'name',
        
      },
      {
        title: '咨询时间',
        dataIndex: 'date',
      },
      {
        title: '咨询类型',
        dataIndex: 'type',
      },
      {
        title: '咨询内容',
        dataIndex: 'text',
      },
      {
        title:'删除操作',
        dataIndex:[{id:5}],
        // dataIndex:'consult_id',
        // dataIndex:'consult_id',
        render: (text,record) => <button class = "btnstyle btn2" onClick={()=>
          fetch('https://www.responsibility.pro:2347/delconsult/' 
          + {record}.record.id+ '/'+{record}.record.consult_id)
          .then(this.props.history.go(0))
        }>删除</button>
      },
    ];
    // 
    // .then(this.props.history.go(0))
    return (
        <div id="box">
            <Table id="customers"  columns={columns} dataSource={this.state.user} />
        </div>
    );
  }
}
//律师圈
class Core4 extends  Component{
  constructor(){
    super();
    //声明状态
    this.state={
      lawyer_circle:[],
    }
  }
  componentDidMount(){
    fetch('https://www.responsibility.pro:2347/lawyer_circle')
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        this.setState({lawyer_circle:res})
    })
  }
  render(){
    const columns = [
      {
        title:'id',
        dataIndex:'id'
      },
      {
        title: '律师名字',
        dataIndex: 'name',    
      },
      {
        title: '发布日期',
        dataIndex: 'date',
      },
      {
        title: '发布内容',
        dataIndex: 'article',
      },
      {
        title:'删除操作',
        dataIndex:'id',
        render: (record) => <button class = "btnstyle btn2" onClick={()=>fetch('https://www.responsibility.pro:2347/dellawyer_circle/' + {record}.record)
        .then(this.props.history.go(0))}>删除</button>
      },
    ];
    return (
        <div id="box">
            <Table id="customers" columns={columns} dataSource={this.state.lawyer_circle} />
        </div>
    );
  }
}
//法律法规
class Core5 extends  Component{
  constructor(){
    super();
      this.state={
        thing:[],
      }
  }
  componentDidMount(){
    fetch('https://www.responsibility.pro:2347/thing')
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        this.setState({thing:res})
    })
  }
  render(){
    const columns = [
      {
        title:'id',
        dataIndex:'id'
      },
      {
        title: '标题',
        dataIndex: 'title',
        
      },
      {
        title: '内容',
        dataIndex: 'content',
      },
      {
        title: '法院',
        dataIndex: 'court',
      },
      {
        title:'发布日期',
        dataIndex:'date',
      },
      {
        title:'删除操作',
        dataIndex:'id',
        render: (record) => <button class = "btnstyle btn2" onClick={()=>fetch('https://www.responsibility.pro:2347/delthing/' + {record}.record).then(this.props.history.go(0))}>删除</button>
      },
    ];
    return (
        <div id="box">
            <Table id="customers"   columns={columns} dataSource={this.state.thing} />
        </div>
    );
  }
}
//禁言用户
class Core6 extends  Component{
      constructor(){
        super();
        this.state={
          nosay:[],
        }
    }
    componentDidMount(){
      fetch('https://www.responsibility.pro:2347/nosay')
      .then(res=>res.json())
      .then(res=>{
          console.log(res);
          this.setState({nosay:res})
      })
    }
    render(){
      const columns = [
        {
          title:'id',
          dataIndex:'id'
        },
        {
          title:'likes',
          dataIndex:'likes'
        },
        {
          title: '名字',
          dataIndex: 'name',
          
        },
        {
            title:'年龄',
            dataIndex:'age'
        },
        {
            title:'电话号码',
            dataIndex:'phone'
        },
        {
          title:'取消禁言',
          dataIndex:'id',
          render:(record)=>{
            return(
              <button id = "consult" class = "btnstyle btn1" onClick={()=>fetch('https://www.responsibility.pro:2347/nosaybtn/' + {record}.record)
              .then(this.props.history.go(0))}>
              取消禁言</button>
            )}
        },
      ];
      return (
          <div id="box">
              <Table id="customers"  dataSource={this.state.id} columns={columns} dataSource={this.state.nosay} />
          </div>
      );
  }

}
//左侧二级路由条
const Doc = ({routes}) => {
    
    return (
        <div className='doc'>
            <div className='leftpage'>
              <ol>
                  <li style={{marginTop:'30px'}}><NavLink className='nlink' to='/doc/core1'>律师信息</NavLink></li>
                  <li><NavLink className='nlink' to='/doc/core2'>用户信息</NavLink></li>
                  <li><NavLink className='nlink' to='/doc/core3'>用户咨询</NavLink></li>
                  <li><NavLink className='nlink' to='/doc/core4'>律师圈</NavLink></li>
                  <li><NavLink className='nlink' to='/doc/core5'>法律案件</NavLink></li>
                  <li><NavLink className='nlink' to='/doc/core6'>禁言用户</NavLink></li>
              </ol>
              
            </div>
            <div className="content">
            <p>1234</p>
              <Switch>
                  {routes.map((route,i) => (
                      <RouteWithSubRoutes key={i} {...route} />
                  ))}
              </Switch>
              {/* <Redirect from='/doc' to='/doc/core1' /> */}
            </div>
            
        </div>
    )
}

export default withRouter(Doc);
export {Core1};
export {Core2};
export {Core3};
export {Core4};
export {Core5};
export {Core6};