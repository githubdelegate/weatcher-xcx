// pages/about/about.js.jsl

let utils = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
      projectUrl: 'xxxxx',
      github: 'xxxxx',
      email: 'xxxxxx',
      qq: 'xxxxxx',
      swiperHeight: 'auto',
      bannerImgList: [
        {
          src: 'https://raw.githubusercontent.com/myvin/miniprogram/master/quietweather/images/miniqrcode.jpg',
          title: 'Quiet Weather',
        },
        {
          src: 'https://raw.githubusercontent.com/myvin/miniprogram/master/juejin/images/miniqrcode.jpg',
          title: '掘金第三方版',
        },
      ],
  },
  setSwiperH (res) {
    this.setData({
      swiperHeight: `${(res.windowWidth || res.screenWidth) / 375 * 200}px`
    })
  },

  previewImages (e) {
    let index = e.currentTarget.dataset.index || 0
    let urls = this.data.bannerImgList
    let arr = []
    let imgs = urls.forEach(item => {
      arr.push(item.src)
    })

    wx.previewImage({
      urls: arr,
      current: arr[index],
      success: function (res) {},
      fail: function (res) {
        console.error(res)
      }
    })
  },
  copy (e) {
    let dataset = (e.currentTarget || {}).dataset || {}
    let title = dataset.title || ''
    let content = dataset.content || ''
    wx.setClipboardData({
      data: content,
      success () {
        wx.showToast({
          title: `已复制${title}`,
          duration: 2000
        })
      },
    })
  },
  initSwiper () {
    let systemInfo = getApp().globalData.systemInfo
    if (utils.isEmptyObject(systemInfo)) {
      wx.getSystemInfo({
        success: (res) => {
          this.setSwiperH(res)
        },
      })
    }else {
      this.setSwiperH(systemInfo)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.initSwiper()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})