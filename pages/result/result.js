// pages/result/result.js
const { results } = require('../../data/results.js')
const { calculateType } = require('../../utils/calculator.js')
const { saveTestRecord } = require('../../utils/db.js')

// 小程序码云存储路径
const QRCODE_URL = 'cloud://wechat-env-260305-9em2hcd281d948.7765-wechat-env-260305-9em2hcd281d948-1408536075/assets/qrcode.png'

Page({
  data: {
    resultData: null,
    personalityType: '',
    showPosterModal: false,
    posterImagePath: '',
    isGenerating: false
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

    // 异步保存测试记录到云数据库（不阻塞页面展示）
    saveTestRecord({
      type: type,
      title: resultData.title,
      scores: scores
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
  },

  /**
   * 分享给好友
   */
  onShareAppMessage() {
    const { resultData, personalityType } = this.data
    return {
      title: resultData.shareTitle || `我家猫是 ${personalityType}`,
      path: '/pages/home/home',
      imageUrl: resultData.image
    }
  },

  /**
   * 生成海报
   */
  async generatePoster() {
    if (this.data.isGenerating) return

    this.setData({ isGenerating: true })
    wx.showLoading({ title: '正在召唤魔法海报...', mask: true })

    try {
      // 并行下载猫咪图片和小程序码
      const [catImagePath, qrcodePath] = await Promise.all([
        this.downloadImage(this.data.resultData.image),
        this.downloadImage(QRCODE_URL)
      ])

      // 绘制海报
      await this.drawPoster(catImagePath, qrcodePath)
    } catch (err) {
      console.error('生成海报失败:', err)
      wx.showToast({ title: '海报生成失败，请重试', icon: 'none' })
      this.setData({ isGenerating: false })
    }
  },

  /**
   * 获取图片本地路径（兼容本地、云存储、网络图片）
   */
  downloadImage(url) {
    return new Promise((resolve, reject) => {
      // 本地图片：通过 getImageInfo 获取可用路径
      if (url.startsWith('/')) {
        wx.getImageInfo({
          src: url,
          success: (res) => resolve(res.path),
          fail: reject
        })
        return
      }
      // 云存储图片：使用 wx.cloud.downloadFile
      if (url.startsWith('cloud://')) {
        wx.cloud.downloadFile({
          fileID: url,
          success: (res) => resolve(res.tempFilePath),
          fail: reject
        })
        return
      }
      // 网络图片：下载到本地
      wx.downloadFile({
        url: url,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.tempFilePath)
          } else {
            reject(new Error('下载图片失败'))
          }
        },
        fail: reject
      })
    })
  },

  /**
   * 使用 Canvas 2D 绘制海报
   */
  drawPoster(catImagePath, qrcodePath) {
    return new Promise((resolve, reject) => {
      const query = wx.createSelectorQuery()
      query.select('#posterCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0]) {
            reject(new Error('Canvas not found'))
            return
          }

          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          const dpr = wx.getWindowInfo().pixelRatio

          // 海报尺寸 750 x 1334
          const width = 375
          const height = 667
          canvas.width = width * dpr
          canvas.height = height * dpr
          ctx.scale(dpr, dpr)

          // 1. 绘制渐变背景
          const gradient = ctx.createLinearGradient(0, 0, 0, height)
          gradient.addColorStop(0, '#1A1A2E')
          gradient.addColorStop(0.5, '#211347')
          gradient.addColorStop(1, '#30205D')
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, width, height)

          // 2. 绘制星星粒子
          this.drawStars(ctx, width, height)

          // 3. 绘制顶部标题
          ctx.fillStyle = '#FFFFFF'
          ctx.font = 'bold 18px PingFang SC'
          ctx.textAlign = 'center'
          ctx.shadowColor = 'rgba(213, 128, 255, 0.8)'
          ctx.shadowBlur = 10
          ctx.fillText('✦ 猫咪人格塔罗牌 ✦', width / 2, 50)
          ctx.shadowBlur = 0

          // 4. 加载猫咪图片和二维码
          const catImg = canvas.createImage()
          const qrcodeImg = canvas.createImage()
          let loadedCount = 0

          const onAllLoaded = () => {
            loadedCount++
            if (loadedCount < 2) return

            // 绘制卡片背景（带发光边框效果）
            const cardX = (width - 240) / 2
            const cardY = 70
            const cardW = 240
            const cardH = 240
            const cardRadius = 22

            // 发光效果
            ctx.shadowColor = 'rgba(213, 128, 255, 0.6)'
            ctx.shadowBlur = 25
            ctx.fillStyle = '#100C2A'
            this.roundRect(ctx, cardX - 3, cardY - 3, cardW + 6, cardH + 6, cardRadius + 3)
            ctx.fill()
            ctx.shadowBlur = 0

            // 绘制渐变边框
            const borderGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH)
            borderGradient.addColorStop(0, '#F9DC5C')
            borderGradient.addColorStop(0.5, '#D580FF')
            borderGradient.addColorStop(1, '#50FFB4')
            ctx.strokeStyle = borderGradient
            ctx.lineWidth = 3
            this.roundRect(ctx, cardX, cardY, cardW, cardH, cardRadius)
            ctx.stroke()

            // 绘制猫咪图片（带圆角）
            ctx.save()
            this.roundRect(ctx, cardX + 3, cardY + 3, cardW - 6, cardH - 6, cardRadius - 2)
            ctx.clip()
            ctx.drawImage(catImg, cardX + 3, cardY + 3, cardW - 6, cardH - 6)
            ctx.restore()

            // 绘制SSR标志
            ctx.fillStyle = '#FFFFFF'
            ctx.font = 'bold 16px Times New Roman'
            ctx.shadowColor = '#F9DC5C'
            ctx.shadowBlur = 15
            ctx.fillText('SSR', cardX + 30, cardY + 30)
            ctx.shadowBlur = 0

            // 5. 绘制人格类型名称
            const { resultData } = this.data
            ctx.fillStyle = '#FFFFFF'
            ctx.font = 'bold 24px PingFang SC'
            ctx.textAlign = 'center'
            ctx.shadowColor = 'rgba(213, 128, 255, 0.9)'
            ctx.shadowBlur = 12
            ctx.fillText(`${resultData.type} · ${resultData.title}`, width / 2, cardY + cardH + 40)
            ctx.shadowBlur = 0

            // 6. 绘制标签
            const tags = resultData.tags.slice(0, 3)
            const tagText = tags.map(t => `#${t}`).join('  ')
            ctx.fillStyle = '#E2D4F0'
            ctx.font = '14px PingFang SC'
            ctx.fillText(tagText, width / 2, cardY + cardH + 70)

            // 7. 绘制小程序码（圆形裁剪）
            const qrSize = 80
            const qrX = (width - qrSize) / 2
            const qrY = cardY + cardH + 95

            // 绘制白色圆形背景
            ctx.fillStyle = '#FFFFFF'
            ctx.beginPath()
            ctx.arc(qrX + qrSize / 2, qrY + qrSize / 2, qrSize / 2 + 4, 0, Math.PI * 2)
            ctx.fill()

            // 绘制小程序码（圆形裁剪）
            ctx.save()
            ctx.beginPath()
            ctx.arc(qrX + qrSize / 2, qrY + qrSize / 2, qrSize / 2, 0, Math.PI * 2)
            ctx.clip()
            ctx.drawImage(qrcodeImg, qrX, qrY, qrSize, qrSize)
            ctx.restore()

            // 8. 绘制底部引导文案
            ctx.fillStyle = '#DED0E6'
            ctx.font = '12px PingFang SC'
            ctx.fillText('长按识别 · 测你家猫性格', width / 2, qrY + qrSize + 25)

            // 导出图片
            wx.canvasToTempFilePath({
              canvas: canvas,
              success: (res) => {
                wx.hideLoading()
                this.setData({
                  posterImagePath: res.tempFilePath,
                  showPosterModal: true,
                  isGenerating: false
                })
                resolve()
              },
              fail: (err) => {
                wx.hideLoading()
                this.setData({ isGenerating: false })
                reject(err)
              }
            })
          }

          const onError = (err) => {
            wx.hideLoading()
            this.setData({ isGenerating: false })
            reject(err)
          }

          catImg.onload = onAllLoaded
          catImg.onerror = onError
          qrcodeImg.onload = onAllLoaded
          qrcodeImg.onerror = onError

          catImg.src = catImagePath
          qrcodeImg.src = qrcodePath
        })
    })
  },

  /**
   * 绘制星星粒子
   */
  drawStars(ctx, width, height) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * 2 + 0.5
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  },

  /**
   * 绘制圆角矩形路径
   */
  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.arcTo(x + w, y, x + w, y + r, r)
    ctx.lineTo(x + w, y + h - r)
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
    ctx.lineTo(x + r, y + h)
    ctx.arcTo(x, y + h, x, y + h - r, r)
    ctx.lineTo(x, y + r)
    ctx.arcTo(x, y, x + r, y, r)
    ctx.closePath()
  },

  /**
   * 关闭海报弹窗
   */
  closePosterModal() {
    this.setData({ showPosterModal: false })
  },

  /**
   * 保存海报到相册
   */
  savePosterToAlbum() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterImagePath,
      success: () => {
        wx.showToast({
          title: '已保存，快去分享给好友吧 ✦',
          icon: 'none',
          duration: 2500
        })
        this.setData({ showPosterModal: false })
      },
      fail: (err) => {
        if (err.errMsg.includes('auth deny') || err.errMsg.includes('authorize')) {
          // 用户拒绝授权，引导去设置
          wx.showModal({
            title: '需要相册权限',
            content: '请在设置中开启相册权限，以保存海报',
            confirmText: '去设置',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        } else {
          wx.showToast({ title: '保存失败，请重试', icon: 'none' })
        }
      }
    })
  }
})
