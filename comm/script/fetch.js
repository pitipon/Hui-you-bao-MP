let config = require('../../comm/script/config')

function getItemComment(id, cb) {
  let that = this
  let _url = config.apiList.comment_with_id + id + config.apiList.comment_postfix
  console.log("URL Comment >> " + _url)
  console.log(id)

  setTimeout(function () {
    that.setData({
      is_pulldown: false
    })
  }, 500)

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

  setTimeout(function () {
    that.setData({
      is_pulldown: false
    })
  }, 500)
  
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
    success:  function (res) {
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

        if (url == config.apiList.itemsForCurrentUser) {
          let totalAmountSpent = 0;
          let averageAmountSaved = 0;
          let totalAmountSaved = 0;

          // calculate the data ...

          let itemsWithDiscountAndPrice = that.data.items.filter((item) => {
            let price = Number.parseFloat(item.price);
            let discount = Number.parseFloat(item.discount)

            return !Number.isNaN(discount) && !Number.isNaN(price);
          });

          // Calculate totalAmountSaved
          for(var i = 0; i < itemsWithDiscountAndPrice.length; i++) {
            let item = itemsWithDiscountAndPrice[i];
            let price = Number.parseFloat(item.price);
            let discount = Number.parseFloat(item.discount)

            let amountSavedOnThisItem = price * ((100 - discount * 10) / 100);
            totalAmountSaved = totalAmountSaved + amountSavedOnThisItem;
          }

          // Calculate totalAmountSpent
          for(var i = 0; i < that.data.items.length; i++) {
            let item = that.data.items[i];

            let price = Number.parseFloat(item.price);
            let discount = Number.parseFloat(item.discount);
            if(!Number.isNaN(price)) {
              totalAmountSpent = price + totalAmountSpent;
            }
          }

          // let percentSaveMoney = Math.round((totalAmountSaved / totalAmountSpent) * 100)
          totalAmountSpent = 0
          let percentSaveMoney = 0

          if (totalAmountSpent != 0) {
            percentSaveMoney = Math.round((totalAmountSaved / totalAmountSpent) * 100)
          }


          // Calculate averageAmountSaved
          averageAmountSaved = totalAmountSaved / itemsWithDiscountAndPrice.length;

          that.setData({
            totalAmountSpent: totalAmountSpent,
            averageAmountSaved: averageAmountSaved,
            totalAmountSaved: totalAmountSaved,
            percentSaveMoney: percentSaveMoney
          })
        }

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