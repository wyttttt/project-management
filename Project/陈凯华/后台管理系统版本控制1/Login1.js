import React from "react"; 
import './login.css'

function sure(){
    var inp1=document.getElementsByClassName('inp1')[0];
    var inp2=document.getElementsByClassName('inp2')[0];
    if(inp1.value==='root' && inp2.value==='123456'){
        alert('登录成功！');
        localStorage.setItem("user","root");
        window.location.href="http://localhost:3000/#/"
    }
    else{
        alert('用户名或密码错误！')
    }
}

const Login1=()=>{  
    return(
        <div className="box">
            <div className='center'>
                <div className='inp'>
                    <input className='inp1' type='text' placeholder='请输入用户名'></input><br/>
                    <input className='inp2' type='password' placeholder='请输入密码'></input><br/>
                    <button onClick={sure} className='but' type='submit'>确认</button>
                </div> 
            </div>
        </div>
    )
}    
export default Login1;