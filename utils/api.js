
const prefix = 'https://sigu.59chuang.com';

// 接口配置
const config = {
  //保存用户心得
  COM_ARTICLE_SAVE: prefix + '/x/cms/article/save',
  //查看我的心得列表
  COM_ARTICLE_MYLIST: prefix + '/x/cms/article/myList',
  //心得详情
  COM_ARTICLE_GET: prefix + '/x/cms/article/get',
  //精品文章列表
  COM_ARTICLE_LIST: prefix + '/x/cms/article/list',
  //投票
  VOTE_SAVE: prefix + '/x/vote/save',
  //微信授权登录
  WECHAT_AUTH: prefix + '/x/WeChat/auth',
  //上传
  CONNECTOR: prefix + '/site/static/ckfinder/core/connector/java/connector.java',
};

// 导出接口
export default {
  config
};