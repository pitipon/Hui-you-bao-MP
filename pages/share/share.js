// pages/share/share.js

const app = getApp()
let config = require('../../comm/script/config')
let jinma = require('../../comm/script/fetch')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
      // Check that enter to this page from share or crate share card
      // If "from create share" -> we make card for share
      // else if "from user enter to card" -> we let that user redirect to index
      // 
      // We will use data storage to check that user come 
      var that = this

      app.globalData.salmon = "mo2"
      let mo = app.globalData.salmon
      console.log(mo)
      console.log(option)
      console.log(option.id)


      jinma.fetchItemDetail.call(that, config.apiList.itemDetail, option.id)




  }, 
  previewImage: function (e) {
    var data = e.currentTarget.dataset
    var index = data.index
    var that = this
    console.log("preview >>")
    console.log(index)
    console.log(that.data.item.image_url)
    wx.previewImage({
      current: that.data.item.image_url, // image url that want to preview
      urls: [that.data.item.image_url]  // Lists of all images that need to proview
    })
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
    let that = this
    console.log("On Share Message")


    wx.showShareMenu({
      withShareTicket: true
    })


    setTimeout(function () {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }, 500)

    let _title = ""
    _title = that.data.item.description
    if (that.data.item.price != ""){
      _title += ", " + that.data.item.price + "元"
    }

    if (that.data.item.discount != ""){
      _title += ", " + that.data.item.discount + "折"
    }

    if (_title == "") {
      _title = "惠优宝 hui you bao >>"
    }

    return {
      title: _title,
      path: 'pages/index/index'
    }
  },
  backToIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})