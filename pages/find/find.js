// pages/goods/goods.js
var app = getApp()
import util from '../../utils/util.js';
import api from '../../utils/api.js';




Page({
  data: {
    //公用图片前缀
    images: "https://sigu.59chuang.com",

    //列表数据
    findlist:'',
  },

  onLoad:function(){
    

  

    wx.showLoading({
      title: '加载中',
    })

    let listData = {
      categoryid: '',
      pageNo: '1',
      pageSize: '10',
      ArtType:3
    }

    util.postJSON(api.config.COM_ARTICLE_LIST, listData, function (res) {

      if (res.success == true) {
        let _data = res.obj;
        that.setData({
          findlist: _data
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


  //点击跳转detail

  navBtn: function (event){
    let that = this;
    let oId = event.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + oId
    })

  },
  
})