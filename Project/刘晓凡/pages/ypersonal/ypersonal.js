// pages/shoucang/shoucang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usr: "点击登录账户"
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
    this.setData({
      usr: decodeURIComponent(wx.getStorageSync('content'))
    })
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
  submit: function(){
    wx.navigateTo({
      url: '../shoucang/shoucang',
    })
  },
  toUser: function(){
    wx.navigateTo({
      url: '../user/user',
    })
  },
  toSz: function(){
    wx.navigateTo({
      url: '../shezhi/shezhi',
    })
  },
  toMoney: function(){
    wx.navigateTo({
      url: '../money/money',
    })
  },
  toOne: function(){
    wx.navigateTo({
      url: '../one/one',
    })
  },
  toZixun: function(){
    wx.navigateTo({
      url: '../zixun/zixun',
    })
  },
  toWt: function(){
    wx.navigateTo({
      url: '../weituo/weituo',
    })
  }
})