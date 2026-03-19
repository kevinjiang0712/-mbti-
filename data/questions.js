// 题库数据（12题，单选）
const questions = [
  {
    id: 1,
    question: '家里来陌生人时',
    options: [
      { text: '主动靠近、嗅闻、围观', score: 'E' },
      { text: '躲起来，等人走了再出来', score: 'I' }
    ],
    dimension: 'EI'
  },
  {
    id: 2,
    question: '你回家打开门的那一刻',
    options: [
      { text: '立刻迎接、贴贴/喵喵叫', score: 'E' },
      { text: '在远处观察，慢慢靠近或不理', score: 'I' }
    ],
    dimension: 'EI'
  },
  {
    id: 3,
    question: '新玩具/新箱子出现时',
    options: [
      { text: '立刻上手研究、立刻开玩', score: 'S' },
      { text: '先观察很久，确认安全才靠近', score: 'N' }
    ],
    dimension: 'SN'
  },
  {
    id: 4,
    question: '它玩耍的"套路"',
    options: [
      { text: '更爱固定的老玩具/熟悉玩法', score: 'S' },
      { text: '经常玩出新花样、换玩法', score: 'N' }
    ],
    dimension: 'SN'
  },
  {
    id: 5,
    question: '你打翻一个小物件/杯子',
    options: [
      { text: '更像"意外"，很快走开', score: 'T' },
      { text: '更像"实验"，会反复推/看反应', score: 'F' }
    ],
    dimension: 'TF'
  },
  {
    id: 6,
    question: '你情绪低落时它的反应',
    options: [
      { text: '会靠近陪着、蹭你/趴你旁边', score: 'F' },
      { text: '依旧按自己的节奏，偶尔远远看', score: 'T' }
    ],
    dimension: 'TF'
  },
  {
    id: 7,
    question: '日常作息',
    options: [
      { text: '很规律：饭点/睡点很固定', score: 'J' },
      { text: '随心：今天早睡明天夜跑', score: 'P' }
    ],
    dimension: 'JP'
  },
  {
    id: 8,
    question: '你准备带它剪指甲/洗澡',
    options: [
      { text: '提前"警觉"，很快进入应对状态', score: 'J' },
      { text: '直到最后一刻才反应或乱跑', score: 'P' }
    ],
    dimension: 'JP'
  },
  {
    id: 9,
    question: '被你抱起时',
    options: [
      { text: '接受度高，甚至主动求抱', score: 'E' },
      { text: '明显抗拒，更喜欢保持距离', score: 'I' }
    ],
    dimension: 'EI'
  },
  {
    id: 10,
    question: '对环境变化（搬家/家具挪动）',
    options: [
      { text: '适应快，很快恢复正常', score: 'S' },
      { text: '适应慢，会反复巡逻确认', score: 'N' }
    ],
    dimension: 'SN'
  },
  {
    id: 11,
    question: '你试图"讲道理/纠正"它（比如别上桌）',
    options: [
      { text: '更像在权衡：值不值得冒险', score: 'T' },
      { text: '更像在意你的态度：会撒娇/委屈', score: 'F' }
    ],
    dimension: 'TF'
  },
  {
    id: 12,
    question: '做事风格（吃饭/玩耍/探索）',
    options: [
      { text: '有计划：先看再做，步骤感强', score: 'J' },
      { text: '即兴：想到就干，边干边改', score: 'P' }
    ],
    dimension: 'JP'
  }
]

module.exports = {
  questions
}
