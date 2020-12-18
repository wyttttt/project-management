// pages/lsfcx/lsfcx.js
var m;
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

  
  data: {
    array: ['选择地区', '北京市', '天津市', '河北省', '山西省', '吉林省', '山东省', '河南省'],
    type: ['选择案件类型', '一般民事', '婚姻家庭', '债务债权', '合同纠纷', '经济仲裁', '一般刑事', '劳动仲裁'],
    index: 0,
    index0:0,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
     
    })
    
  },
  bindPickerChange0: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index0: e.detail.value,
     
    })
    
  },
  

  cum:function(e){
    console.log(this.data.index0)
    if(this.data.index == 0){
      wx.showToast({
        title: '请选择地区',
        icon: 'none',
        duration:1000
      })
    }else if(this.data.index0 == 0){
      wx.showToast({
        title: '请选择案件类型',
        icon: 'none',
        duration:1000
      })
    }else{
      this.setData({
      // cost:Math.ceil(Math.random()*10)*300+"元"
      cost:parseInt((this.data.index * 2 + this.data.index0 * 3))*150 + "元"
    })
    }
    
  }
})