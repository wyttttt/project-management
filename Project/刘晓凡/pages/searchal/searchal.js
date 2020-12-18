// pages/searchal/searchal.js
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
      var that = this;
    //同步打印
    try{
      console.log(wx.getStorageSync('setcase'));
    }catch(e){
      console.log(e.message)
    }
    
    var id = wx.getStorageSync('setcase');
    console.log(encodeURI(id));

    
    wx.request({
      url: 'https://www.responsibility.pro:2347/thing/' + encodeURI(id),
      method:'get',
      data: {},
      header:{'content-type':'application/json'},
      success: function (res) {
        console.log(res.data);
          that.setData({
             case:res.data
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