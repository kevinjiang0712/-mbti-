// app.js
App({
  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'wechat-env-260305-9em2hcd281d948',
        traceUser: true
      })
    }
    console.log('猫咪CBTI测试小程序启动')
  },

  globalData: {
    // 全局数据（如有需要）
  }
})
