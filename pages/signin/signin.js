// pages/signin/signin.js

/**
 * 取WGS84标准的地球长半径
 */
const EARTH_RADIUS = 6378137.0;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        motto: "Hello, World!",
        choosen: null,
        choosenFlag: false,
        got: null,
        gotFlag: false,
    },

    /**
     * 选择位置触发函数
     */
    chooseLocation: function () {
        wx.chooseLocation({
            type: "gcj02",
            success: res => {
                console.log(res);
                // 强制保留5位小数，确保显示块不被挤开
                res.longitude = res.longitude.toFixed(5);
                res.latitude = res.latitude.toFixed(5);
                this.setData({ choosen: res, choosenFlag: true })
            }
        })
    },

    /**
     * 获取当前位置触发函数
     */
    getLocation: function () {
        wx.getLocation({
            type: "gcj02",
            success: res => {
                console.log(res);
                // 强制保留5位小数，确保显示块不被挤开
                res.longitude = res.longitude.toFixed(5);
                res.latitude = res.latitude.toFixed(5);
                this.setData({ got: res, gotFlag: true });
            }
        })
    },

    /**
     * 将度转换成弧度
     * @param {*} d 度
     */
    toRad: function (d) {
        return d * Math.PI / 180.0;
    },

    /**
     * 测距触发函数
     * 使用Haversine公式计算球面距离
     */
    calculate: function () {
        const x1 = this.data.choosen.longitude;
        const y1 = this.data.choosen.latitude;
        const x2 = this.data.got.longitude;
        const y2 = this.data.got.latitude;

        const radY1 = this.toRad(y1);
        const radY2 = this.toRad(y2);
        const a = this.toRad(x1) - this.toRad(x2);
        const b = this.toRad(y1) - this.toRad(y2);
        let s = 2 * Math.asin(Math.sqrt(
            Math.pow(Math.sin(b / 2), 2) +
            Math.cos(radY1) * Math.cos(radY2) * Math.pow(Math.sin(a / 2), 2)
        ));
        s = (s * EARTH_RADIUS).toFixed(2);
        
        this.setData({motto: s + "m"});
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