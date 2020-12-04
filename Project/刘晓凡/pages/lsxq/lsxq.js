// pages/lsxq/lsxq.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes:"未关注",
   
  },
  // data: {
  
  // },


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

 

  get:function(e){
    //本地存储id
  
  let that = this;

  // console.log(e.currentTarget.dataset.likes)
  console.log("likes:",wx.getStorageSync('likes'));
  console.log("data:",wx.getStorageSync('data'));
  var lawyerlikes = wx.getStorageSync('likes')
  var lawyerdata = wx.getStorageSync('data')

  // console.log(lawyerlikes)

  if(lawyerlikes == 1){
   
    wx.request({
      url: 'https://www.responsibility.pro:2347/updatelawyer1/' + wx.getStorageSync('setLawyerId'),
      method:'post',
  })
    lawyerdata[0].likes = 0;
    that.setData({
      content:lawyerdata
    }) 
    this.onLoad()
    this.onLoad()
    wx.showToast({
      title: '关注成功',
      icon: 'success',
      duration:700
    })
    
    // wx.removeStorageSync('id')
  }else{
    
    wx.request({
      url: 'https://www.responsibility.pro:2347/updatelawyer2/' + wx.getStorageSync('setLawyerId'),
      method:'post',
    })
    lawyerdata[0].likes = 1;
    that.setData({
      content:lawyerdata
    })  
    this.onLoad()
    this.onLoad()
    wx.showToast({
      title: '取消关注',
      icon: 'success',
      duration:700
    })
   
    
  }

  },


  onLoad:function(e){

    
    var that = this;
    //同步打印
  
    wx.request({
      url: 'https://www.responsibility.pro:2347/lawyer/' + parseInt(wx.getStorageSync('setLawyerId')),
      method:'get',
      data: {},
      header:{'content-type':'application/json'},
      success: function (res) {
        console.log("likes:",res.data[0].likes);
        wx.setStorageSync('likes', res.data[0].likes )
        wx.setStorageSync('data', res.data)

        if(wx.getStorageSync('likes') == 0){
          that.setData({
            mes:'已关注',        
          })
        }else{
          that.setData({
            mes:'未关注',
          })
        }

          that.setData({
             lawyer:res.data
          })
      },
      fail:function(err){
        console.log(err)
      }
  })
 
  },



        

})