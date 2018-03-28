//app.js
import util from 'utils/util.js';
import api from 'utils/api.js';

App({
  getUserInfo: function () {
    wx.login({
      success: function (res_login) {
        if (res_login.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res_user) {
              util.postJSON(api.config.WECHAT_AUTH + '?siguCode=' + res_login.code, function (res) {
                if (res.success == true) {
                  let _data = res.obj;
                  wx.setStorage({
                    loginid: _data.loginId,
                    token: _data.token,
                    login: '1'
                  })

                } else {
                  wx.showToast({
                    title: '授权失败',
                  })
                }
              });
            }
          })
        }
      }
    })
    wx.clearStorage()
  },
  

  gotoPage(options = {}) {
    let page = getCurrentPages().length;
    // console.log('mode:' + options.mode + ',page:' + page);
    if (page >= 5) {
      console.log('到第5层了');
      wx.redirectTo({
        url: options.url
      })
      return;
    }
    switch (options.mode) {
      // 保留当前页面，跳转到应用内的某个页面
      case 'navigateTo':
        wx.navigateTo({
          url: options.url
        })
        break;
      // 关闭当前页面，跳转到应用内的某个页面。
      case 'redirectTo':
        wx.redirectTo({
          url: options.url
        })
        break;
      // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      case 'switchTab':
        wx.switchTab({
          url: options.url
        })
        break;
      // 关闭当前页面，返回上一页面或多级页面
      case 'navigateBack':
        wx.navigateBack({
          delta: options.delta
        })
        break;
      // 关闭所有页面，打开到应用内的某个页面
      case 'reLaunch':
        wx.reLaunch({
          url: options.url
        })
        break;
    }
  }
})