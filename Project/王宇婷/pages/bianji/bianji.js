// pages/bianji/bianji.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],//本地图片地址数组
    picPaths:[],//网络路径
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //添加上传图片
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
      }
    }) 
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx',//
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        console.log(res) //接口返回网络路径
        var data = JSON.parse(res.data)
          that.data.picPaths.push(data['msg'])
          that.setData({
            picPaths: that.data.picPaths
          })
          console.log(that.data.picPaths)
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
    onShow: function(){

    },
    submitData:function(f){
      var that = this
      wx.request({
        url:'https://www.responsibility.pro:2347/answerList' + wx.getStorageSync('content2'),
        method:'post',
        headers:{ 
          'Content-Type':'application/json'
        },
        success:function(res){
          that.setData({
            content:res.data,
          })
        },
        fail:function(err){
          console.log(err)
        }
      })
        wx.navigateTo({
          url:'/pages/lsq/lsq'
        })
      },
      // writeTitle:function(f){
      //   let fval=f.detail.value;
      //   wx.setStorageSync('content1',encodeURIComponent(fval));
       
      // },
      writeText:function(f){
        let fval=f.detail.value;
        wx.setStorageSync('content2',encodeURI(fval));
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