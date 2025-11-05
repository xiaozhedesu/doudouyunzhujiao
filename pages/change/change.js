// pages/change/change.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        input: ""
    },

    onInput: function (e) {
        this.setData({ input: e.detail.value })
    },

    goBack() {
        wx.navigateBack()
    },

    /**
     * 保存按钮，向后端提交修改的数据
     */
    save: function () {
        let value = this.data.input.trim();

        // 判空
        if (!value) {
            wx.showToast({ title: this.data.title + '不能为空', icon: 'error' });
            return;
        }

        // 单独处理性别值
        if (this.data.field === "sex") {
            value = value === "男" ? "1" :
                value === "女" ? "2" : "0";
            console.log(value)
        }

        let userInfo = wx.getStorageSync("userInfo")

        // 判同
        if (value === userInfo[this.data.field]) {
            wx.showToast({ title: this.data.title + '相同', icon: 'error' });
            return
        }

        // 修改
        const { changeUserData } = require("../../utils/util")
        changeUserData(this.data.field, value)
            .then(res => {
                if (!res.data.success) {
                    console.log(res.data)
                    wx.showToast({
                        title: this.data.title + '修改失败',
                        icon: "error"
                    })
                    // 在这里使用navigateBack会导致用户连错误弹窗都看不到就直接回到上一页，故删除
                    return
                }

                console.log("change " + this.data.field + ": " + userInfo[this.data.field] + "->" + value)
                userInfo[this.data.field] = value
                wx.setStorageSync('userInfo', userInfo)
                wx.navigateBack()
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取传入的原始信息
        this.setData({
            title: "修改" + options.title,
            field: options.field,
            oldValue: options.value
        })
        if (this.data.field === "sex") {
            this.setData({ message: "> 请输入'男'或'女'。" })
        }
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