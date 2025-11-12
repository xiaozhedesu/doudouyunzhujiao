import { courseApis } from "../../../config"
const https = require('../../../public/js/douban.js');

if (!Object.assign) {
    Object.assign = require('../../../public/core/object-assign.js')
}

//获取应用实例
var app = getApp();
Page({
    data: {
        column: [{
            class: 'num',
            option: [
                {
                    "id": "3",
                    "title": "一起来0721",
                    "count": "721"
                }
            ]
        }],
    },
    onLoad(params) {
        this.data.subject = params.subject;
        this.data.type = params.type;
        var that = this;
        https.chapter(courseApis.chapter, { subject: params.subject, type: params.type }).then((data) => {
            if (data.data.status == 1) {
                that.data.subject = params.subject;
                that.data.column[0].option = data.data.data;
                that.setData(that.data);
            }
        })
        this.setData(this.data);
    },
    onUnload() {//页面卸载

    }
});