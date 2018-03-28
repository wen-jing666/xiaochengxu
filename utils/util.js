function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}
function formatTime3(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 序列化参数
function serialize(obj) {
  var params = "";
  for (var k in obj) {
    if (obj[k]) {
      params = params + k + "=" + (obj[k] + '') + "&"
    }
  }
  return params.substring(0, params.length - 1);
}
// get请求
function getJSON() {
  wx.showNavigationBarLoading();
  var url, data, success, fail, complete;
  var arg_length = arguments.length;
  if (arg_length == 1) {
    url = arguments[0];
  } else if (arg_length == 2) {
    url = arguments[0];
    if (typeof arguments[1] == 'object') {
      data = argument[1];
    } else if (typeof arguments[1] == 'function') {
      success = arguments[1];
    }
  } else if (arg_length == 3) {
    url = arguments[0];
    data = arguments[1];
    success = arguments[2];
  } else if (arg_length == 4) {
    url = arguments[0];
    data = arguments[1];
    success = arguments[2];
    fail = arguments[3];
  } else if (arg_length == 5) {
    url = arguments[0];
    data = arguments[1];
    success = arguments[2];
    fail = arguments[3];
    complete = arguments[4];
  }
  wx.request({
    url: url,
    data: data || {},
    header: {
      'Authorization': 'token ' + (wx.getStorageSync('token') || 'xcx')
    },
    method: 'GET',
    success: function (res) {
      success && success.call(this, res.data);
    }, fail: function (e) {
      // console.error(e);
      alert("网络错误");
    }, complete: function (res) {
      wx.hideNavigationBarLoading();
      complete && complete.call(this, res);
    }
  })
}

// post请求
function postJSON() {
  wx.showNavigationBarLoading();
  var url, data, success, fail, complete;
  var arg_length = arguments.length;
  if (arg_length == 1) {
    url = arguments[0];
  } else if (arg_length == 2) {
    url = arguments[0];
    if (typeof arguments[1] == 'object') {
      data = argument[1];
    } else if (typeof arguments[1] == 'function') {
      success = arguments[1];
    }
  } else if (arg_length == 3) {
    url = arguments[0];
    data = arguments[1];
    success = arguments[2];
  } else if (arg_length == 4) {
    url = arguments[0];
    data = arguments[1];
    success = arguments[2];
    fail = arguments[3];
  } else if (arg_length == 5) {
    url = arguments[0];
    data = arguments[1];
    success = arguments[2];
    fail = arguments[3];
    complete = arguments[4];
  }
  wx.request({
    url: url,
    data: data || {},
    method: 'POST',
    header: {
      'Authorization': 'token ' + (wx.getStorageSync('token') || 'xcx')
    },
    success: function (res) {
      //console.debug(res.data);
      success && success.call(this, res.data);
    }, fail: function (e) {
      //console.debug(e);
      fail && fail.call(this, e);
      alert('网络错误');
    }, complete: function (res) {
      wx.hideNavigationBarLoading();
      complete && complete.call(this, res);
    }
  })
}

// showModal封装
function alert(msg, success) {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    confirmColor: "#f63658",
    success: function (res) {
      if (res.confirm) {
        success && success.call(this);
      }
    }
  })
}


// 删除左右空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 *  手机号码正则表达式
 *    @param {String} phonenumber
 *    @returns {Boolean}
 */
function checkMobile(phoneNumber) {
  if (!(/^1[3|4|5|7|8]\d{9}$/.test(phoneNumber))) {
    return false;
  } else {
    return true;
  }
}
/**
 * 数组中找元素，找到返回true,没找到返回false
 * findInArray(数组，要找的元素)
 */
function findInArray(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == item) return true;
  }
  return false;
}

/**
 * 数组去重 removeDup(数组，开始下标，结束下标)
 * removeDup(arr,0,arr.length-1)
 */
function removeDup(arr, s, e) {
  if (s > e) {
    return [];
  } else if (s == e) {
    return [arr[s]];
  }

  var c = Math.floor((s + e) / 2);
  var left = removeDup(arr, s, c);
  var right = removeDup(arr, c + 1, e);

  for (var i = 0; i < right.length; i++) {
    if (!findInArray(left, right[i])) {
      left.push(right[i]);
    }
  }
  return left;
}

module.exports = {
  serialize,
  getJSON,
  postJSON,
  alert,
  trim,
  checkMobile,
  findInArray,
  removeDup
}
