// const url = 'https://jinma.herokuapp.com'
const url = 'https://jingma.shanghaiwogeng.com'
// const url = 'http://localhost:3000';
module.exports = {
  baseUrl: url,
  apiList: {
    recent: url + '/api/v1/items',
    itemsForCurrentUser: url + '/api/v1/items/for_current_user/',
    itemDetail: url + '/api/v1/items/',
    comment_with_id: url + '/api/v1/items/',
    comment_postfix: '/comments'
  }
}
