//index.js
//获取应用实例
const app = getApp()

// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../lib/bmap-wx.js');
Page({
  data: {
    weatherData: '',
    bcgImg:'',
    bcgImgList: [
      {
        src: '/img/beach-bird-birds-235787.jpg',
        topColor: '#393836'
      },
      {
        src: '/img/clouds-forest-idyllic-417102.jpg',
        topColor: '#0085e5'
      },
      {
        src: '/img/backlit-dawn-dusk-327466.jpg',
        topColor: '#2d2225'
      },
      {
        src: '/img/accomplishment-adventure-clear-sky-585825.jpg',
        topColor: '#004a89'
      },
      {
        src: '/img/fog-himalayas-landscape-38326.jpg',
        topColor: '#b8bab9'
      },
      {
        src: '/img/asphalt-blue-sky-clouds-490411.jpg',
        topColor: '#009ffe'
      },
      {
        src: '/img/aerial-climate-cold-296559.jpg',
        topColor: '#d6d1e6'
      },
      {
        src: '/img/beautiful-cold-dawn-547115.jpg',
        topColor: '#ffa5bc'
      }
    ],
    searchImg: '/img/search.png'
  },
  // 事件处理逻辑
  conformSearch: function () {

  },
  // 生命周期函数
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'zkGuWAr2YUQ1Qlyl94YiUUU8A4Xmy18e'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  onShow: function () {
    // 设置背景图片
    this.setData({
      bcgImg: this.data.bcgImgList[4].src
    })
    // this.data.bcgImg = this.data.bcgImgList[1].src
  },
  onHide: function () {

  },
  onReady: function () {

  }
})
