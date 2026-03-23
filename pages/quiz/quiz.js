// pages/quiz/quiz.js
const { questions } = require('../../data/questions.js')
const { initScores } = require('../../utils/calculator.js')

Page({
  data: {
    currentIndex: 0,
    totalQuestions: 12,
    currentQuestion: {},
    selectedOption: null,
    scores: {},
    progress: 8.33 // 第一题的初始进度 (1/12)*100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化数据
    this.setData({
      currentQuestion: questions[0],
      scores: initScores(),
      totalQuestions: questions.length
    })
  },

  /**
   * 选择选项
   */
  selectOption(e) {
    const optionIndex = parseInt(e.currentTarget.dataset.index)
    const selectedScore = this.data.currentQuestion.options[optionIndex].score

    // 更新选中状态
    this.setData({
      selectedOption: optionIndex
    })

    // 更新分数
    const newScores = { ...this.data.scores }
    newScores[selectedScore] = newScores[selectedScore] + 1
    this.setData({
      scores: newScores
    })

    // 延迟进入下一题（给用户选中反馈）
    setTimeout(() => {
      this.nextQuestion()
    }, 300)
  },

  /**
   * 进入下一题
   */
  nextQuestion() {
    const nextIndex = this.data.currentIndex + 1

    // 最后一题答完，直接跳转结果页
    if (nextIndex >= this.data.totalQuestions) {
      this.viewResult()
      return
    }

    // 更新题目
    this.setData({
      currentIndex: nextIndex,
      currentQuestion: questions[nextIndex],
      selectedOption: null,
      progress: ((nextIndex + 1) / this.data.totalQuestions) * 100
    })
  },

  /**
   * 查看结果
   */
  viewResult() {
    // 保存分数到本地存储
    wx.setStorageSync('quiz_scores', this.data.scores)

    // 跳转到结果页
    wx.redirectTo({
      url: '/pages/result/result'
    })
  }
})
