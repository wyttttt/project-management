// pages/mfzx/mfzx.js
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
    array: ['选择案件类型', '一般民事', '合同纠纷', '债权债务', '交通事故', '婚姻家庭', '工商税务', '其他'],
    index: 0,
  },

  bindPickerChange: function (e) {
    console.log(this.data.array[e.detail.value])
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.setStorage({
      key: 'type',
      data: this.data.array[e.detail.value],
     
    })
  },

  
  toSubmit:function(res){
    var that = this;
    //同步打印
    try{
      // console.log(wx.getStorageSync('setdesc'));
    }catch(e){
      console.log(e.message)
    }
    
    var type = wx.getStorageSync('type');
    var text = wx.getStorageSync('text');
    // var mess = type + '-' + text;
    // console.log(mess)
    
    wx.request({
      url: 'https://www.responsibility.pro:2347/addconsult/' + encodeURI(type) + '/' + encodeURI(text),
      method:'post',
      data: {},
      header:{'content-type':'application/json'},
      success: function (res) {
        console.log(res.data);
          // that.setData({
          //    desc:res.data
          // })
      },
      fail:function(err){
        console.log(err)
      }
  })

  if((type == '') || (text == '')){
    wx.showToast({
      title: '请输入正确值',
      icon: 'none',
      duration:1000
    })
  }else{
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration:1000
    })

    setTimeout(function(){
      wx.navigateBack({
        delta:1
      })
    },1000)
    wx.removeStorageSync('type')
    wx.removeStorageSync('text')
  }
    

    

  },

  setdesc:function(res){
    wx.setStorage({
      key:'text',
      data:res.detail.value
  })
  },








})