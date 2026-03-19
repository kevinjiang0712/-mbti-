// 16种人格类型结果数据
const results = {
  'ISTJ': {
    type: 'ISTJ',
    title: '秩序守卫猫',
    tags: ['规律', '边界感', '责任心', '慢热', '稳'],
    desc: '它把家当成"可控系统"。饭点、猫砂、领地巡逻都按流程走。亲近你但不黏人，喜欢安静稳定的陪伴。你越守规矩，它越信任你。',
    image: '/images/cats/ISTJ.jpg',
    shareTitle: '我家猫是 ISTJ：秩序守卫猫'
  },
  'ISFJ': {
    type: 'ISFJ',
    title: '贴心管家猫',
    tags: ['温柔', '守护', '细腻', '依赖熟人', '体贴'],
    desc: '它会默默关注你的状态：你累了它就靠近，你起身它就跟着。对陌生人谨慎，但对"自己人"特别软。属于越相处越黏的安心型主子。',
    image: '/images/cats/ISFJ.jpg',
    shareTitle: '我家猫是 ISFJ：贴心管家猫'
  },
  'INFJ': {
    type: 'INFJ',
    title: '神秘疗愈猫',
    tags: ['安静', '洞察', '仪式感', '选择性社交', '治愈'],
    desc: '它不是不爱你，而是爱得很"挑时机"。常在你情绪波动时出现，像在做无声陪伴。它需要自己的精神角落，但也会把你划进最深的信任圈。',
    image: '/images/cats/INFJ.jpg',
    shareTitle: '我家猫是 INFJ：神秘疗愈猫'
  },
  'INTJ': {
    type: 'INTJ',
    title: '冷面霸总猫',
    tags: ['高冷', '策略', '边界清晰', '效率', '掌控感'],
    desc: '它看起来像"不需要你"，但其实在管理全局：动线、领地、资源都要最优。喜欢按它的方式亲近你：短暂贴贴、立刻撤离。越尊重它，它越认你当自己人。',
    image: '/images/cats/INTJ.jpg',
    shareTitle: '我家猫是 INTJ：冷面霸总猫'
  },
  'ISTP': {
    type: 'ISTP',
    title: '独行猎手猫',
    tags: ['动手派', '好奇', '行动快', '冷静', '单独探索'],
    desc: '它对世界充满"实操兴趣"。会拆、会试、会翻，像在做实验。情绪表达不多，但会用行动靠近：跟着你、在你脚边路过、突然把玩具丢给你。',
    image: '/images/cats/ISTP.jpg',
    shareTitle: '我家猫是 ISTP：独行猎手猫'
  },
  'ISFP': {
    type: 'ISFP',
    title: '柔软艺术猫',
    tags: ['敏感', '审美', '温柔', '随心', '需要安全感'],
    desc: '它的情绪写在动作里：尾巴、耳朵、眼神全是语言。喜欢舒服的角落与轻柔互动。你越温柔，它越愿意把肚皮和脆弱交给你。',
    image: '/images/cats/ISFP.jpg',
    shareTitle: '我家猫是 ISFP：柔软艺术猫'
  },
  'INFP': {
    type: 'INFP',
    title: '梦游诗人猫',
    tags: ['慢热', '黏人但含蓄', '浪漫', '情绪共振', '理想派'],
    desc: '它会用"只对你"的方式表达爱：深夜靠近、轻轻踩奶、把最喜欢的位置让给你。对环境变化敏感，需要你给稳定感。一旦认定你，就是长期绑定。',
    image: '/images/cats/INFP.jpg',
    shareTitle: '我家猫是 INFP：梦游诗人猫'
  },
  'INTP': {
    type: 'INTP',
    title: '研究员猫',
    tags: ['观察', '脑内剧场', '探索欲', '反直觉', '独立'],
    desc: '它常在角落"看你们忙"，但脑子一直在线。新东西先观察再下手，喜欢研究机关、缝隙、影子。你以为它不社交，其实它在用自己的方式参与生活。',
    image: '/images/cats/INTP.jpg',
    shareTitle: '我家猫是 INTP：研究员猫'
  },
  'ESTP': {
    type: 'ESTP',
    title: '冒险玩家猫',
    tags: ['胆大', '冲动', '爱热闹', '行动派', '玩心重'],
    desc: '它把家当游乐场：跳、冲、追、翻样样来。遇到陌生人也敢凑近围观。情绪来得快去得也快，最爱和你即兴玩一局，越互动越上头。',
    image: '/images/cats/ESTP.jpg',
    shareTitle: '我家猫是 ESTP：冒险玩家猫'
  },
  'ESFP': {
    type: 'ESFP',
    title: '派对小太阳猫',
    tags: ['社交', '粘人', '戏精', '表达强', '快乐源泉'],
    desc: '它的存在感很强：喵喵叫、蹭蹭蹭、到处巡演。喜欢被关注，被你夸一句能开心半天。适合把你从低落里拉出来，是家里的"情绪增益模块"。',
    image: '/images/cats/ESFP.jpg',
    shareTitle: '我家猫是 ESFP：派对小太阳猫'
  },
  'ENFP': {
    type: 'ENFP',
    title: '热情探索猫',
    tags: ['好奇', '脑洞', '亲人', '随机', '爱玩新花样'],
    desc: '它永远在发现新世界：纸袋、箱子、窗外的风都能让它兴奋。对你很亲，但不喜欢被"管太死"。给它新鲜感和互动，它就会用超高热情回报你。',
    image: '/images/cats/ENFP.jpg',
    shareTitle: '我家猫是 ENFP：热情探索猫'
  },
  'ENTP': {
    type: 'ENTP',
    title: '杠精发明猫',
    tags: ['机灵', '爱挑战', '反套路', '捣蛋', '聪明'],
    desc: '它像在跟规则对赌：你越不让它上桌，它越想研究如何上桌。爱拆、爱试、爱找漏洞。别硬刚，给它"可做的替代玩法"，它会把聪明用在跟你合作上。',
    image: '/images/cats/ENTP.jpg',
    shareTitle: '我家猫是 ENTP：杠精发明猫'
  },
  'ESTJ': {
    type: 'ESTJ',
    title: '领地管理猫',
    tags: ['主导', '规则', '强势', '效率', '边界明确'],
    desc: '它会明确划分领地与秩序：哪里能去、哪里不能去，它说了算。对家里的变化很敏感，喜欢一切按它的节奏运行。你越配合，它越愿意给你"特许亲近"。',
    image: '/images/cats/ESTJ.jpg',
    shareTitle: '我家猫是 ESTJ：领地管理猫'
  },
  'ESFJ': {
    type: 'ESFJ',
    title: '社交照护猫',
    tags: ['亲和', '爱热闹', '依恋', '互动强', '照顾欲'],
    desc: '它很在意"我们在不在一起"。你走到哪它跟到哪，喜欢参与家庭活动。对熟人尤其友好，会用贴贴、踩奶、呼噜表达关心。你越回应，它越稳定黏人。',
    image: '/images/cats/ESFJ.jpg',
    shareTitle: '我家猫是 ESFJ：社交照护猫'
  },
  'ENFJ': {
    type: 'ENFJ',
    title: '情绪领袖猫',
    tags: ['黏人', '会安慰', '强连接', '仪式感', '带动气氛'],
    desc: '它像小领导：会主动发起互动，把你拉进它的节奏里。你难过时它更愿意靠近，用陪伴"组织你振作"。适合需要情绪支持的人，属于越相处越离不开的类型。',
    image: '/images/cats/ENFJ.jpg',
    shareTitle: '我家猫是 ENFJ：情绪领袖猫'
  },
  'ENTJ': {
    type: 'ENTJ',
    title: '战略统领猫',
    tags: ['掌控', '目标感', '行动决策快', '强势', '领袖气场'],
    desc: '它不一定话多，但会用行动让你知道"我说了算"。资源分配（吃的、睡的、地盘）都要最优。对你会有明确偏好：认定你之后，会把你当成自己的核心队友。',
    image: '/images/cats/ENTJ.jpg',
    shareTitle: '我家猫是 ENTJ：战略统领猫'
  }
}

module.exports = {
  results
}
