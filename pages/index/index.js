// index.js
import { getCourseInfo, getQuesCount } from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current_course: {},
        que_count: 0
    },

    /**
  * 点击收藏模块
  */
    tapInletsSC(e) {
        const collection = e.currentTarget.dataset.collection;
        // 数量不为0就跳转
        if (Number(collection)) {
            wx.navigateTo({
                url: '/page/answer/answer_info/info?subject=subject&type=wdsc'
            });
        } else {
            wx.showModal({
                title: '提示',
                content: '收藏数量为 0！',
                showCancel: false,
                confirmText: '了解'
            });
        }
    },

    /**
     * 点击答题模块（错题集）
     */
    tapInletsCT(e) {
        const answerError = e.currentTarget.dataset.answerError;
        // 数量不为0就跳转
        if (Number(answerError)) {
            wx.navigateTo({
                url: '/page/answer/answer_info/info?subject=subject&type=wdct'
            });
        } else {
            wx.showModal({
                title: '提示',
                content: '暂无错题记录！',
                showCancel: false,
                confirmText: '了解'
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取课程信息，如果有别的逻辑再提取成函数
        getCourseInfo().then(response => {
            const current_course = response.data.data
            console.log("课程信息：", current_course)
            this.setData({ current_course })
        })

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
        getQuesCount().then(res => {
            this.setData({ que_count: res.data.msg })
        })
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