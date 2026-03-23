/**
 * 云数据库操作模块
 */

/**
 * 保存测试记录到云数据库
 * @param {Object} data - 测试数据
 * @param {string} data.type - MBTI类型 (如 'ISTJ')
 * @param {string} data.title - 人格称号 (如 '秩序守卫猫')
 * @param {Object} data.scores - 原始得分对象
 */
async function saveTestRecord(data) {
  const db = wx.cloud.database()
  try {
    await db.collection('test_records').add({
      data: {
        type: data.type,
        title: data.title,
        scores: data.scores,
        testTime: new Date().toISOString(),
        createTime: db.serverDate()
      }
    })
    console.log('测试记录已保存')
  } catch (err) {
    console.error('保存测试记录失败:', err)
    // 静默失败，不影响用户体验
  }
}

module.exports = { saveTestRecord }
