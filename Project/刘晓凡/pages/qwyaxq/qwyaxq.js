// pages/qwyaxq/qwyaxq.js
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

  onLoad:function(e){
    let id = wx.getStorageSync('videoId')
    var that = this;
    wx.request({
        //请求链接
        url: 'https://www.responsibility.pro:2347/video/' + id,
        //发送的数据
        data: { 
        },
        header:{
          'content-type':'application/json'
        },
        //成功回调
        success: function (res) {
          console.log(res.data)
            that.setData({
                video:res.data
            })
        },
       
        fail:function(err){
          console.log(err)
        }
    })
  }
})