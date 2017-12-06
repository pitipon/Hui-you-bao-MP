// pages/post/post.js
Page({

  //   var pageData = {}
  // for (var i = 1; i< 5; i++) {
  //   (function (index) {
  //     pageData['slider' + index + 'change'] = function (e) {
  //       console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
  //     }
  //   })(i)
  // }
  // Page(pageData)
  /**
   * 页面的初始数据
   */
  data: {
    haveImage: false,
    imageSrc: "",
    categories: ['food', 'toys', 'books', 'bikes', 'animals'],
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
    var that = this
    wx.chooseImage({
      count: 1, // Default 9
      sizeType: ['original', 'compressed'], // Can specify whether it is the original or compressed image, both have defaults
      sourceType: ['album', 'camera'], // Can specify whether the source is an album or camera, both have defaults
      success: function (res) {
        // Returns the local file path list for the selected photo, tempFilePath can be used as the img tag's src attribute to display the image
        var tempFilePaths = res.tempFilePaths

        console.log(tempFilePaths)
        that.setData({
          haveImage: true,
          imageSrc: res.tempFilePaths
        })
        console.log(that.data.haveImage)
        console.log(that.data.imgSrc)

        wx.showToast({
          title: 'Success',
          icon: 'success',
          duration: 2000
        })

      }
    })
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

  }

  // switch1Change: function (e) {
  //   console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  // }
})