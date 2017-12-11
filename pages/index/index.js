// pages/group/group.js

const app = getApp()
let config = require('../../comm/script/config')
let jinma = require('../../comm/script/fetch')
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    hasMore: true,
    showLoading: true,
    start: 1,
    is_loading: true,
    is_pulldown: false,
    active_no_more_item: false,
    share_index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    var that = this
    // Set Title
    // wx.setNavigationBarTitle({
    //   title: 'JING MA 精妈'
    // })

    jinma.fetchItemsRecent.call(that, config.apiList.recent, that.data.start )

    // Set token to data local
    // console.log("TEST Res store globalData >>>")
    // console.log(app.globalData.token)
    // console.log(app.globalData.currentUserId)
    // console.log(app.globalData.email)

    // #########Set items data from app.js
    // wx.request({
    //   success: function (res) {
    //     try {
    //       console.log("INDEX API: ")
    //       console.log(res)
    //       app.globalData.items = res.data.items
    //       console.log(app.globalData.items)
    //       console.log("INDEX API SUCCESS")

    //       that.setData({
    //         items: res.data.items,
    //         is_loading: false
    //       })


    //     } catch (e) {
    //       console.log(e)
    //     }
    //   },

    //   url: config.apiList.recent,
    //   method: "get"
    // })
    // #########Set items data from app.js

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
    // Load Card data
    
    
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
      console.log("##on Pull down function ####")
      var that = this
      that.setData({
        items: [],
        hasMore: true,
        showLoading: true,
        start: 1,
        is_loading: true,
        is_pulldown: true
      })
      this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      

      var that = this
      console.log(that.data.hasMore)
      if (!that.data.hasMore) {
          // show message "no more item"
          that.setData({
            active_no_more_item: true
          })
          
        }

      if (!that.data.is_loading && that.data.hasMore) {
        // !that.data.is_loading  >> Prevent first time load home page
        // that.data.hasMore
        console.log("Hey .. I am reach bottom")
        
        that.setData({
          is_loading: true
        })
        jinma.fetchItemsRecent.call(that, config.apiList.recent, that.data.start)
      }
      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
   
  },
  commentItem: function(e) {
    let that = this
    let data = e.currentTarget.dataset
    let index = data.index

    let _url = '/pages/comment/comment?id=' + that.data.items[index].id
    wx.navigateTo({
      url: _url
    })
  },
  shareMessage: function (e) {
    let that = this
    let data = e.currentTarget.dataset
    let index = data.index

    that.setData({
      share_index: index
    })

    // Store index from card key to DataStorage 
    // .... we store details of cards

    app.globalData.item = that.data.items[index]

    let _url = '/pages/share/share?id=' + that.data.items[index].id

    console.log("share Message function>>")
    console.log(data)
    console.log(app.globalData.item)
    console.log(_url)


    wx.navigateTo({
      url: _url
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