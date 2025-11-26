// pages/register/register.js
import { ensureNotNull, checkTelephoneCode } from "../../utils/util"
import { register } from "../../utils/request"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: "",
        enter_year: "",
        name: "",
        school: "",
        tel: "",
    },

    /**
     * 提交时验证数据完整性
     */
    verify: function () {
        return ensureNotNull(this.data.num.trim(), "学号") &&
            ensureNotNull(this.data.enter_year.trim(), "转入年份") &&
            ensureNotNull(this.data.school.trim(), "学校") &&
            ensureNotNull(this.data.name.trim(), "姓名") &&
            ensureNotNull(this.data.tel.trim(), "手机号") &&
            checkTelephoneCode(this.data.tel.trim());
    },

    // 输入框统一更新
    onNumInput(e) { this.setData({ num: e.detail.value }); },
    onEnterYearInput(e) { this.setData({ enter_year: e.detail.value }); },
    onSchoolInput(e) { this.setData({ school: e.detail.value }); },
    onNameInput(e) { this.setData({ name: e.detail.value }); },
    onTelInput(e) { this.setData({ tel: e.detail.value }); },

    /**
     * 提交函数
     */
    async submit() {
        // 验证数据
        if (!this.verify()) return;

        // 提交数据
        const app = getApp();
        const userInfoStr = JSON.stringify(app.globalData.userInfo);
        // 保存的全局变量数据传入函数被传进后端
        const response = await register(this.data, userInfoStr)
            .catch(err => console.log("失败: ", err))
        console.log(response.data.success ? "成功" : "并非成功", "的输出：", response);

        if (response.data.is_register) {
            // 原login页面已经被我放到index里了
            console.log("注册成功，跳转到首页");
            wx.switchTab({ url: '/pages/index/index', })
        }
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
    onHnume() {

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