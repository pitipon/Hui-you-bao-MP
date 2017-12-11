// const url = 'https://jinma.herokuapp.com'
const url = 'https://jingma.shanghaiwogeng.com'

module.exports = {
  apiList: {
    recent: url + '/api/v1/items?page=',
    itemDetail: url + '/api/v1/items/',
    comment_with_id: url + '/api/v1/items/',
    comment_postfix: '/comments'
  }
}