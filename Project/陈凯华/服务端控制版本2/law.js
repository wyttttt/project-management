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
    user : 'chenkaihua',
    password : '123456Ckh.',
    host : '127.0.0.1',
    max : 10
})
//律师表以下 lawyer
//查所有人信息
app.get('/lawyer',async c=>{
    try{
	    let sql = 'SELECT * FROM lawyer order by id asc'
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
	    c.send('查询操作failed',400)
    }
})
//实现模糊查找，查某个人
app.get('/selectsomeone/:id',async c=>{
    try{
        let id = c.param.id;
        let idc = decodeURI(id)//对%进行解码
        let sql = `select * from lawyer where name like '%${idc}%'`;
        console.log(sql);
        let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//实现进入谁的详情页
app.get('/lawyer/:id',async c=>{
    try{
        let id = c.param.id;
        let sql = `select * from lawyer where id ='${id}'`;
        console.log(sql);
        let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//增
app.post('/addlawyer',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'insert into lawyer (name,imgsrc,homeland,workspace,thing1,thing2,thing3,thing4) values ($1,$2,$3,$4,$5,$6,$7,$8)'
	    let result = await pdb.query(sql,[data.name,data.imgsrc,data.homeland,data.workspace,data.thing1,data.thing2,data.thing3,data.thing4])
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
	    }
	c.send('增加操作ok')
    }catch(err){
	c.send('增加操作failed',400)
    }
})
//改
app.post('/updatelawyer',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'update lawyer set imgsrc = ($1) where name = ($2)'
	    let result = await pdb.query(sql,[data.imgsrc,data.name])
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
	    }
	c.send('修改操作ok')
    }catch(err){
	    c.send('修改操作failed',400)
    }
})
//关注律师
app.post('/updatelawyer1/:id',async c=>{
    try{
        let id = c.param.id;
        let sql = `update lawyer set likes = 0 where id = ${id}`;
        console.log(sql);
        let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//取关律师
app.post('/updatelawyer2/:id',async c=>{
    try{
        let id = c.param.id;
        let sql = `update lawyer set likes = 1 where id = ${id}`;
        console.log(sql);
        let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//查看关注的律师
app.get('/looklawyer',async c=>{
    try{
	    let sql = 'SELECT * FROM lawyer where likes = 0'
	    let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//删除律师
app.get('/dellawyer/:id',async c=>{
    try{
        let id = c.param.id
        let sql = `delete from lawyer where id = ${id}`
        console.log(sql)
	    await pdb.query(sql)
	c.send('删除ok')
    }catch(err){
	    c.send('删除操作failed' + err.message,400)
    }
})
//律师表以上 lawyer

//用户表以下 users
//显示所有用户
app.get('/users',async c=>{
    try{
	    let sql = 'SELECT * FROM users order by id DESC'
	    let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed',400)
    }
})
//注销用户
app.get('/delusers/:id',async c=>{
    try{    
        let id = c.param.id
        let sql1 = `delete from users where id = ${id}`
        // let sql2 = `delete from consult where id = ${id}`
        await pdb.query(sql1)
        // await pdb.query(sql2)
    }catch(err){
	    c.send('删除操作failed' + err.message,400)
    }
})
//用户表以上 users

//咨询区表以下 consult
//查所有咨询
app.get('/consult',async c=>{
    try{
        //根据id降序排列
	    let sql = 'SELECT * FROM consult order by id DESC,consult_id desc'
	    let result = await pdb.query(sql)
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
	    }
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed',400)
    }
})
//实现定位哪一个回复
app.get('/answer/:id/:consult_id',async c=>{
    try{
        let id = c.param.id;
        let consult_id = c.param.consult_id;
        let sql = `select * from consult where id =${id} and consult_id = ${consult_id}`;
        let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//查看每条咨询的评论
app.get('/comment/:id/:consult_id',async c=>{
    try{
        let id = c.param.id//前端穿过来的定位id
        let consult_id = c.param.consult_id;
	    let sql = `SELECT * FROM comment where id = ${id} and consult_id = ${consult_id} order by comment_id desc`
	    let result = await pdb.query(sql)
	    c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed',400)
    }
})
//发表评论回复
app.post('/comment_answer/:id/:consult_id/:text',async c=>{
    try{
        let id = c.param.id;//前端获取的哪一条咨询的id
        let consult_id = c.param.consult_id
        //获取当前数据库最大id 以便插入
        let sql1 = `select MAX(comment_id) from comment where id = ${id} and consult_id = ${consult_id}`
        let rs = await pdb.query(sql1)
        var maxid
        if(isNaN(parseInt(JSON.stringify(rs.rows[0].max)))){
            maxid = 0; 
        }else{
            maxid = parseInt(JSON.stringify(rs.rows[0].max)) + 1
        }
        //获取输入框内容：评论内容 
        let text = c.param.text;      
        let textc = decodeURI(text)//对文本内容text进行解码
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
        let sql2 = `insert into comment values (${maxid},${id},${consult_id},'陈凯华','https://i02piccdn.sogoucdn.com/643a1b77507356e7','${nowtime}','${textc}')`
        console.log(sql2);
        let result = await pdb.query(sql2)
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
	    }
    c.send('添加咨询评论操作ok')
    }catch(err){
	c.send('添加咨询评论failed，错误信息为：' + err.message,400)
    }
})
//发表文字咨询
app.post('/addconsult/:type/:text',async c=>{
    try{
        let like = await pdb.query('select likes from users where id = 5')
        if(parseInt(JSON.stringify(like.rows[0].likes)) == 1){
            //获取当前数据库最大id 以便插入
            let sql1 = 'select max(consult_id) from consult where id = 5;'
            let rs = await pdb.query(sql1)
            let maxid;
            if(isNaN(parseInt(JSON.stringify(rs.rows[0].max)))){
                maxid = 0;
            }
            else{
                maxid = parseInt(JSON.stringify(rs.rows[0].max)) + 1
            }   
            //获取两个输入框内容：案件类型，案件详情
            let type = c.param.type;
            let text = c.param.text;      
            let typec = decodeURI(type);
            let textc = decodeURI(text)//对%进行解码
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
            let sql2 = `insert into consult values (5,${maxid},'陈凯华','https://i02piccdn.sogoucdn.com/643a1b77507356e7','${nowtime}','${textc}','${typec}','/userimage/line.png')`
            console.log(sql2);
            await pdb.query(sql2)
        c.send('添加文字咨询操作ok')
        }
        else{
            c.send('用户已被禁言')
        }  
    }catch(err){
	    c.send('添加文字咨询failed，错误信息为：' + err.message,400)
    }
})
//发表图文咨询
app.post('/addimgconsult/:type/:text/:img',async c=>{
    try{
        let like = await pdb.query('select likes from users where id = 5')
        if(parseInt(JSON.stringify(like.rows[0].likes)) == 1){
            //获取当前数据库最大consult_id 以便插入
            let sql1 = 'select MAX(consult_id) from consult where id = 5;'
            let rs = await pdb.query(sql1)
            let maxid ;
            if(isNaN(parseInt(JSON.stringify(rs.rows[0].max))))
            {
                maxid = 0;
            }else{
                maxid = parseInt(JSON.stringify(rs.rows[0].max)) + 1
            }  
            //获取两个输入框内容：案件类型，案件详情
            let type = c.param.type;
            let text = c.param.text;
            let img =  c.param.img;    
            let typec = decodeURI(type);//对%进行解码
            let textc = decodeURI(text)
            // let imgc = decodeURI(img)
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
            let sql2 = `insert into consult values (5,${maxid},'陈凯华','https://i02piccdn.sogoucdn.com/643a1b77507356e7','${nowtime}','${textc}','${typec}','http://tmp/${img}')`
            console.log(sql2);
            await pdb.query(sql2)
        c.send('添加图文咨询操作ok')
        }else{
            c.send('用户已被禁言')
        }
        }catch(err){
        c.send('添加图文咨询failed，错误信息为：' + err.message,400)
        }
    })
//查看自己的发表
app.get('/myconsult',async c=>{
    try{
        //根据id降序排列
        let sql = 'SELECT * FROM consult where id = 5 order by consult_id desc'
        let result = await pdb.query(sql)
    c.send(JSON.stringify(result.rows))     
    }catch(err){
	    c.send('查询操作failed',400)
    }
})
//删除自己的咨询
app.get('/delmyconsult/:consult_id',async c=>{
    try{    
        let consult_id = c.param.consult_id
        let sql1 = `delete from consult where id = 5 and consult_id = ${consult_id}`
        let sql2 = `delete from comment where id = 5 and consult_id = ${consult_id}`
	    await pdb.query(sql1)
	    await pdb.query(sql2)
    }catch(err){
	    c.send('删除操作failed' + err.message,400)
    }
})
//管理员删除任意咨询
app.get('/delconsult/:id/:consult_id',async c=>{
    try{    
        let id = c.param.id
        let consult_id = c.param.consult_id
        let sql1 = `delete from consult where id = ${id} and consult_id = ${consult_id}`
        let sql2 = `delete from comment where id = ${id} and consult_id = ${consult_id}`
	    await pdb.query(sql1)
	    await pdb.query(sql2)
    }catch(err){
	    c.send('删除操作failed' + err.message,400)
    }
})
//禁言
app.get('/updateusers/:id',async c=>{
    try{
        let id = c.param.id;
        let result = await pdb.query(`select likes from users where id = ${id}`)
        if(result.rows[0].likes == 1){
            console.log(`update users set likes = 0 where id = ${id}`)
            await pdb.query(`update users set likes = 0 where id = ${id}`);
        }else if(result.rows[0].likes == 0){
            console.log(`update users set likes = 1 where id = ${id}`)
            await pdb.query(`update users set likes = 1 where id = ${id}`);
        }
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//获取likes
app.get('/likes/:id',async c=>{
    try{
        let id = c.param.id;
        let result = await pdb.query(`select likes from consult where id = ${id}`)
        console.log(result.rows[0].likes)
        c.send(result.rows[0].likes)
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//禁言人员
app.get('/nosay',async c=>{
    try{
        let result = await pdb.query('select * from users where likes = 0 order by id asc')
        c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//取消禁言
app.get('/nosaybtn/:id',async c=>{
    try{
        let id = c.param.id;
        let sql = `update users set likes = 1 where id = ${id}`;    
        await pdb.query(sql)
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})

//晓凡的方法：增
// app.post('/addconsult/:mess',async c=>{
//     try{
//         let mess = c.param.mess
//         console.log(mess)
//         console.log(decodeURI(mess))
           //这块 - 用split分割一下
//         //获取当前日期和时间 2020-12-02 20:15:22  
//         var date = new Date();
//         var Y = date.getFullYear() + '-';
//         var M = ((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//         var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate())+ ' ';
//         var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
//         var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())+ ':';
//         var s = (date.getSeconds()< 10 ? '0'+(date.getSeconds()) : date.getSeconds()); 
//         var nowtime = Y+M+D+h+m+s;
//         //插入语句
//         let sql = `insert into consult (id,name,imgsrc,date,text,type,number) values (98,'我是刘晓凡','https://i02piccdn.sogoucdn.com/643a1b77507356e7','${nowtime}','啦啦啦','哈哈哈',0)`
//         console.log(sql);
//         let result = await pdb.query(sql)
// 	    if(result.rowCount<=0){
// 	        c.send('failed register',400)
// 	        return
// 	    }
// 	c.send('添加咨询操作ok')
//     }catch(err){
// 	c.send('添加咨询failed，错误信息为：' + err.message,400)
//     }
// })
//改
app.post('/updateconsult',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'update consult set Cpage = ($1) where Cname = ($2)'
	    let result = await pdb.query(sql,[data.Cpage,data.Cname])
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
	    }
	c.send('修改操作ok')
    }catch(err){
	    c.send('修改操作failed',400)
    }
})
//删
app.post('/delconsult',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'delete from consult where Cname =($1)'
	    let result = await pdb.query(sql,[data.Cname])
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
	    }
	c.send('删除ok')
    }catch(err){
	    c.send('删除操作failed',400)
    }
})
//咨询区表以上 consult
//案例表以下 thing
app.get('/thing',async c=>{
    try{
        let sql = 'select * from thing';
        let result = await pdb.query(sql)
	    c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//实现模糊搜索案例
app.get('/thing/:text',async c=>{
    try{
        let text= c.param.text;
        let textc = decodeURI(text)//对%进行解码
        let sql = `select * from thing where title like '%${textc}%'`;
        console.log(sql);
        let result = await pdb.query(sql)
	    c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//删除案例
app.get('/delthing/:id',async c=>{
    try{    
        let id = c.param.id
        let sql = `delete from thing where id = ${id}`
	    await pdb.query(sql)
    }catch(err){
	    c.send('删除操作failed' + err.message,400)
    }
})
//案例表以上 thing

//律师圈以下 lawyer_circle
//查所有人信息
app.get('/lawyer_circle',async c=>{
    try{
	    let sql = 'SELECT * FROM lawyer_circle order by id desc'
	    let result = await pdb.query(sql)
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
        }
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//发布律师圈
app.post('/addlawyer_circle/:text',async c=>{
    try{
        //获取当前数据库最大id 以便插入
        let sql1 = 'select MAX(id) from lawyer_circle;'
        let rs = await pdb.query(sql1)
        let maxid = parseInt(JSON.stringify(rs.rows[0].max)) + 1
        //获取两个输入框内容：内容详情
        let text = c.param.text;      
        let textc = decodeURI(text)//对%进行解码
        console.log(text)
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
        let sql2 = `insert into lawyer_circle values (${maxid},'陈凯华律师','/userimage/ckh.png','${nowtime}','${textc}')`
        console.log(sql2);
        let result = await pdb.query(sql2)
	    if(result.rowCount<=0){
	        c.send('failed register',400)
	        return
	    }
    c.send('发表律师圈操作ok')
    }catch(err){
	c.send('发表律师圈failed，错误信息为：' + err.message,400)
    }
})
//删除律师圈
app.get('/dellawyer_circle/:id',async c=>{
    try{
        let id = c.param.id
        let sql = `delete from lawyer_circle where id = ${id}`
        console.log(sql)
	    await pdb.query(sql)
    }catch(err){
	    c.send('查询操作failed'+err.message,400)
    }
})
//律师圈以上 lawyer_circle
//好评榜表以下 highprise
//查
app.get('/highprise',async c=>{
    try{
	    let sql = 'select * from lawyer order by praiserate DESC;'
	    let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed',400)
    }
})
//解答榜表以下 answerList
//查
app.get('/answerList',async c=>{
    try{
	    let sql = 'select * from lawyer order by answerrate DESC;'
	    let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed',400)
    }
})
//解答榜表以上 answerList
//普法栏目剧表以下 video
//查询所有
app.get('/video',async c=>{
    try{
	    let sql = 'select * from video order by id asc'
	    let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed',400)
    }
})
//进入详情
app.get('/video/:id',async c=>{
    try{
        let id = c.param.id
	    let sql = `select * from video where id = ${id}`
	    let result = await pdb.query(sql)
	c.send(JSON.stringify(result.rows))
    }catch(err){
	    c.send('查询操作failed',400)
    }
})
//普法栏目剧表以下 video
//中间件 请求时长
app.use(async(c,next)=>{
    let start = Date.now()
    await next();
    let end = Date.now();
    console.log(c.method,c.path,(end-start),'ms');
})
//跨域支持的中间件，这段要背
app.use(async(c,next)=>{
    c.setHeader('access-control-allow-origin','*')
    c.setHeader(
        'access-control-allow-methods',
        ['GET','POST','OPTIONS','DELETE','PUT']
    )
    c.setHeader('access-control-allow-headers','content-type')
    await next();
})
//这段要背

//用于跨域访问时，OPTIONS请求的处理，
//跨域请求时，在POST、PUT的一些特殊content-type以及DELETE请求时，会先发送OPTIONS请求。
//所以这里通过添加一个OPTIONS请求对任何请求都返回对应的消息头
app.get('/',async c=>{
    //设置内容类型
    c.setHeader('content-type','text/html;charset=utf-8')
    // 返回数据，其中reabd接口是服fs.readFile的封装，但会类型为Buffer
    c.res.body = await c.helper.readb('./pages/index.html')
})
app.get('/pid',async c=>{
    //返回pid
    c.res.body = `PID:${process.pid}`
})
app.post('/data',async c=>{
    //原样返回
    c.res.body = c.body
})
app.delete('/data',async c=>{
    c.res.body = 'ok'
})
app.options('/*',async c=>{
    //告知浏览器，缓存60秒，60秒内再次发起OPTIONS请求，从本地读取缓存结果即可。
    c.setHeader('cache-control', 'public, max-age=60')
})
app.run(2347)
