// app.js
import config from "./config"
import { showPleaseRegisterAlert, setOpenid } from './utils/util'
import { doLogin, fetchSessionData, fetchUserData, joinCourse, getCourseId } from './utils/request'

App({
    /**
     * 登录操作函数
     * 将嵌套的异步方法拆开，使用Promise包装后await顺序调用，保证可读性
     */
    async login() {
        try {
            // 先登录
            const code = await doLogin();

            // 然后获取openid
            const session = await fetchSessionData(code);
            console.log("openid请求成功！\n", session.data)
            const openid = session.data.openid;
            setOpenid(openid)

            // 再获取userInfo
            const response = await fetchUserData(openid);
            const data = response.data.data;
            wx.setStorageSync('userInfo', data);
            console.log("用户在后端的信息：", data)

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

    showStorage() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },

    async onLaunch() {
        this.showStorage();
        this.login();
        this.course();
    },

    globalData: {
        userInfo: null
    }
})
