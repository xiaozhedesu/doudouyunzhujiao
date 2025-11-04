const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

/**
 * 验证数据非空
 * @param {string} dataString 要验证的数据字段
 * @param {string} message 名称
 */
const ensureNotNull = function (dataString, message) {
    if (!dataString) {
        wx.showModal({
            title: "提交失败",
            content: message + "不能为空！",
            showCancel: false
        });
        return false;
    }
    return true;
}

/**
 * 判断一段字符串是否为中国大陆手机号
 * @param {string} teleStr
 * @returns {boolean}
 */
const checkTelephoneCode = function (teleStr) {
    const isTelephoneCode = /^1[3-9]\d{9}$/.test(String(teleStr));
    if (!isTelephoneCode) {
        wx.showModal({
            title: "提交失败",
            content: teleStr + "不是一个合格的大陆手机号！",
            showCancel: false
        });
    }
    return isTelephoneCode;
}

/**
 * 根据图片地址将获取的数据转为base64储存
 * @param {string} tmpPath 图片地址
 * @return base64编码的图片
 */
export async function tmpPathToBase64(tmpPath) {
    return new Promise((resolve, reject) => {
        wx.getFileSystemManager().readFile({
            filePath: tmpPath,
            encoding: 'base64',
            success: res => resolve('data:image/jpeg;base64,' + res.data),
            fail: reject
        });
    });
}

/**
 * 登录
 */
const doLogin = async function () {
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                if (res.code)
                    resolve(res.code);
                else
                    reject(new Error('wx.login 未返回 code'))
            },
        })
    })
}

/**
 * 登录后调用，根据code从后端拿session数据
 * @param {*} code 
 */
const fetchSessionData = async function (code) {
    const { sessionService, appid } = require("../config");
    return new Promise((resolve, reject) => {
        // 将openid保存到本地
        const getOpenid = res => {
            console.log("openid请求成功！\n", res.data)

            const openid = res.data.openid;
            wx.setStorageSync('jiaoxue_OPENID', openid)
            resolve(openid)
        }
        // 发送请求，获取openid
        wx.request({
            url: sessionService,
            method: "GET",
            data: {
                code,
                'from': appid
            },
            success: getOpenid,
            fail: reject
        })
    })
}

/**
 * 获取session数据后调用，根据openid从后端获取用户数据，并将数据保存至本地
 * @param {*} openid 
 */
const fetchUserData = async function (openid) {
    const { getInfoService } = require("../config")
    return new Promise((resolve, reject) => {
        // 将data保存到本地
        const getData = (result) => {
            const data = result.data.data;
                wx.setStorageSync('userInfo', data);  
                console.log("用户在后端的信息：", data)
                resolve(data)
        }
        // 发送请求、获取data
        wx.request({
            url: getInfoService,
            method: "GET",
            data: {openid},
            success: getData,
            fail: reject
        })
    })
}

/**
 * 请注册弹窗
 */
const showPleaseRegisterAlert = function () {
    wx.showModal({
        title: '提示',
        content: '请先注册',
        confirmText: "确定",
        showCancel: false,
        complete: (res) => {
            if (res.confirm)
                wx.navigateTo({ url: '/pages/userLogin/userLogin' })
        }
    })
}

module.exports = {
    // 功能函数
    formatTime,
    tmpPathToBase64,
    ensureNotNull,
    checkTelephoneCode,
    // 登录函数
    doLogin,
    fetchSessionData,
    fetchUserData,
    showPleaseRegisterAlert
}
