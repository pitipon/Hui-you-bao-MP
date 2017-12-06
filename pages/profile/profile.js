
var app = getApp();
Page({
  data: {
    gridList: [
      { enName: 'box1', zhName: 'salmon <3er' },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  },

  onLoad: function (cb) {
    var that = this
    console.log(app.globalData.userInfo)

    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()
  },


  onPullDownRefresh: function () {
    this.onLoad(function () {
      wx.stopPullDownRefresh()
    })
  },

  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: "../" + data.url + '/' + data.url
    })
  },
})





