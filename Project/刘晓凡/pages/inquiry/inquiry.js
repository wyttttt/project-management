// pages/inquiry/inquiry.js
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
    wx.removeStorageSync('img')
    wx.removeStorageSync('nosaylikes')
    wx.removeStorageSync('type')
    wx.removeStorageSync('text')
  
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

  toMfzx:function(options){
    wx.navigateTo({
      url: '../mfzx/mfzx',
    })
  },
  toTwzx:function(options){
    wx.navigateTo({
      url: '../twzx/twzx',
    })
  },
  toZls:function(options){
    wx.navigateTo({
      url: '../zls/zls',
    })
  },
  toTip:function(option){
    wx.showToast({
      title: '暂未开发',
      icon: 'none',
      duration:1000
    })
  },



})