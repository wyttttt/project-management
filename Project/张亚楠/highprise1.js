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
app.get('/highprise',async c=>{
    try{
	    let sql = 'select * from highprise order by hprise DESC;'
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
app.post('/addhighprise',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'insert into highprise(hname,hpage,haddress,hyear,htype,hfrequency,hprise) values ($1,$2,$3,$4,$5,$6,$7)'
	    let result = await pdb.query(sql,[data.hname,data.hpage,data.haddress,data.hyear,data.htype,data.hfrequency,data.hprise])
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
app.post('/updatehighprise',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'update highprise set hpage = ($1) where hname = ($2)'
	    let result = await pdb.query(sql,[data.hpage,data.hname])
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
app.post('/delhighprise',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'delete from highprise where hname =($1)'
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
app.run(2223);

