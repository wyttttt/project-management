// pages/find/find.js
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
    console.log("已刷新")
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

  },

  onLoad:function(){
    var that = this;
    
    wx.request({
        //请求链接
        url: 'https://www.responsibility.pro:2347/consult',
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
                users:res.data
            })
        },
       
        fail:function(err){
          console.log(err)
        }
    })
},


  handleTip:function(){
    wx.showModal({
      title:'温馨提示',
      content:'联系客服\r\n021-580***723\r\n工作日：9:00-10:00',
      success:function(res){
        if(res.confirm){
          console.log('点击确定')
        }else{
          console.log('点击取消')
        }
      }
    })
  },
  toSearch:function(options){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  toInquiry:function(options){
    wx.navigateTo({
      url: '../inquiry/inquiry',
    })
  },
  toZcgs:function(options){
    wx.navigateTo({
      url: '../zcgs/zcgs',
    })
  },
  toZls:function(options){
    wx.navigateTo({
      url: '../zls/zls',
    })
  },
  toDxws:function(options){
    wx.navigateTo({
      url: '../dxws/dxws',
    })
  },
  toAlcx:function(options){
    wx.navigateTo({
      url: '../alcx/alcx',
    })
  },
  toFyjs:function(options){
    wx.navigateTo({
      url: '../fyjs/fyjs',
    })
  },

  toTip:function(option){
    wx.showToast({
      title: '暂未开放',
      icon: 'none',
      duration:1000
    })
  },
  toTipNone:function(option){
    wx.showToast({
      title: '暂无消息',
      icon: 'none',
      duration:1000
    })
  },
  toZxxq:function(e){
  
    //console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.id)

    wx.navigateTo({
      url: '../zxxq/zxxq',
    })
    wx.setStorage({
      key:'setConsultId',
      data:e.currentTarget.id
  })


  },


})