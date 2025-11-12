// config.js
/**
 * 后端请求基地址
 */
const serverApiBase = "https://zjgsujiaoxue.applinzi.com/index.php/Api"
/**
 * 向后端请求的api
 */
const serverApis = {
    /**
     * 获取 session 的 url
     * 之前使用：'https://api.weixin.qq.com/sns/jscode2session '
     */
    session: `${serverApiBase}/Weixin/code_to_openidv2`,
    /**
     * 获取用户数据的 url
     */
    getUserInfo: `${serverApiBase}/User/getInfo`,
    /**
     * 提交用户数据时使用的 url
     */
    register: `${serverApiBase}/User/register_by_openid`,
    /**
     * 修改用户数据时使用的 url
     */
    changeData: `${serverApiBase}/User/updateInfo`,
    /**
     * 加入课程
     */
    joinCourse: `${serverApiBase}/User/addCourse`,
    /**
     * 获取课程号
     */
    getCourseId: `${serverApiBase}/User/getAddedCourse`,
    /**
     * 获取课程信息
     */
    getCourseInfo: `${serverApiBase}/User/current`,
    /**
     * 获取做题数量
     */
    quesCount: `${serverApiBase}/User/getDoneQuesCount`
}
/**
 * 获取的课程id
 * https://zjgsujiaoxue.applinzi.com/index.php/Api/User/createCourse?
 * ?appid=wx579d5d156e58825d
 * &courseName=大家一起来0721
 * &questionSet=1012
 * &creater=xiaozhedesu
 */
const courseId = 14645
const courseApis = {
    /**
     * 章节
     */
    chapter: `Gateway/route?method=pingshifen.question.chapter&course_id=${courseId}`,
    /**
     * 特殊题库
     */
    special:  `Gateway/route?method=pingshifen.question.special&course_id=${courseId}`,
    /**
     * 收藏题库
     */
    collect: `Gateway/route?method=pingshifen.question.collect&course_id=${courseId}`,
    /**
     * 提交答案
     */
    submit: `Gateway/route?method=pingshifen.question.submit&course_id=${courseId}`,
    /**
     * 题目号链接
     */
    idItems: `Gateway/route?method=pingshifen.question.get_id_items&course_id=${courseId}`,
    /**
     * 题目详情
     */
    info: `Gateway/route?method=pingshifen.question.get_info&course_id=${courseId}`
}

/**
 * 项目的appid，按理说不应该在js文件写死并上传来着
 */
const appid = "wx579d5d156e58825d";

module.exports = {
    serverApis,
    courseApis,
    serverApiBase,
    courseId,
    appid
}