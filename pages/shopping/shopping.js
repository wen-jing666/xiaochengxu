var app = getApp()
import util from '../../utils/util.js';
import api from '../../utils/api.js';

Page({
  
  data: {
    toView: 'red',
    scrollTop: 100,
    images: "https://sigu.59chuang.com",
    imgUrls: [
      'https://sigu.59chuang.com/img/shop_01.jpg',
      'https://sigu.59chuang.com/img/shop_02.jpg',
      'https://sigu.59chuang.com/img/shop_03.jpg',
      'https://sigu.59chuang.com/img/shop_04.jpg'
    ],
  },
 
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
