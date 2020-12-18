// pages/zls/zls.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.removeStorageSync('data')
    wx.removeStorageSync('likes')
    wx.removeStorageSync('setLawyerId')
    wx.removeStorageSync('setlawyer')
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // data:{
  //   mess:[{"name":"1","img":'asdfg'},
  //         {"name":"2","img":'asdfg'}]
  // },

  onLoad:function(){
    var that = this;
    var name = wx.getStorageSync('name');
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
          console.log(res.data);
          
            that.setData({
                content:res.data
            })
        },
       
        fail:function(err){
          console.log(err)
        }
    })
},



  toTip:function(option){
    wx.showToast({
      title: '还没写呢',
      icon: 'none',
      duration:1000
    })
  },
  toSsls:function(options){
    wx.navigateTo({
      url: '../ssls/ssls',
    })
  },
  toSearchlawyer:function(options){
    wx.navigateTo({
      url: '../searchLawyer/searchLawyer',
    })
  },
  toLsxq:function(e){

    console.log(e)
    
    wx.navigateTo({
      url: '../lsxq/lsxq',
    })
    wx.setStorageSync( 'setLawyerId', e.currentTarget.id)
    

  },




  
})