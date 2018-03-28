// pages/goods/goods.js
var app = getApp()
import util from '../../utils/util.js';
import api from '../../utils/api.js';




Page({
  data: {
    //公用图片前缀
    images: "https://sigu.59chuang.com",
    tempFilePaths: '',

    //发布内容
    title:'',
    content:'',
    copyfrom:'',
    savedFilePath:'',
  },

  onLoad:function(){
      let that = this;
      wx.login({
        success: function (lres) {
          if (lres.code) {
            // 获取用户信息
            wx.getUserInfo({
              success: function (res) {
                try {
                  wx.setStorageSync('userInfo', res.userInfo);
                } catch (e) {
                  // console.log(e);
                }

                //处理用户信息
                let avatarUrl = res.userInfo.avatarUrl;
                let city = " ";
                let country = res.userInfo.country;
                let gender = res.userInfo.gender;
                let language = res.userInfo.language;
                let nickName = res.userInfo.nickName;
                let province = res.userInfo.province;

                let userData = "?siguCode=" + lres.code + "&avatarUrl=" + avatarUrl + "&city=" + city + "&country=" + country + "&gender=" + gender + "&language=" + language + "&nickName=" + nickName + "&province=" + province;
                util.postJSON(api.config.WECHAT_AUTH + userData + function (res) {
                  if (res.success == true) {
                    let _data = res.obj;
                    wx.setStorageSync('login', _data)
                  } else {
                    wx.showToast({
                      title: '授权失败',
                    })
                  }
                });
              },
              fail: function (res) {
                // 拒绝、去设置
                wx.showModal({
                  content: '未授权，是否去设置?',
                  confirmColor: '#f83d4b',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting['scope.userInfo'] == true) {
                            // console.log('打开userInfo');
                            wx.showToast({
                              title: '已授权用户信息',
                              duration: 400
                            });
                            setTimeout(function () {
                              wx.getUserInfo({
                                success: (res) => {
                                  try {
                                    wx.setStorageSync('userInfo', res.userInfo);
                                  } catch (e) {
                                    // console.log(e);
                                  }
                                }
                              })
                            }, 600);

                            //处理用户信息
                            let avatarUrl = res.userInfo.avatarUrl;
                            let city = " ";
                            let country = res.userInfo.country;
                            let gender = res.userInfo.gender;
                            let language = res.userInfo.language;
                            let nickName = res.userInfo.nickName;
                            let province = res.userInfo.province;

                            let userData = "?siguCode=" + lres.code + "&avatarUrl=" + avatarUrl + "&city=" + city + "&country=" + country + "&gender=" + gender + "&language=" + language + "&nickName=" + nickName + "&province=" + province;
                            util.postJSON(api.config.WECHAT_AUTH + userData + function (res) {
                              if (res.success == true) {
                                let _data = res.obj;
                                wx.setStorageSync('login', _data)
                              } else {
                                wx.showToast({
                                  title: '授权失败',
                                })
                              }
                            });
                          }
                          else {
                            // console.log('没有打开userInfo');
                          }
                        }
                      })
                    } else if (res.cancel) {
                      wx.redirectTo({
                        url: '/pages/index/index'
                      })
                    }
                  }
                });
              }
            })
          } else {
            // console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    // let data = '?command=QuickUpload&type=images&currentFolder=/cms/article/2017/11/&langCode=zh-cn&hash=8f188b2b6f3c87b931de38dfff8cfc8a&startupPath=images:/cms/article/2017/11/&FileName=tou3.jpg&response_type&txt'

    // util.postJSON(api.config.CONNECTOR + data, function (res) {
    //   if (res.success == true) {

    //   } else {
    //     wx.showToast({
    //       title: '网络错误',
    //     })
    //   }

    // });
  },
  
  //选择图片
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.saveFile({
          tempFilePath: res.tempFilePaths[0],
          success: function (res) {
            _this.setData({
                savedFilePath: res.savedFilePath,
            })
            console.log(res.savedFilePath)
          }
          
        })
        
      }
    })
  },

  //监听事件
  tjtlt: function (e) {
    this.setData({
      title: e.detail.value
    });
  },
  tjcont: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  ticopy: function (e) {
    this.setData({
      copyfrom: e.detail.value
    });
  },

  //发布心得
  releaseBtn:function(){
    let that = this;

    let title = that.data.title;
    let content = that.data.content;
    let copyfrom = that.data.copyfrom;
    let img = that.data.savedFilePath;

    if (title == ''){
      wx.showToast({
        title: '请输入标题',
      })
      return
    } else if (content == ''){
      wx.showToast({
        title: '请输入正文内容',
      })
      return
    } else if (copyfrom == '') {
      wx.showToast({
        title: '请输入去哪找',
      })
      return
    } else if (img == '') {
      wx.showToast({
        title: '请添加图片',
      })
      return
    }
    
    let id = '123';
    let token = '123';

    let releData = {
      loginId: id,
      sgtoken: token, 
      title,
      ['articleData.content']:content,
      ['articleData.copyfrom']:copyfrom,
      image: img
    }

    


    //let data = '?loginId=' + id + '&sgtoken=' + token + '&title=' + title + '&articleData.content=' + content + '&articleData.copyfrom=' + copyfrom +'&image='+img;
    
    //util.postJSON(api.config.COM_ARTICLE_SAVE+data, function (res) {
    // util.postJSON(api.config.COM_ARTICLE_SAVE, releData, function (res) {
    //   if (res.success == true) {
        
    //   } else {
    //     wx.showToast({
    //       title: '网络错误',
    //     })
    //   }

    // });


  },

})