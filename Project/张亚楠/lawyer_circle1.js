'use strict'
const titbit = require('titbit'),
      pg = require('pg');

const app = new titbit({
    debug:true,
    https:true,
    key:'/usr/local/cert/www.responsibility.pro.key',
    cert:'/usr/local/cert/www.responsibility.pro.crt'
})
let pdb = new pg.Pool({
    database : 'law',
    user : 'liuxiaofan',
    password : '123456Lxf.',
    host : '127.0.0.1',
    max : 10
})
app.get('/lawyer_circle',async c=>{
    try{
	    let sql = 'SELECT * FROM lawyer_circle order by id asc'
	    let result = await pdb.query(sql)
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
        }
        //将数组对象中属性一样的值存入到另一个数组中
        // function getFields(input, field) {
        //     var output = [];
        //     for (var i=0; i < input.length ; ++i)
        //         output.push(input[i][field]);
        //     return output;}
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
app.post('/addlawyer_circle/:text',async c=>{
    try{
        //获取当前数据库最大id 以便插入
        let sql1 = 'select MAX(id) from lawyer_circle;'
        let rs = await pdb.query(sql1)
        let maxid = parseInt(JSON.stringify(rs.rows[0].max)) + 1
        //获取两个输入框内容：内容详情
        let text = c.param.text;      
        let textc = decodeURI(text)//对%进行解码
        console.log(text,textc)
        //获取当前日期和时间 2020-12-02 20:15:22  
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = ((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate())+ ' ';
        var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())+ ':';
        var s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds()); 
        var nowtime = Y+M+D+h+m+s;
        //插入语句
        let sql2 = `insert into lawyer_circle(id,name,imgsrc,date,article,fenxiang_num,pinglun_num,pinglun,zan_num) values (${maxid},'我是刘晓凡','https://i02piccdn.sogoucdn.com/643a1b77507356e7','${nowtime}','${textc}','${typec}',0,1,'可以去做伤残鉴定'，3)`
        console.log(sql2);
        let result = await pdb.query(sql2)
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
	    }
    c.send('添加咨询操作ok')
    }catch(err){
	c.send('添加咨询failed，错误信息为：' + err.message,400)
    }
})
app.run(2224);