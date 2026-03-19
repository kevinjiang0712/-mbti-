// pages/home/home.js
Page({
  data: {
    displayCats: [],        // 随机选择的3张猫咪图片
    currentSwiperIndex: 0,  // 当前轮播索引
    pageReady: false        // 页面加载完成标志
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 清空本地存储的测试数据，确保每次进入首页都是全新开始
    wx.removeStorageSync('quiz_scores')
    wx.removeStorageSync('quiz_index')

    // 新增：随机选择3张猫咪图片
    this.selectRandomCats()

    // 新增：触发进场动画
    setTimeout(() => {
      this.setData({ pageReady: true })
    }, 100)
  },

  /**
   * 随机选择3张猫咪图片
   */
  selectRandomCats() {
    const catTypes = [
      'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
      'ISTP', 'ISFP', 'INFP', 'INTP',
      'ESTP', 'ESFP', 'ENFP', 'ENTP',
      'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
    ]

    // Fisher-Yates洗牌算法
    const shuffled = catTypes.sort(() => Math.random() - 0.5)

    // 取前3个
    const selected = shuffled.slice(0, 3).map(type => ({
      type: type,
      image: `/images/cats/${type}.jpg`
    }))

    this.setData({ displayCats: selected })
  },

  /**
   * 轮播切换事件
   */
  onSwiperChange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },

  /**
   * 长按图片显示人格名称（彩蛋）
   */
  onImageLongPress(e) {
    const type = e.currentTarget.dataset.type
    const { results } = require('../../data/results.js')
    const catData = results[type]

    if (catData) {
      // 震动反馈（降级处理）
      if (wx.vibrateShort) {
        wx.vibrateShort({ type: 'light' })
      }

      // 显示人格名称
      wx.showToast({
        title: catData.title,
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 点击emoji触发动画（趣味交互）
   */
  onCatEmojiTap() {
    // 震动反馈（降级处理）
    if (wx.vibrateShort) {
      wx.vibrateShort({ type: 'light' })
    }
  },

  /**
   * 开始测试
   */
  startQuiz() {
    wx.navigateTo({
      url: '/pages/quiz/quiz'
    })
  }
})
