// pages/comment/comment.js

const app = getApp()
let config = require('../../comm/script/config')
let jinma = require('../../comm/script/fetch')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_id: 0,
    loading: false,
    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let that = this
    // ###Set userInfo to local data
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }

    console.log("option >>")
    console.log(option.id)
    let item_id = ""
    item_id = option.id.toString()
    console.log(item_id)

    that.setData({
      item_id: option.id
    })


    // Fetch all of data of comment in this item_id
    // and show on HTML page

    jinma.getItemComment.call(that,  item_id )

  },
  bindFormSubmit: function (e) {
    // 1. enable the loading animation on send button
    let that = this
    that.setData({
      loading: !that.data.loading
    })

    // 2. show a Loading toast
    wx.showToast({
      title: 'Sending...',
      icon: 'loading',
      duration: 1500
    })
    console.log("Press Submit!!!!")
    console.log(e)

    // let _price = e.detail.value.price
    // let _discount = e.detail.value.discount
    let _message = e.detail.value.message
    let _item_id = that.data.item_id
    // let _location = e.detail.value.location
    // let _category = this.data.categories[this.data.index]
    // let _image_url = this.data.imageUrl
    // let _is_private = !this.data.is_public
    // let _latitude = this.data.latitude
    // let _longitude = this.data.longitude


    wx.request({
      success: function (res) {
        try {
          console.log("Res from server: ")
          console.log(res)

          // console.log("TEST Res store globalData >>>")
          // console.log(app.globalData.token)
          // console.log(app.globalData.currentUserId)
          console.log("done for post to API")
          that.setData({
            loading: !that.data.loading
          })




            wx.reLaunch({
              url: '/pages/comment/comment?id=' + that.data.item_id
            })




        } catch (e) {
          console.log(e)
        }
      },

      url: config.baseUrl + '/api/v1/items/' + _item_id + '/comments',
      method: "post",
      header: {
        'content-type': 'application/json',
        'X-User-Email': app.globalData.email,
        'X-User-Token': app.globalData.token
      },
      data: {
        comment: {
          body: _message
        }
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
