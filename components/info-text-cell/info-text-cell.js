// components/info-text-cell/info-text-cell.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        field: String,   // 对应页面字段名
        title: String,   // 左侧 label 文字
        value: String,    // 右侧展示值
        displayValue: { type: String, value: '' }, // 表面展示值，当存储值和展示值不一致时使用
        canNavigate: { type: Boolean, value: true }
    },

    /**
     * 组件的初始数据
     */
    data: {
        url: ''
    },

    observers: {
        'field, title, value': function (field, title, value) {
            // 注意：observers 里 this 指向组件实例
            const canNavigate = this.data.canNavigate;
            if (!canNavigate)
                return
            const newUrl = '/pages/change/change'
                + '?field=' + field
                + '&title=' + title
                + '&value=' + value;
            this.setData({ url: newUrl });
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})