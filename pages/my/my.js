// pages/goods/goods.js
var app = getApp()
import util from '../../utils/util.js';
import api from '../../utils/api.js';


Page({
  data: {
    images: "https://sigu.59chuang.com",
    src:'https://sigu.59chuang.com/img/bg_img.jpg',
    url:'https://sigu.59chuang.com/img/bg_color.png',
    img:"https://sigu.59chuang.com/img/head.jpg",
    name:'斯谷一',
    qianming:'一天的生活从早餐开始',
    more:'没有更多内容了',
  },
  onLoad:function(){
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

              util.postJSON(api.config.WECHAT_AUTH + '?siguCode=' + lres.code, function (res) {
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

                          util.postJSON(api.config.WECHAT_AUTH + '?siguCode=' + lres.code, function (res) {
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
  onShow:function(){
  
    let that = this;
    
    let user = wx.getStorageSync('userInfo');

    if (user !=''){

      let name = user.nickName;
      let img = user.avatarUrl;

      that.setData({
        name,
        img
      })

    }

  },


})
