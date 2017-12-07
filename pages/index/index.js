// pages/group/group.js

const app = getApp()

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
    // Set Title
    wx.setNavigationBarTitle({
      title: 'JIN MA'
    })

    // Set token to data local
    console.log("TEST Res store globalData >>>")
    console.log(app.globalData.token)
    console.log(app.globalData.currentUserId)
    console.log(app.globalData.email)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // Slide-up menu for user to choose
    // wx.showActionSheet({
    //   itemList: ['Add', 'Edit', 'Delete'],
    //   success: function (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })

    // // POP-UP message with confirm and cancel
    // wx.showModal({
    //   title: 'Prompt',
    //   content: 'This is a modal pop-up window',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('User clicked on Confirm')
    //     } else if (res.cancel) {
    //       console.log('User clicked on Cancel')
    //     }
    //   }
    // })


    // SUCCESS Toast
    // wx.showToast({
    //   title: 'mo hungery',
    //   icon: 'success',
    //   duration: 2000
    // })


    // Loading Toast
    // wx.showLoading({
    //   title: 'Loading',
    // })

    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)


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
})