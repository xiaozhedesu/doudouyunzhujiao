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

// 这个项目中各种地方都可能用到这两个操作，为了避免拼写错误，封装get/set方法
function getOpenid() { return wx.getStorageSync("jiaoxue_OPENID"); }
function setOpenid(openid) { wx.setStorageSync("jiaoxue_OPENID", openid); }

/**
 * 请注册弹窗
 */
export function showPleaseRegisterAlert() {
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

// 功能函数
module.exports = {
    formatTime,
    tmpPathToBase64,
    ensureNotNull,
    checkTelephoneCode,
    showPleaseRegisterAlert,
    getOpenid,
    setOpenid
}
