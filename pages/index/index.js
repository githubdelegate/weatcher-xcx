//index.js
//获取应用实例
const app = getApp()
let globalData = getApp().globalData
let sytemInfo = globalData.sytemInfo
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../lib/bmap-wx.js');
var utils = require('../../utils/util.js');
var messages = require('../../data/message.js');

Page({
  data: {
    weatherData: {},
    openSetingBtnShow: false,
    bcgImg:'',
    hasPopped: false,
    bcgColor: '',
    message: '',
    animationMain: {},
    animationOne: {},
    animationTwo: {},
    animationThree: {},
    icons: ['/img/clothing.png', '/img/carwashing.png', '/img/pill.png', '/img/running.png', '/img/sun.png'],
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
  // 设置 UI 背景
  setNavigationBarColor (color) {
    let bcgColot = color || this.data.bcgColor
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.bcgColor
    })
  },

  // UI 事件处理
  menuMain () {
    if (!this.data.hasPopped) {
      this.popp()
      this.setData({
        hasPopped: true
      })
    }else{
      this.takeback()
      this.setData({
        hasPopped: false
      })
    }
  },
  menuThree() {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  // 弹出选项
  popp () {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationThree = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(180).step()
    animationOne.translate(-50, -60).rotateZ(360).opacity(1).step()
    animationTwo.translate(-90, 0).rotateZ(360).opacity(1).step()
    animationThree.translate(-50, 60).rotateZ(360).opacity(1).step()
    this.setData({
      animationMain: animationMain.export(),
      animationOne: animationOne.export(),
      animationTwo: animationTwo.export(),
      animationThree: animationThree.export(),
    })
  },
  // 收齐选项
  takeback () {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    let animationThree = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(0).step()
    animationOne.translate(0, 0).rotateZ(0).opacity(0).step()
    animationTwo.translate(0, 0).rotateZ(0).opacity(0).step()
    animationThree.translate(-0, 0).rotateZ(0).opacity(0).step()
    this.setData({
      animationMain: animationMain.export(),
      animationOne: animationOne.export(),
      animationTwo: animationTwo.export(),
      animationThree: animationThree.export(),
    })
  },
  // 事件处理逻辑
  init (param) {
    let BMap = new bmap.BMapWX({
      ak: globalData.ak
    })

    BMap.weather({
      location: param.location,
      fail: this.fail,
      success: this.success,
    })
  },
  conformSearch (res) {
    console.log(res)
    let val = ((res.detail || {}).value).replace(/\s+/g,'')
    this.search(val)
  },
  search (val) {

  },
  fail (res) {
    console.log(data)
    wx.stopPullDownRefresh()

  },
  success (data) {
    console.log(data)
    wx.stopPullDownRefresh()
    this.setData({
      
    })
    // 设置天气信息
    let now = new Date()
    data.updateTime = now.getTime()
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
    let results = data.originalData.results[0] || {}
    data.pm = utils.pm(results['pm25'])
    data.temperature = `${results.weather_data[0].date.match(/\d+/g)[2]}`
    this.setData({
      weatherData: data,
      openSetingBtnShow: false
    })
    // let now = new Date()
    // data.updateTime = now.getTime()
    // let results = data.originalData.results[0] || {}
    // data.pm  = this.calcPM(results['pm25'])

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
      // var weatherData = data.currentWeather[0];
      // weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        // weatherData: weatherData
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
    let i = utils.random(0,5)
    this.setData({
      bcgImg: this.data.bcgImgList[i].src,
      bcgColor: this.data.bcgImgList[i].topColor
    })
    this.setNavigationBarColor()
    // this.data.bcgImg = this.data.bcgImgList[1].src
    this.init({});
    this.setData({
      message: messages.messages()
    })

    if (openSetingBtnShow) {
      wx.showToast({
        title: '请开启定位权限',
      })
    }
  },
  onHide: function () {

  },
  onReady: function () {

  }
})
