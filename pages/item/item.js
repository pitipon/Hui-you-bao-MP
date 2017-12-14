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
    share_index: 0,
    check_liked: [],
    userInfo: {},
    item: {},
    item_id: "",
    comments: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {

    var that = this
   
    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }

    that.setData({
      item: app.globalData.profileItem
    })

    console.log("option >>")
    console.log(option.id)
    let _item_id = ""
    _item_id = option.id.toString()
    that.setData({
      item_id: _item_id
    })


    //  fetch comment
    jinma.getItemComment.call(that, that.data.item_id)


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
  bindFormSubmit: function (e) {
    
    let that = this


    // 2. show a Loading toast
    wx.showToast({
      title: 'Sending...',
      icon: 'loading',
      duration: 1500
    })
    console.log("Press Submit!!!!")
    console.log(e)


    let _message = e.detail.value.message
    let _item_id = that.data.item_id
 


    wx.request({
      success: function (res) {
        try {
          console.log("Res from server: ")
          console.log(res)

          // console.log("TEST Res store globalData >>>")
          // console.log(app.globalData.token)
          // console.log(app.globalData.currentUserId)
          console.log("done for post to API")
         

          wx.reLaunch({
            url: '/pages/item/item?id=' + that.data.item_id
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
  commentItem: function (e) {
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
    

    // Store index from card key to DataStorage 
    // .... we store details of cards

    app.globalData.item = that.data.item

    let _url = '/pages/share/share?id=' + that.data.item_id

    console.log("share Message function>>")
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
  },
  takePicture: function () {
    // console.log("test")

    wx.reLaunch({
      url: '/pages/post/post'
    })

  },
  sendLike: function (e) {
    let that = this


    let _item_id = that.data.item_id
    console.log("LIKE item_id >>>")
    console.log(_item_id)

    let new_item = that.data.item
    new_item.liked_by_current_user = true

    let new_items = that.data.items
    

    that.setData({
      item: new_item
    })



    wx.request({
      success: function (res) {
        try {
          console.log("Res from server: ")
          console.log(res)

          // switch that like active and plus one at that item

          // console.log("done for post to API")
          // that.setData({
          //   loading: !that.data.loading
          // })

          // Change to like
          wx.showToast({
            title: '赞',
            icon: 'success',
            duration: 1000
          })

          // setTimeout(function () {
          //   wx.reLaunch({
          //     url: '/pages/index/index'
          //   })
          // }, 500)

          that.setData({
            items: new_items
          })


        } catch (e) {
          console.log(e)
        }
      },

      url: 'https://jingma.shanghaiwogeng.com/api/v1/likes/like',
      method: "post",
      header: {
        'content-type': 'application/json',
        'X-User-Email': app.globalData.email,
        'X-User-Token': app.globalData.token
      },
      data: {
        item_id: _item_id
      }
    })
  },
  sendUnlike: function (e) {
    let that = this


    let _item_id = that.data.item_id
    console.log("LIKE item_id >>>")
    console.log(_item_id)

    let new_item = that.data.item
    new_item.liked_by_current_user = false

    let new_items = that.data.items


    that.setData({
      item: new_item
    })


    wx.request({
      success: function (res) {
        try {
          console.log("Res from server: ")
          console.log(res)

          // switch that like active and plus one at that item

          // console.log("done for post to API")
          // that.setData({
          //   items: 
          // })
          that.data.items[index].liked_by_current_user = false
          console.log("check change unlike >>")
          console.log(that.data.items[index].liked_by_current_user)

          // Change to like
          // wx.showToast({
          //   title: '取消',
          //   icon: 'success',
          //   duration: 1000
          // })

          // setTimeout(function () {
          //   wx.reLaunch({
          //     url: '/pages/index/index'
          //   })
          // }, 500)

          that.setData({
            items: new_items
          })


        } catch (e) {
          console.log(e)
        }
      },

      url: 'https://jingma.shanghaiwogeng.com/api/v1/likes/unlike',
      method: "post",
      header: {
        'content-type': 'application/json',
        'X-User-Email': app.globalData.email,
        'X-User-Token': app.globalData.token
      },
      data: {
        item_id: _item_id
      }
    })
  }


})