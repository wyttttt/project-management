//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
 
  //事件处理函数

  onShow:function(){
    wx.removeStorageSync('height')
    this.onLoad()
    wx.removeStorageSync('data')
    wx.removeStorageSync('likes')
    wx.removeStorageSync('setLawyerId')
    this.onLoad()
  },
  
  onLoad:function () {
    var that = this;
    wx.request({
      //请求链接
      url: 'https://www.responsibility.pro:2347/lawyer',
      //发送的数据
      data: { 
      },
      header:{
        'content-type':'application/json'
      },
      //成功回调
      success: function (res) {
        console.log(res.data.length);
        wx.setStorageSync('height', res.data.length*180)
      },
      fail:function(err){
        console.log(err)
      }
  })
   

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

