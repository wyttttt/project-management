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

  onLoad: function (options) {
    wx.request({
      url: 'https://www.responsibility.pro:2347/users' ,
      method:'get',
      data: {},
      header:{'content-type':'application/json'},
      success: function (res) {
        console.log(res.data[0].likes);
        wx.setStorageSync('nosaylikes', res.data[0].likes)
          // that.setData({
          //    desc:res.data
          // })
      },
      fail:function(err){
        console.log(err)
      }
  })
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

  setdesc:function(res){
    wx.setStorage({
      key:'text',
      data:res.detail.value
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
    
    var type = encodeURI(wx.getStorageSync('type'));
    var text = encodeURI(wx.getStorageSync('text'));
    var img = wx.getStorageSync('img').split('/')[3];

    console.log(type)
    console.log(text)
    console.log(img)
    // var mess = type + '-' + text;
    // console.log(mess)


    if(wx.getStorageSync('nosaylikes') == 0){
      wx.showToast({
        title: '您已被禁言',
        icon: 'none',
        duration:1000
      })
      setTimeout(function(){
        wx.navigateBack({
          delta:1
        })
      },1000)
    }else{ 
      if((type == '') || (text == '')){
        wx.showToast({
          title: '请输入正确值',
          icon: 'none',
          duration:1000
        })
      }else{
      
        
        setTimeout(function(){
      
          wx.request({
            url: 'https://www.responsibility.pro:2347/addimgconsult/' + type +'/' + text +'/' + img,
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
      
      },2000)//settimeout
      
      
      
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
      
       
      }//else
    
    }//nosay else
    



//     setTimeout(function(){
      
//     wx.request({
//       url: 'https://www.responsibility.pro:2347/addimgconsult/' + type +'/' + text +'/' + img,
//       method:'post',
//       data: {},
//       header:{'content-type':'application/json'},
//       success: function (res) {
//         console.log(res.data);
//           // that.setData({
//           //    desc:res.data
//           // })
//       },
//       fail:function(err){
//         console.log(err)
//       }
//   })

// },2000)//settimeout
 

  },//submit

 

  // 上传本地图片并显示
  selectImage:function(){
    wx.chooseImage({
      count:1,
      sizeType:['riginal'],
      success:res=>{
        console.log(res)
        wx.setStorageSync('img', res.tempFilePaths[0])
        this.setData({
          imagePath:res.tempFilePaths[0]
        })
        wx.uploadFile({
          filePath:res.tempFilePaths[0],
          name:'media', 
          url:'http://localhost:1234/img-check',
          success:res=>{
            console.log(res.data);
          }
        })
      }
    })
  
  },









})