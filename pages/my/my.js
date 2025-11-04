// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sexShow: '保密',
        userInfo: {
            enter_year: '', // 入学年份
            id: '',         // 学号
            school: '',     // 学校
            name: '',       // 姓名
            sex: '0',        // 1 男 2 女 0 保密
            tel: ''         // 电话
        }
    },

    getUserData: async function () {
        const { fetchUserData } = require("../../utils/util")
        try {
            const userInfo = wx.getStorageSync('userInfo');
            // 从后端获取数据，保证userInfo存在
            if (!userInfo)
                await fetchUserData(wx.getStorageSync('jiaoxue_OPENID'));

            this.setData({ userInfo })
            this.setSexShow(this.data.userInfo.sex)     // 手动刷新性别显示
        } catch (e) {
            console.error("读取失败：", e)
        }
    },

    setSexShow(value) { this.setData({ sexShow: value === '1' ? '男' : value === '2' ? '女' : '保密' }); },

    observers: {
        sex: function (value) { this.setSexShow(value) }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserData()
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
        this.getUserData()
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