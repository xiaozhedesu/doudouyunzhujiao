// pages/userLogin/userLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 获取用户授权数据
   */
  onGetUserInfo() {
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
          console.log("用户授权的信息：", res.userInfo);
          // 将用户信息保存到全局
          const app = getApp();
          app.globalData.userInfo = res.userInfo;
      },
      fail: (err) => {
          console.log("用户数据获取失败：", err);
      }
    })

    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})