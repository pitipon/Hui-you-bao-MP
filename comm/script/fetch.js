
function fetchItemDetail(url, id, cb) {
  let that = this

  console.log("URL:" + url)
  console.log("Item id:" + id)

  // ### Sent GET request
  wx.request({
    url: url + id,
    method: "get",
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {
      try {
        console.log("Result of Item detail: ")
        console.log(res)

        that.setData({
          item: res.data
        })
        
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
  let that = this

  

  setTimeout(function () {
    that.setData({
      is_pulldown: false
    })
  }, 500)

  console.log("HasMore:" + that.data.hasMore)
  console.log("URL:" + url)
  console.log("Page:" + page)
  console.log("cb:" + typeof cb === 'function')

  if (that.data.hasMore) {
  // ### Sent GET request
  wx.request({
    url: url + that.data.start,
    method: "get",
    header: {
      "Content-Type": "application/json,application/json"
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
  fetchItemDetail: fetchItemDetail
}