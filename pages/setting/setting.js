Page({
  /**
   * 页面的初始数据
   */
  data: {
    setting: {},
    show: false,
    enableUpdate: false,
    screenBrightness: '获取中'
  },

  switchChange(e) {

    let dataset = e.currentTarget.dataset
    let switchparam = dataset.switchparam
    let setting = this.data.setting

    if (switchparam === 'forceUpdate') {
      if (this.data.enableUpdate) {
        setting[switchparam] = (e.detail || {}).value
      }
    }

    setting[switchparam] = !(e.detail || {}).value

    this.setData({
      setting,
    })

    wx.setStorage({
      key: 'setting',
      data: setting,
    })
  },

  screenBrightnessChanging (e) {
      this.setScreenBrightness(e.detail.value)
  },

  getScreenBrightness () {
    wx.getScreenBrightness({
      success: (res) => {
        this.setData({
          screenBrightness: Number(res.value * 100).toFixed(0),
        })
      },
      fail: (res) => {
        this.setData({
          screenBrightness: '获取失败'
        })
      }
    })
  },

  setScreenBrightness (val) {
    wx.setScreenBrightness({
      value: val / 100,
      success: (res) => {
        this.setData({
          screenBrightness: val
        })
      },
    })
  },

  updateInstruc() {
    this.setData({
      show: true
    })
  },
  removeStorge (e) {

    let  that = this
    let datatype = e.currentTarget.dataset.type
    if (datatype === 'menu') {
      wx.setStorage({
        key: 'pos',
        data: {
          top: 'auto',
          lef: 'auto',
        },
        success: function (res) {
          wx.showToast({
            title: '悬浮球已复位',
          })
        }
      })
    }else if (datatype === 'setting') {

      wx.showModal({
        title: '提示',
        content: '确认要初始化设置',
        cancelText: '容朕想想',
        confirmColor: '#40a7e7',
        success: (res) => {
          if (res.confirm) {
            wx.removeStorage({
              key: 'setting',
              success: function(res) {
                wx.showToast({
                  title: '设置已初始化',
                })
                that.setData({
                  setting: {}
                })
              },
            })
          }
        }
      })

    }else if (datatype === 'all') {

      wx.showModal({
        title: '提示',
        content: '确认要删除',
        cancelText: '容朕想想',
        confirmColor: '#40a7e7',
        success(res) {
          if (res.confirm) {
            wx.clearStorage({
              success: (res) => {
                wx.showToast({
                  title: '数据已清除',
                })
                that.setData({
                  setting: {},
                  pos: {}
                })
              }
            })
          }
        }
      })
    }
  },

  getHCEState () {
    wx.showLoading({
      title: '检测中...',
    })

    wx.getHCEState({
      success: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '检测结果',
          content: '高设备支持NFC功能',
          showCancel: false,
          confirmColor: '#40a7e7',
          confirmText: '朕知道了'
        })
      },
      fail: function(res) {
        wx.hideLoading()
        wx.showModal({
          title: '检测结果',
          content: '该设备不支持 NFC 功能',
          confirmColor: '#40a7e7',
          confirmText: '朕知道了'
        })
      }
    })
  },

  getsysteminfo () {
    wx.navigateTo({
      url: '/pages/systeminfo/systeminfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      this.getScreenBrightness()
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