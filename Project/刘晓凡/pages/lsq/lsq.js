// pages/lsq/lsq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goTobianji:function(f){
      wx.navigateTo({
        url: '/pages/bianji/bianji',
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url:'https://www.responsibility.pro:2347/lawyer_circle',
      method:'get',
      headers:{ 
        'Content-Type':'application/json'
      },
      success:function(res){
        console.log(res)
        that.setData({
          lawyer_circle:res.data,
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
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
    
    wx.removeStorageSync('content2')
   
      console.log('已刷新')
      this.onLoad()
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

  }
})