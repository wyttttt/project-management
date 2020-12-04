//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
 
  //事件处理函数
  
  onLoad:function () {
   

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

