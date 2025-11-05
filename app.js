// app.js
import config from "./config"
import {doLogin, fetchSessionData, fetchUserData, showPleaseRegisterAlert, joinCourse, getCourseId} from './utils/util'

App({
    /**
     * 登录操作函数
     * 将嵌套的异步方法拆开，使用Promise包装后进行链式调用，保证可读性
     */
    async login() {
        try {
            const data = await doLogin()
                .then(fetchSessionData)
                .then(fetchUserData);

            if (!data) showPleaseRegisterAlert();
        } catch (err) {
            console.error("登录流程异常：", err);
        }
    },

    /**
     * 获取/添加课程函数
     */
    async course() {
        // 这里保存到storage的字段使用了两种不同的名称，到了要使用的地方又直接写的数据，没有用到这两个数据，说实话我不知道什么意思
        const getIdRes = await getCourseId()
        if (getIdRes.data.msg != config.courseId) {
            const joinCourseRes = await joinCourse()
            if (joinCourseRes.data.success) {
                console.log("成功加入课程： ", joinCourseRes)
                wx.setStorageSync('jiaoxue_courseList', config.courseId)
            }
            // 加入失败怎么办
        } else {
            wx.setStorageSync('jiaoxue_addCourse', getIdRes.data.msg)
        }
    },

    async onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        this.login();
        this.course();
    },
    globalData: {
        userInfo: null
    }
})
