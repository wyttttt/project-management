// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [
      {
        text: "根据《中华人民共和国进出口商品检验法》及其实施条例，自本公告发布之日起，对“9025199010”等14个10位商品编号项下的医疗物资不再实施出口商品检验。其中商品编号3005901000和3005909000项下属于危险货物的、商品编号3808940010项下属于危险化学品的，仍按出口危险货物或出口危险化学品检验监管要求执行。~",
      }, {
        text: "《中国银保监会信托公司行政许可事项实施办法》已于2020年10月10日经中国银保监会2020年第13次委务会议通过。现予公布，自2021年1月1日起施行。~",
      }, {
        text: "《法律职业资格管理办法》已经2020年11月17日司法部部务会议审议通过，现予公布，自2021年1月1日起施行。",
      }
      , {
        text: "《保险代理人监管规定》已于2019年12月19日经中国银保监会2019年第13次委务会议通过。现予公布，自2021年1月1日起施行。",
      }
    ],
    broadcast_arr: {
      speed: 2, //滚动速度，每秒2.8个字
      font_size: "16", //字体大小(px)
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
    console.log("已刷新")
    this.onLoad()
    wx.removeStorageSync('setcase')
    wx.removeStorageSync('setConsultId')
    wx.removeStorageSync('setConsult_Id')
    
    wx.removeStorageSync('height')
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

    let ititdata = this.data.data,
      assist = this.data.broadcast_arr,
      this_width = 0,
      spacing = 0,
    speed = (this.data.broadcast_arr.speed * this.data.broadcast_arr.font_size); //m每秒行走的距离
    
    for (let i in ititdata) {
      ititdata[i].starspos = wx.getSystemInfoSync().windowWidth; //以取屏幕宽度为间距
      this_width += ititdata[i].text.length * this.data.broadcast_arr.font_size;
      if (i != ititdata.length - 1) {
        spacing += ititdata[i].starspos
      }
    }
    let total_length = this_width + spacing;//总长
    assist.time = total_length / speed; /**滚动时间*/
    assist.width_mal = total_length; 
    this.setData({
      broadcast_arr: assist,
      roll: ititdata
    })

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
  toSsbq:function(options){
    wx.navigateTo({
      url: '../ssbq/ssbq',
    })
  },
  
  toTip:function(option){
    wx.showToast({
      title: '暂未开放',
      icon: 'none',
      duration:1000
    })
  },
  toQwya:function(options){
    wx.navigateTo({
      url: '../qwya/qwya',
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
    console.log(e.currentTarget.dataset.consult_id)

    wx.setStorageSync('setConsultId', e.currentTarget.id)
    wx.setStorageSync('setConsult_Id', e.currentTarget.dataset.consult_id)
    wx.navigateTo({
      url: '../zxxq/zxxq',
    })
   


  },

  toDome:function(options){
    wx.navigateTo({
      url: '../dome/dome',
    })
  },


})