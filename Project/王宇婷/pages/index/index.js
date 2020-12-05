//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    token:` '38_PSHcrUJx9I2AvwG2PPHSkXt-FMaT_cJkX1oxy5FntkMyFGR9wUSI4Cz_z7-irnMwc6OaDFIgXhwGqHsqnPdb5rwC5hzKb3tlzovpucrsx8AuRO2kLgg_-ylMPv_g_XDtSHwIz1CnbKVhTupuZSKaAJAMFX'`
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  selectImage:function(){
  wx.chooseImage({
    count:1,
    sizeType:["original"],
    success:res=>
    this.setData({
      imagePath:res.tempFilePaths[0]
    }),
  })
  },
  onLoad:function () {
    wx.request({
      url:'https://wy.vvh5.com/post-test',
      method:"POST",
      data:{
        name:'wang'
      },
      success:res=>{
        console.log('结果字符串为：'+JSON.stringify(res.data));
        }  
    })
    wx.uploadFile({
      filePath: 'res.tempFilePaths[0]',
      name: 'media',
      url: 'http://localhost:1234/img-check',
      success:res=>{
        console.log(res.data);
      }
  })
    /*
        wx.request({
      url:'https://wy.vvh5.com/image-list/[2018011973]',
      success:res=>{
        if(res.statusCode !==200){
          wx.showModal({
            content:`${res.atatusCode}:出错了`
          });
          return;
        }*/
        //输出结果
        // console.log(res.data);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      
    }
    wx.getUserInfo({
      lang: "zh_CN",
      success:res=>{
        console.log(res)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  selectImage:function (){
    wx.chooseImage({
      count:1,
      sizeType:["original"],
      success:res=>{
        this.setData({
          imagePath:res.tempFilePaths[0]
        })
        wx.uploadFile({
          filePath:res.tempFilePaths[0],
          name:'media',
          url:'https://api.weixin.qq.com/wxa/img_sec_check?access_token='
              +this.data.token,
          success:res=>{
            console.log(res.data);
          }
        })
      }
    })
  },
  submitData:function(f){
    wx.navigateTo({
      url:'/pages/submit/submit'
    })
  },
  writeTitle:function(f){
    let fval=f.detail.value;
    wx.setStorageSync('content1',encodeURIComponent(fval));
   
  },
  writeText:function(f){
    let fval=f.detail.value;
    wx.setStorageSync('content2',encodeURIComponent(fval));
  },
  goTolsq:function(f){
    wx.navigateTo({
      url: '/pages/lsq/lsq',
      })
  },
  goTophb:function(f){
    wx.navigateTo({
      url: '/pages/phb/phb',
      })
  },
  goTohzj:function(f){
    wx.navigateTo({
      url: '/pages/hzj/hzj',
      })
  }
})

