// pages/result/result.js
const { results } = require('../../data/results.js')
const { calculateType } = require('../../utils/calculator.js')

Page({
  data: {
    resultData: null,
    personalityType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从本地存储获取分数
    const scores = wx.getStorageSync('quiz_scores')

    if (!scores) {
      // 异常情况：没有分数数据，返回首页
      wx.showToast({
        title: '未找到测试数据',
        icon: 'none',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/home/home'
            })
          }, 2000)
        }
      })
      return
    }

    // 计算人格类型
    const type = calculateType(scores)

    // 获取结果数据
    const resultData = results[type] || this.getFallbackResult()

    this.setData({
      personalityType: type,
      resultData: resultData
    })
  },

  /**
   * 获取默认结果（异常情况）
   */
  getFallbackResult() {
    return {
      type: '未知',
      title: '神秘未知猫',
      tags: ['神秘', '独特', '不可预测'],
      desc: '你的猫咪具有独特的性格，暂时无法归类。建议重新测试以获得更准确的结果。',
      image: '/images/cats/INTJ.jpg', // 使用默认图片
      shareTitle: '我家猫的人格测试结果'
    }
  },

  /**
   * 再测一次
   */
  retryQuiz() {
    // 清空数据
    wx.removeStorageSync('quiz_scores')

    // 跳转到测试页
    wx.redirectTo({
      url: '/pages/quiz/quiz'
    })
  },

  /**
   * 返回首页
   */
  backHome() {
    wx.redirectTo({
      url: '/pages/home/home'
    })
  }
})
