// config.js
/**
 * 后端请求基地址
 */
const serverApi = "https://zjgsujiaoxue.applinzi.com/index.php/Api"
/**
 * 获取session的url
 */
const sessionService = serverApi + "/Weixin/code_to_openidv2";
/*: 'https://api.weixin.qq.com/sns/jscode2session'*/
/**
 * 获取用户数据的url
 */
const getInfoService = serverApi + '/User/getInfo';
/**
 * 提交用户数据时使用的url
 */
const registerService = serverApi + '/User/register_by_openid';
/**
 * 修改用户数据时使用的url
 */
const changeDataService = serverApi + '/User/updateInfo';
/**
 * 获取的课程id
 * https://zjgsujiaoxue.applinzi.com/index.php/Api/User/createCourse?
 * ?appid=wx579d5d156e58825d
 * &courseName=大家一起来0721
 * &questionSet=1012
 * &creater=xiaozhedesu
 */
const courseId = 14645
/**
 * 加入课程
*/
const joinCourseService = serverApi + '/User/addCourse'
/**
 * 获取课程号
 */
const getCourseIdService = serverApi + '/User/getAddedCourse'
/**
 * 获取课程信息
 */
const getCourseInfoService = serverApi + '/User/current'
/**
 * 项目的appid，按理说不应该在js文件写死并上传来着
 */
const appid = "wx579d5d156e58825d";

module.exports = {
    sessionService,
    getInfoService,
    registerService,
    changeDataService,
    courseId,
    joinCourseService,
    getCourseIdService,
    getCourseInfoService,
    appid
}