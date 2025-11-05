// request.js
// 用于给后端发送请求或其他异步函数，所有函数都应该返回一个Promise对象
import config from "../config"
import { getOpenid, showPleaseRegisterAlert } from './util'

/**
 * 登录
 */
async function doLogin() {
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
async function fetchSessionData(code) {
    return new Promise((resolve, reject) => {
        // 发送请求，获取openid
        wx.request({
            url: config.serverApis.session,
            method: "GET",
            data: {
                code,
                'from': config.appid
            },
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 获取session数据后调用，根据openid从后端获取用户数据，并将数据保存至本地
 * @param {*} openid 
 */
async function fetchUserData(openid) {
    return new Promise((resolve, reject) => {
        // 发送请求、获取data
        wx.request({
            url: config.serverApis.getUserInfo,
            method: "GET",
            data: { openid },
            success: resolve,
            fail: reject
        })
    })
}

async function register(data, globalData) {
    // 取数据
    // 这个函数跟原页面耦合度还是有点大，因为事先不知道后端的存在，导致跟后端字段名约束错位，实际工程不应该出现这种代码
    const { num: id, enter_year: changeYear, school, name, tel: telephone } = data;
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.serverApis.register,
            data: { openid: getOpenid(), globalData, name, num, school, tel, enter_year },
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 更改用户在后台的数据
 * @param field 要修改的字段名
 * @param value 要修改的值
 */
async function changeUserData(field, value) {
    const openid = getOpenid();
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.serverApis.changeData,
            data: { openid, change: field, value },
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 加入课程请求
 */
async function joinCourse() {
    const openid = getOpenid();
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.serverApis.joinCourse,
            data: { openid, courseId: config.courseId },
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 获取课程id请求
 */
async function getCourseId() {
    const openid = getOpenid();
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.serverApis.getCourseId,
            data: { openid },
            success: resolve,
            fail: reject
        })
    })
}

/**
 * 获取课程信息请求
 */
async function getCourseInfo() {
    const openid = getOpenid();
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.serverApis.getCourseInfo,
            data: { current_course_id: config.courseId, openid },
            success: resolve,
            fail: reject
        })
    })
}

module.exports = {
    // 登录函数
    doLogin,
    fetchSessionData,
    fetchUserData,
    showPleaseRegisterAlert,
    // 注册函数
    register,
    changeUserData,
    // 课程函数
    joinCourse,
    getCourseId,
    getCourseInfo
}