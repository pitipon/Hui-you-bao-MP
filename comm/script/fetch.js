
function fetchItemsRecent(url, page, cb) {
  let that = this

  console.log("HasMore:" + that.data.hasMore)
  console.log("URL:" + url)
  console.log("Page:" + page)
  console.log("cb:" + typeof cb === 'function')

  if (that.data.hasMore) {
  // ### Sent GET request
  wx.request({
    url: url,
    method: "get",
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function (res) {
      try {
        console.log("INDEX API: ")
        console.log(res)
    

        that.setData({
          items: that.data.items.concat(res.data.items),
          showLoading: false,
          is_loading: false
        })


      } catch (e) {
        console.log(e)
      }
    }
    
  })
  // ### Sent GET request
  }

}

module.exports = {
  fetchItemsRecent: fetchItemsRecent 
}