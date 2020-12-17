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
//查
app.get('/consult',async c=>{
    try{
	    let sql = 'SELECT * FROM consult'
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
//增
app.post('/addconsult',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'insert into consult (Cname,Cpage,Ctext,Ctype,Ctime,Ccomment1,Ccomment2,Ccomment3,Ccomment4,Ccomment5,Ccomment6,Ccomment7,Ccomment8,Ccomment9,Ccomment10) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)'
	    let result = await pdb.query(sql,[data.Cname,data.Cpage,data.Ctext,data.Ctype,data.Ctime,data.Ccomment1,data.Ccomment2,data.Ccomment3,data.Ccomment4,data.Ccomment5,data.Ccomment6,data.Ccomment7,data.Ccomment8,data.Ccomment9,data.Ccomment10])
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
app.run(1237);

