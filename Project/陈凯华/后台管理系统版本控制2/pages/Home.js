import React from 'react';
import { NavLink } from 'react-router-dom'
import './header.css'
import falv from './falv.png';

const Header = () => {
    return (
        <header>
            <nav>
                <img className='houtai' src={falv}></img>
                <NavLink style={{marginLeft:'80px'}} activeClassName='active' exact to='/'>首页</NavLink>
                <NavLink activeClassName='active' to='/doc'>后台</NavLink>
                <NavLink activeClassName='active' to='/setup'>关于我们</NavLink>
            </nav>
            <p class="houtaip">法入人心后台管理系统</p>
        </header>
    )
}

const Setup = () => {
    return (
        <div>
            <div class="v1">
                <span class="t1">法入人心</span><br/>
                <span class="t2">FA RU REN XIN</span>
            </div>
            <div>
                <div class="v2">
                    <span>领先的互联网法律服务电商平台</span><br/>
                    <span class="t3">联系我们</span>
                </div>
                <div class="v3">
                    <span>官方网址：http://www.farurenxin.com</span><br/>
                    <span>官方邮箱：frrx1456@baidu.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><br/>
                    <span>合作电话：001-45673478&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
            <div class="v4">
                <span class="t4">用户协议</span><br/>
                <span class="t5">版权所有Copyright@2018 进阶的小腿 版权所有</span><br/>
                <span class="t5">Copyright  冀ICP备  123456号</span>
            </div>
        </div>
    )
}

const Login = (props) => {
    const login = ()=>{
        props.history.replace(props.location.state);
    }
    return (
        <div>
            <button onClick={login}>登录</button>
        </div>
    )
}

const Home = () => {
    return (
        
        <div className='title' style={{textAlign:'center'}}>
            <img src={falv} alt='falv' style={{width:'160px',height:'140px',display:'inline-block',marginTop:'280px',marginLeft:'20px'}}/> 
            <p style={{position:'relative',top:'-20px',fontSize:'40px'}}>法入人心后台管理系统</p>
        </div>
    )
}

export {Home};
export {Login};
export {Header};
export {Setup};
