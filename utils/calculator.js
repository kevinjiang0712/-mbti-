/**
 * 计算MBTI类型
 * @param {Object} scores - 分数对象 { E: 2, I: 1, S: 1, N: 2, T: 2, F: 1, J: 1, P: 2 }
 * @returns {String} - MBTI类型，如 'ENTJ'
 */
function calculateType(scores) {
  // 每个维度取得分较高的字母（每维度3题，得分≥2即取该字母）
  const EI = scores.E >= 2 ? 'E' : 'I'
  const SN = scores.S >= 2 ? 'S' : 'N'
  const TF = scores.T >= 2 ? 'T' : 'F'
  const JP = scores.J >= 2 ? 'J' : 'P'

  return EI + SN + TF + JP
}

/**
 * 初始化分数对象
 * @returns {Object} - 初始分数对象
 */
function initScores() {
  return {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  }
}

module.exports = {
  calculateType,
  initScores
}
