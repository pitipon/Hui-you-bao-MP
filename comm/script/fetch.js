let config = require('../../comm/script/config')

function getItemComment(id, cb) {
  let that = this
  let _url = config.apiList.comment_with_id + id + config.apiList.comment_postfix
  console.log("URL Comment >> " + _url)
  console.log(id)

  // ### Sent GET request
  wx.request({
    url: _url,
    method: "get",
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {
      try {
        console.log("Result of Item comment: ")
        console.log(res)

        that.setData({
          comments: res.data
        })

        typeof cb == 'function' && cb(res.data)

      }
      catch (e) {
        console.log(e)

        typeof cb == 'function' && cb(res.data)
      }
    }
  })
}


function fetchItemDetail(url, id, cb) {
  let that = this;
  
  // ### Send GET request
  wx.request({
    url: url + id,
    method: "get",
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {
      try {
        that.setData({
          item: res.data
        })

        console.log(that.data.item)
        
        typeof cb == 'function' && cb(res.data)

      }
      catch (e) {
        console.log(e)

        typeof cb == 'function' && cb(res.data)
      }
    }

  })
  // ### Sent GET request


}



function fetchItemsRecent(url, page, cb) {
  let that = this;
  const app = getApp();

  setTimeout(function () {
    that.setData({
      is_pulldown: false
    })
  }, 500)

 

  console.log("HasMore:" + that.data.hasMore)
  console.log("URL:" + url)
  console.log("Page:" + page)
  console.log("cb:" + typeof cb === 'function');
  console.log("Start: " + that.data.start);

  if (that.data.hasMore) {
  // ### Sent GET request
  wx.request({
    url: url,
    method: "get",
    data: {
      page: that.data.start
    },
    header: {
      "Content-Type": "application/json",
      'X-User-Email': app.globalData.email,
      'X-User-Token': app.globalData.token
    },
    success: function (res) {
      try {
        console.log("INDEX API: ")
        console.log(res)
        // console.log(res.data.next_page == undefined)

        that.setData({
          items: that.data.items.concat(res.data.items),
          start: that.data.start + 1,
          hasMore: !(res.data.next_page == undefined),
          showLoading: false,
          is_loading: false
        })

        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)

      } 
      catch (e) {
        console.log(e)

        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      }
    }
    
  })
  // ### Sent GET request
  }

}

module.exports = {
  fetchItemsRecent: fetchItemsRecent,
  fetchItemDetail: fetchItemDetail,
  getItemComment: getItemComment
}