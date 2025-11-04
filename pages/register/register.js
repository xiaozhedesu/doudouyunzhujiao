// pages/register/register.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        changeYear: "",
        name: "",
        school: "",
        telephone: "",
    },

    /**
     * 提交时验证数据完整性
     */
    verify: function () {
        const { ensureNotNull, checkTelephoneCode } = require("../../utils/util");

        return ensureNotNull(this.data.id.trim(), "学号") &&
            ensureNotNull(this.data.changeYear.trim(), "转入年份") &&
            ensureNotNull(this.data.school.trim(), "学校") &&
            ensureNotNull(this.data.name.trim(), "姓名") &&
            ensureNotNull(this.data.telephone.trim(), "手机号") &&
            checkTelephoneCode(this.data.telephone.trim());
    },

    // 输入框统一更新
    onIdInput(e) { this.setData({ id: e.detail.value }); },
    onChangeYearInput(e) { this.setData({ changeYear: e.detail.value }); },
    onSchoolInput(e) { this.setData({ school: e.detail.value }); },
    onNameInput(e) { this.setData({ name: e.detail.value }); },
    onTelephoneInput(e) { this.setData({ telephone: e.detail.value }); },

    /**
     * 提交函数
     */
    submit() {
        // 验证数据
        if (!this.verify()) return;

        // 取数据
        const { id, changeYear, school,
            name, telephone } = this.data;
            
        /**
         * 提交数据至后端
         */
        const submitToServer = function () {
            const { registerService } = require("../../config");
            const app = getApp();
            wx.request({
                url: registerService,
                data: {
                    openid: wx.getStorageSync("jiaoxue_OPENID"),
                    // 保存的全局变量数据在这使用
                    globalData: JSON.stringify(app.globalData.userInfo),
                    name,
                    num: id,
                    school,
                    tel: telephone,
                    enter_year: changeYear,
                },
                success: function (res) {
                    console.log(res.data.success ? "成功" : "并非成功", "的输出：", res);

                    if (res.data.is_register) {
                        // 原login页面已经被我放到index里了
                        console.log("注册成功，跳转到首页");
                        wx.switchTab({
                            url: '/pages/index/index',
                        })
                    }
                },
                fail: (err) => {
                    console.log("失败: ", err);
                }
            })
        }

        // 提交数据
        submitToServer();

        // 完成后跳转
        wx.showModal({
            title: "提交成功",
            content: "即将跳转：我的页面",
            showCancel: false,
            complete: (res) => {
                if (res.confirm) {
                    wx.switchTab({ url: '/pages/my/my' })
                }
            }
        });
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