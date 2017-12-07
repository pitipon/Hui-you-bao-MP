
// Lean cloud ---
const AV = require('/utils/av-weapp-min.js');

AV.init({
  appId: 'GJevWCcmzoFYQ5xSGMJt3SpC-gzGzoHsz',
  appKey: 'smGlV3vdrjPQhAK8d5JIoca3',
});
// Lean cloud ---

App({
  onLaunch: function () {
    // WX code
    let app = this;
    let salmon2 = "mo2"
    
    wx.login({
      success: function (res) {
        console.log("RES:")
        console.log(res)

        if (res.code) {
  
          // Ask user for UserInfo
          // wx.getUserInfo({
          //   success: res => {
              
          //     app.globalData.userInfo = res.userInfo
              
              
          //     console.log("Success get UserInfo")
          //     console.log(app.globalData.userInfo)
              
          //   }
          // })
          console.log("wanna eat salmon")
          app.getUserInfo( (userInfoFromCallBackHell) => {

              console.log("Print userinfo callback hell:")
              console.log(userInfoFromCallBackHell)

              wx.request({
                success: function (res) {
                  try {
                    console.log("Res from server: ")
                    console.log(res)

                    wx.setStorageSync('token', res.data.authentication_token)
                    wx.setStorageSync('currentUserId', res.data.id)
                  } catch (e) {
                    console.log("Didn't set storage")
                  }
                },

                url: 'https://jinma.herokuapp.com/api/v1/users',
                method: "post",
                header: {
                  'content-type': 'application/json'
                },
                data: {
                  code: res.code,
                  user: {
                    name: userInfoFromCallBackHell.nickName,
                    avatar_url: userInfoFromCallBackHell.avatarUrl,
                    gender: userInfoFromCallBackHell.gender,
                    province: userInfoFromCallBackHell.province,
                    city: userInfoFromCallBackHell.city
                  }
                }
              })

            }
          ,app)


          //发起网络请求
          console.log("Yes..We got code from RES")
          console.log("Global Data before RES")
          

            // wx.request({
            //   success: function (res) {
            //     try {
            //       console.log("Res from server: ")
            //       console.log(res)

                  

            //       wx.setStorageSync('token', res.data.authentication_token)
            //       wx.setStorageSync('currentUserId', res.data.id)
            //     } catch (e) {
            //       console.log("Didn't set storage")
            //     }
            //   },

            //   url: 'https://jinma.herokuapp.com/api/v1/users',
            //   method: "post",
            //   header: {
            //     'content-type': 'application/json'
            //   },
            //   data: {
            //     code: res.code,
            //     user: {
            //       name: app.globalData.userInfo.nickName,
            //       avatar_url: app.globalData.userInfo.avatarUrl,
            //       gender: app.globalData.userInfo.gender,
            //       province: app.globalData.userInfo.province,
            //       city: app.globalData.userInfo.city
            //     }
            //   }
            // })
          
        } else {
          console.log('error' + res.errMsg)
        }
      }
    })
  },
  getUserInfo: (func,app) => {
    console.log("Salmonnnnnnnnnn")
    let that = app
    wx.getUserInfo({
            success: res => {

              that.globalData.userInfo = res.userInfo

              console.log("Success get UserInfo")
              console.log(that.globalData.userInfo)
              func(res.userInfo)
            }
          })
  },
  globalData: {
    userInfo: {
      nickName: "Jin ma",
      avatarUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513149291&di=2079d8d69eff7179496a5e6885bcf624&imgtype=jpg&er=1&src=http%3A%2F%2Ffarm1.staticflickr.com%2F122%2F310239034_2ba3ec89b4_z.jpg%3Fzz%3D1",
      gender: "none",
      province: "Sichuan",
      city: "Chengdu"
    },
    salmon: "mo"
  }
})
