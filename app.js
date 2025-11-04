// app.js

App({
    /**
     * 登录操作函数
     * 将嵌套的异步方法拆开，使用Promise包装后进行链式调用，保证可读性
     */
    async login() {
        const { doLogin, fetchSessionData, fetchUserData, showPleaseRegisterAlert } = require("/utils/util.js");

        try {
            const data = await doLogin()
                .then(fetchSessionData)
                .then(fetchUserData);
    
            if (!data) showPleaseRegisterAlert();
        } catch (err) {
            console.error("登录流程异常：", err);
        }
    },

    async onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        this.login();
    },
    globalData: {
        userInfo: null
    }
})
