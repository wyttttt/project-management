// pages/zxxq/zxxq.js
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

//   onLoad:function(){
//     var that = this;
    
//     wx.request({
//         //请求链接
//         url: 'https://www.responsibility.pro:2347/consult',
//         //发送的数据
//         data: { 
//         },
//         header:{
//           'content-type':'application/json'
//         },
//         //成功回调
//         success: function (res) {
//         //  console.log(res.data[0])
//             that.setData({
//                 reply:res.data
//             })
//         },
       
//         fail:function(err){
//           console.log(err)
//         }
//     })

// },
onLoad:function(){
  var that = this;
  //同步打印
  try{
    console.log(wx.getStorageSync('setConsultId'));
  }catch(e){
    console.log(e.message)
  }
  
  var id = wx.getStorageSync('setConsultId');
  
  wx.request({
    url: 'https://www.responsibility.pro:2347/answer/' + parseInt(wx.getStorageSync('setConsultId')),
    method:'get',
    data: {},
    header:{'content-type':'application/json'},
    success: function (res) {
      console.log(res.data);
        that.setData({
           answer:res.data
        })
    },
    fail:function(err){
      console.log(err)
    }
})
},

  





})