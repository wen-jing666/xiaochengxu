// pages/goods/goods.js
var app = getApp()
import util from '../../utils/util.js';
import api from '../../utils/api.js';




Page({
  data: {
    //公用图片前缀
    images: "https://sigu.59chuang.com",
  },
  
  onLoad:function(options){
    let oId = options.id;

  },


  //关闭当前页面跳转
  navthisBtn:function(){
    wx.redirectTo({
      url: '/pages/detail/detail'
    })
  },

})