// pages/searchLawyer/searchLawyer.js
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

    // 查找律师

  //异步存储
  setlawyer:function(res){
    wx.setStorage({
      key:'setlawyer',
      data:res.detail.value
  })
  },

  getlawyer:function(){
    var that = this;
    //同步打印
    try{
      console.log(wx.getStorageSync('setlawyer'));
    }catch(e){
      console.log(e.message)
    }
    
    var id = wx.getStorageSync('setlawyer');
    console.log(encodeURI(id));
    if(id == ''){
      wx.showToast({
        title: '请输入正确名称',
        icon: 'none',
        duration:1000
      })
    }else{
      wx.request({
        url: 'https://www.responsibility.pro:2347/selectsomeone/' + encodeURI(id),
        method:'get',
        data: {},
        header:{'content-type':'application/json'},
        success: function (res) {
          console.log(res.data);
            that.setData({
               searchlawyer:res.data
            })
        },
        fail:function(err){
          console.log(err)
        }
    })
    }
    
},

toLsxq:function(e){

  console.log(e)
  
  wx.navigateTo({
    url: '../lsxq/lsxq',
  })
  wx.setStorageSync( 'setLawyerId', e.currentTarget.id)
  

},





})