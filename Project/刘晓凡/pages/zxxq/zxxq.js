// pages/zxxq/zxxq.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    isCheacked:false,
    indexn:0
  },
  ch(){
      if(this.data.indexn == 0){
          this.setData({
          isChecked:true,
          indexn : 1
        })
      }else{
        this.setData({
          isChecked:false,
          indexn : 0
        })
      }
   
   
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


onLoad:function(){
  console.log('已刷新')
  var that = this;
  //同步打印
  try{
    console.log(wx.getStorageSync('setConsultId')+'-'+wx.getStorageSync('setConsult_Id'));
  }catch(e){
    console.log(e.message)
  }
  
  var id = wx.getStorageSync('setConsultId');
  
  wx.request({
    url: 'https://www.responsibility.pro:2347/answer/' + parseInt(wx.getStorageSync('setConsultId')) +'/' + parseInt(wx.getStorageSync('setConsult_Id')),
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

wx.request({
  url: 'https://www.responsibility.pro:2347/comment/' +  parseInt(wx.getStorageSync('setConsultId')) +'/' + parseInt(wx.getStorageSync('setConsult_Id')),
  method:'get',
  data: {},
  header:{'content-type':'application/json'},
  success: function (res) {
    console.log(res.data);
      that.setData({
         comment:res.data
      })
  },
  fail:function(err){
    console.log(err)
  }
})
},

setvalue:function(res){
  wx.setStorageSync('value', res.detail.value)

 
},

submit:function(){
  var that = this;
  //同步打印
  try{
    console.log(wx.getStorageSync('value'));
  }catch(e){
    console.log(e.message)
  }
  
  var val = wx.getStorageSync('value');
  var id = parseInt(wx.getStorageSync('setConsultId'))
  var consult_id = parseInt(wx.getStorageSync('setConsult_Id'))
  console.log(encodeURI(val));
  if(val == ''){
    wx.showToast({
      title: '请输入正确回复',
      icon: 'none',
      duration:1000

    })
  }else{
    wx.request({
      url: 'https://www.responsibility.pro:2347/comment_answer/' + id + '/' + consult_id + '/' + encodeURI(val),
      method:'post',
      data: {},
      header:{'content-type':'application/json'},
      
      fail:function(err){
        console.log(err)
      }
  })

  wx.showToast({
    title: '提交成功',
    icon: 'success',
    duration:1000

  })

  this.setData({
    isChecked:false,
    indexn : 0,
    nowvalue:''
  })
  this.onLoad()
  wx.removeStorageSync('value')
  this.onLoad()
  }

  


  
},

  





})