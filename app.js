App({
  onLaunch: function () {
    // WX code
    let app = this;
    // wx.checkSession({
    //   success: function() {
    //     console.log("success, has account")
    //   },
    //   fail: function() {
    wx.login({
      success: function (res) {
        console.log("RES:")
        console.log(res)
        if (res.code) {
          //发起网络请求
          app.getUserInfo(function (userInfo) {
            // console.log(userInfo)
            try {
              wx.setStorageSync('userInfo', userInfo)
              console.log("stored user information")
              console.log(userInfo)
              // userInfo = { 
              // nickName: "郑瑞銘 - mo", 
              // avatarUrl: "http://wx.qlogo.cn/mmhead/7j1UQofaR9edCibqvqt3q025sSIl1oyraKROdyUyibboFcA8MWpzGSibQ/132", 
              // gender: 1, 
              // province: "Sichuan", 
              // city: "Chengdu" }

            } catch (e) {
              console.log("couldn't set storage for avatar")
            }
            wx.request({
              success: function (res) {
                try {
                  wx.setStorageSync('token', res.data.authentication_token)
                  wx.setStorageSync('currentUserId', res.data.id)
                } catch (e) {
                  console.log("Didn't set storage")
                }
              },

              url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
              method: "post",
              data: {
                code: res.code,
                user: {
                  avatar: userInfo.avatarUrl,
                  nickname: userInfo.nickName,
                  gender: userInfo.gender,
                  province: userInfo.province,
                  city: userInfo.city
                }
              }
            })
          })
        } else {
          console.log('error' + res.errMsg)
        }
      }
    })
  },
  // wx.getLocation({
  //   type: 'wgs84',
  //   success: function (res) {
  //     console.log(res)
  //     var lat = res.latitude
  //     var lng = res.longitude
  //   }
  // })
  // },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        // withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    lat: null,
    lng: null
  }
})
