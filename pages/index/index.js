// pages/goods/goods.js
var app = getApp()
import util from '../../utils/util.js';
import api from '../../utils/api.js';




Page({
  data: {
    //公用图片前缀
    images: "https://sigu.59chuang.com",
    imgUrls: [
      'https://sigu.59chuang.com/img/loop1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    //文章数据
    indexlist: '',
  },

  onLoad: function () {

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
              
              let userData = "?siguCode=" + lres.code+"&avatarUrl=" + avatarUrl + "&city=" + city + "&country=" + country + "&gender=" + gender + "&language=" + language + "&nickName=" + nickName + "&province=" + province;
              util.postJSON(api.config.WECHAT_AUTH + userData +  function (res) {
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
                    // 取消
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

    wx.showLoading({
      title: '加载中',
    })

    let that = this;
    



    let listData = {
      categoryid: '',
      pageNo: '1',
      pageSize: '10',
    }

    util.postJSON(api.config.COM_ARTICLE_LIST, listData, function (res) {

      if (res.success == true) {
        let _data = res.obj;
        that.setData({
          indexlist: _data
        });

        setTimeout(function () {
          wx.hideLoading()
        }, 2000)

      } else {
        wx.showToast({
          title: '网络错误',
        })
      }
    });



  },


  //跳转投票页面
  lookintoBtn: function () {
    wx.navigateTo({
      url: '/pages/lookinto/lookinto'
    })
  },

  //文章详情
  copyBtn:function(event){
    let copyid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/copy/copy?id=' + copyid
    })

  },



})