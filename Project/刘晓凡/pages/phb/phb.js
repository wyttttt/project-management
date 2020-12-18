Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      currentData : 0,
      height:'0px'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;
 
    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{
 
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  onLoad: function () {

    this.setData({
      height:wx.getStorageSync('height') + 'px'
    })
    
    var that = this
    wx.request({
      url:'https://www.responsibility.pro:2347/highprise',
      headers:{ 
        'Content-Type':'application/json'
      },
      success:function(res){
        console.log(res.data.length)
        that.setData({
          content:res.data,
          
        })
      },
      fail:function(err){
        console.log(err)
      }
    })

    wx.request({
      url:'https://www.responsibility.pro:2347/answerList',
      headers:{ 
        'Content-Type':'application/json'
      },
      success:function(res){
        that.setData({
          acontent:res.data,
        })
      },
      fail:function(err){
        console.log(err)
      }
    })



    

   
  },//onload

  toLsxq:function(e){

    console.log(e)
    
    wx.navigateTo({
      url: '../lsxq/lsxq',
    })
    wx.setStorageSync( 'setLawyerId', e.currentTarget.id)
    

  },


})