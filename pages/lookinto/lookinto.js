// pages/goods/goods.js
var app = getApp()
import util from '../../utils/util.js';
import api from '../../utils/api.js';




Page({
  data: {
    //公用图片前缀
    images: "https://sigu.59chuang.com",
    //视频
    videourl: "https://sigu.59chuang.com/img/e7e1d30584ad86bb4c1502c8339ab41a.mp4",
    //次数限制
    cs: '',
  },

  onLoad: function () {
    let that = this;
    let csnumber = wx.getStorageSync('csnumber');
    if (csnumber == '') {
      that.setData({
        cs: '1'
      })
    } else {
      that.setData({
        cs: csnumber
      })
    }



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
  },

  //点击投票
  voteBtn: function (event) {
    let that = this;
    let cs = event.currentTarget.dataset.cs;

    let login = wx.getStorageSync('login');

    let optionId = event.currentTarget.dataset.id;
    let loginId = login.loginId;
    let sgtoken = login.token;
    let sactivityId = '1';

    if (cs == '1') {

      let voteData = '?loginId=' + loginId + '&sgtoken=' + sgtoken + '&sactivityId=' + sactivityId + '&optionId=' + optionId;

      util.postJSON(api.config.VOTE_SAVE + voteData, function (res) {
        if (res.success == true) {
          let msg = res.msg;
          wx.showToast({
            title: msg,
          })
          wx.setStorageSync('csnumber', '2');
          that.setData({
            cs: '2'
          })
        } else {
          wx.showToast({
            title: '您已投票',
          })
        }
      });

    } else {
      wx.showToast({
        title: '您已投票',
      })
    }

  },

})