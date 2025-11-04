// config.js
/**
 * 获取session的url
 */
const sessionService = "https://zjgsujiaoxue.applinzi.com/index.php/Api/Weixin/code_to_openidv2";
/*: 'https://api.weixin.qq.com/sns/jscode2session'*/
/**
 * 获取用户数据的url
 */
const getInfoService = 'https://zjgsujiaoxue.applinzi.com/index.php/Api/User/getInfo';
/**
 * 提交用户数据时使用的url
 */
const registerService = 'https://zjgsujiaoxue.applinzi.com/index.php/Api/User/register_by_openid';
/**
 * 修改用户数据时使用的url
 */
const changeDataService = 'https://zjgsujiaoxue.applinzi.com/index.php/Api/User/updateInfo';
const appid = "wx579d5d156e58825d";

module.exports = {
    sessionService,
    getInfoService,
    registerService,
    changeDataService,
    appid
}