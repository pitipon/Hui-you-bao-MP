
const app = getApp()
var config = require('../../comm/script/config')
var jinma = require('../../comm/script/fetch')

Page({
  data: {
    userInfo: {},
    items: [],
    hasMore: true,
    showLoading: true,
    start: 1,
    is_loading: true,
    is_pulldown: false,
    active_no_more_item: false,
  },

  onLoad: function () {
    var that = this
    console.log(app.globalData.userInfo)

    // ###Set userInfo to local data
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    // ###Set userInfo to local data

    // Fetch items from user
    jinma.fetchItemsRecent.call(that, config.apiList.itemsForCurrentUser, that.data.start)

  },
  goBack: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  goHome: function (e) {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  goPost: function (e) {
    wx.reLaunch({
      url: '/pages/post/post'
    })
  },
  goProfile: function (e) {
    wx.reLaunch({
      url: '/pages/profile/profile'
    })
  },


  onPullDownRefresh: function () {
    console.log(this.data.items)
    this.onLoad(function () {
      wx.stopPullDownRefresh()
    })
  },
  previewImage: function (e) {
    var data = e.currentTarget.dataset
    var index = data.index
    var that = this
    console.log("preview >>")
    console.log(index)
    console.log(that.data.items[index].image_url)
    wx.previewImage({
      current: that.data.items[index].image_url, // image url that want to preview
      urls: [that.data.items[index].image_url]  // Lists of all images that need to proview
    })
  }
})





