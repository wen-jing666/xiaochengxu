// pages/goods/goods.js
var app = getApp()
import util from '../../utils/util.js';
import api from '../../utils/api.js';

var WxParse = require('../..//plugin/wxParse/wxParse.js');



Page({
  data: {
    //公用图片前缀
    images: "https://sigu.59chuang.com",

    //保存数据
    copydatail:''
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })

    let that = this;
    let id = options.id


    util.postJSON(api.config.COM_ARTICLE_GET + '?id=' + id, function (res) {

      if (res.success == true) {
        let _data = res.obj;
        that.setData({
          copydatail: _data
        });

        WxParse.wxParse('copy60', 'html', _data.articleData.content, that, 5);

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


})