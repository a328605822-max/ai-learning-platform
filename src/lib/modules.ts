export interface WeekContent {
  id: string;
  title: string;
  description: string;
  concepts: string[];
  projectMilestone: string;
}

export interface ModuleData {
  id: string;
  num: number;
  title: string;
  subtitle: string;
  description: string;
  weeks: number;
  hours: number;
  project: string;
  techStack: string[];
  concepts: { name: string; explanation: string; time: string }[];
  weeks_content: WeekContent[];
  moneyAngle: string;
  educationAngle: string;
}

export const modules: ModuleData[] = [
  {
    id: "module-1",
    num: 1,
    title: "AI 认知地基",
    subtitle: "建立对 AI 的正确认知，做出你自己的 ChatGPT",
    description:
      "这是整个学习路线的起点。我们将从 AI 最基础的概念开始——Token、上下文窗口、Temperature——然后动手搭建一个可定制人设的 ChatGPT。不需要任何机器学习基础，只需要 Python 和好奇心。",
    weeks: 3,
    hours: 10,
    project: "可定制人设的 ChatGPT Web 应用",
    techStack: ["Python", "Streamlit", "Claude / OpenAI / DeepSeek / GLM"],
    concepts: [
      {
        name: "Token（词元）",
        explanation:
          "AI 读的不是「字」而是「词块」。比如「苹果」是 1 个 token，「iPhone」可能被拆成 2 个。理解 token 是理解 AI 计费和能力边界的起点。",
        time: "30min",
      },
      {
        name: "Context Window（上下文窗口）",
        explanation:
          "AI 的「短期记忆容量」，超出就忘了前面说了什么。这是为什么长对话中 AI 会「失忆」的根本原因。",
        time: "20min",
      },
      {
        name: "Temperature（温度）",
        explanation:
          "控制 AI 是「保守回答」还是「随机发挥」的旋钮。0 = 死板但准确，1 = 有创意但可能胡说。",
        time: "20min",
      },
      {
        name: "System Prompt vs User Prompt",
        explanation:
          "System Prompt = 给 AI 定规矩（你是一个儿童教育专家），User Prompt = 每次对话的输入。这是「定制 AI 人设」的核心技术。",
        time: "30min",
      },
      {
        name: "API 计费模型",
        explanation:
          "Token 怎么算钱？输入便宜、输出贵，不同模型价格差几十倍。理解计费是做产品的必修课。",
        time: "30min",
      },
    ],
    weeks_content: [
      {
        id: "week-1",
        title: "AI 全景图：从图灵测试到 ChatGPT",
        description:
          "建立全局认知：AI 的发展简史、当前技术栈全景、LLM 到底是什么。包含「AI 不是魔法」的核心认知建立。",
        concepts: ["AI/ML/DL 的关系", "LLM 的工作原理（通俗版）", "当前 AI 产品生态"],
        projectMilestone: "安装环境，跑通第一个 API 调用",
      },
      {
        id: "week-2",
        title: "Token 与上下文：AI 的「语言」和「记忆」",
        description:
          "深入理解 Token 机制和上下文窗口。用 Tokenizer 工具可视化看 AI 怎么「读」文字。理解为什么长对话会「失忆」。",
        concepts: ["Token 的拆分原理", "Context Window 的工作机制", "Temperature 和 Top-P 的区别"],
        projectMilestone: "搭建 Streamlit 界面框架，实现基础对话",
      },
      {
        id: "week-3",
        title: "打造你自己的 ChatGPT",
        description:
          "动手完成完整的聊天应用。支持自定义 System Prompt（人设）、保存/加载对话、参数调节、Token 计数。最后部署上线。",
        concepts: ["System Prompt 设计技巧", "对话历史管理", "Streamlit 部署"],
        projectMilestone: "完整应用部署上线，能分享链接给朋友使用",
      },
    ],
    moneyAngle:
      "通用 AI 聊天是免费的，但「垂直领域 AI 助手」可以收费。任何 system prompt + 特定知识就能变成垂直产品。关键差异化不在于技术，在于你对某个领域的理解深度。",
    educationAngle:
      "AI 就像一个读过很多很多书的鹦鹉——它不「知道」任何事，但极其擅长猜下一个字该说什么。未来孩子需要的不是「记住知识」，而是「问对问题」。",
  },
  {
    id: "module-2",
    num: 2,
    title: "记忆与知识",
    subtitle: "让 AI 学会「读书」，掌握 RAG 核心技术",
    description:
      "纯 LLM 有两个致命问题：数据过时、会「幻觉」（编造答案）。RAG（检索增强生成）通过在回答前先检索相关文档，让 AI 的回答有据可查。这是 90% 企业级 AI 应用的底层模式。",
    weeks: 3,
    hours: 10,
    project: "会读文档的 AI 问答机器人",
    techStack: ["Python", "Streamlit", "Chroma", "Claude / OpenAI / DeepSeek / GLM"],
    concepts: [
      {
        name: "Embedding（嵌入向量）",
        explanation:
          "把一段文字变成一个高维「坐标」（通常 1536 维）。意思相近的文字坐标也相近。「猫」和「小猫」的坐标很近，「猫」和「汽车」的坐标很远。",
        time: "1h",
      },
      {
        name: "向量相似度检索",
        explanation:
          "用户提问 → 把问题转成向量 → 在所有文档的向量中找最相似的 → 返回最相关的文档片段。这是 RAG 的核心检索机制。",
        time: "40min",
      },
      {
        name: "RAG 全流程",
        explanation:
          "提问 → 检索相关文档 → 把文档+问题一起塞给 LLM → 得到有依据的回答。相当于 AI 在回答前先「翻了书」。",
        time: "40min",
      },
      {
        name: "幻觉 vs 有依据的回答",
        explanation:
          "纯 LLM 会编造不存在的事实，因为它只是在「猜下一个字」。RAG 给它参考资料后，回答更可信。但这不意味着 RAG 完全杜绝幻觉。",
        time: "20min",
      },
      {
        name: "Chunking（文档分块）",
        explanation:
          "长文档怎么切？切多大？切法直接影响回答质量。块太大检索不精确，块太小丢失上下文。这是 RAG 系统最需要调优的参数。",
        time: "30min",
      },
      {
        name: "向量数据库",
        explanation:
          "专门存向量的数据库。Chroma（轻量入门）、Pinecone（云端）、Weaviate（开源）。它们的核心功能都是「找最近的向量」。",
        time: "30min",
      },
    ],
    weeks_content: [
      {
        id: "week-1",
        title: "Embedding 入门：让计算机理解「意思」",
        description:
          "理解 Embedding 是什么、怎么生成、怎么用。动手把文字转成向量，可视化感受「意思相近的词语坐标也相近」。",
        concepts: ["Embedding 的直观理解", "调用 Embedding API", "余弦相似度"],
        projectMilestone: "能生成 Embedding，计算两段文字的相似度",
      },
      {
        id: "week-2",
        title: "向量数据库：AI 的「记忆仓库」",
        description:
          "搭建 Chroma 向量数据库。学会文档分块策略。把所有文档转成向量存起来，实现「语义搜索」。",
        concepts: ["Chroma 使用", "Chunking 策略", "语义搜索 vs 关键词搜索"],
        projectMilestone: "上传文档 → 分块 → 存向量 → 语义搜索可用的管线",
      },
      {
        id: "week-3",
        title: "RAG 实战：会读书的 AI 助手",
        description:
          "把检索和生成连起来，完成端到端的 RAG 系统。上传你的 PDF/笔记，AI 能基于它们回答问题，并标注信息来源。",
        concepts: ["RAG 全流程整合", "Prompt 模板设计", "引用来源标注"],
        projectMilestone: "完整的文档问答系统上线，能标注每条回答的出处",
      },
    ],
    moneyAngle:
      "RAG 是 90% AI 企业级应用的底层模式。客服机器人 = 产品手册 RAG + 对话界面。法律助手 = 法条 RAG + 对话界面。整个 B 端 AI 市场基本就是这个公式的变体。",
    educationAngle:
      "它不会自己编答案，而是先去「课本」里找到相关内容再回答。和考试开卷一个道理——重要的不是记住答案，而是知道去哪里找答案。",
  },
  {
    id: "module-3",
    num: 3,
    title: "智能体觉醒",
    subtitle: "让 AI 拥有「手脚」，能自主执行任务",
    description:
      "前两个模块的 AI 只能「说」。这个模块让 AI 能「做」——调用工具、搜索信息、发送邮件、操作数据。Agent 是 2025-2026 年 AI 行业最热的方向，也是变现价值最高的赛道。",
    weeks: 3,
    hours: 10,
    project: "会自动干活的 AI Agent",
    techStack: ["Python", "Claude API Tool Use / OpenAI Function Calling", "各种第三方 API"],
    concepts: [
      {
        name: "Function Calling 机制",
        explanation:
          "AI 不直接执行动作，而是「说我想调用这个函数，参数是这些」。你的代码去执行，结果还给 AI。这个「AI 请求 → 代码执行 → AI 接收」的循环是 Agent 的基础。",
        time: "1h",
      },
      {
        name: "Agent 循环",
        explanation:
          "思考 → 行动 → 观察结果 → 再思考 → 再行动……直到任务完成。就像一个实习生接到任务后的工作流程。",
        time: "1h",
      },
      {
        name: "Chain of Thought（思维链）",
        explanation:
          "让 AI「把思考过程说出来」，答案质量会大幅提升。就像做数学题要写步骤，而不是直接蹦出答案。",
        time: "30min",
      },
      {
        name: "ReAct 模式",
        explanation:
          "Reasoning + Acting，目前最主流的 Agent 范式。AI 交替进行推理和行动，每一步都基于前一步的观察结果。",
        time: "30min",
      },
      {
        name: "Agent 的风险与安全",
        explanation:
          "让 AI 自动花钱？自动发邮件？自动删数据？权限边界怎么控制？人类确认（Human-in-the-loop）是目前的通用解法。",
        time: "30min",
      },
    ],
    weeks_content: [
      {
        id: "week-1",
        title: "Function Calling：给 AI 装上「手」",
        description:
          "学习 Function Calling 的核心机制。定义工具函数，让 AI 知道什么时候调用哪个工具，理解 JSON Schema 在其中的作用。",
        concepts: ["Function Calling 原理", "JSON Schema 工具定义", "工具选择逻辑"],
        projectMilestone: "AI 能调用至少 2 个工具（如查天气、算数学）",
      },
      {
        id: "week-2",
        title: "Agent 循环：让 AI 「思考-行动-观察」",
        description:
          "实现完整的 Agent 循环。让 AI 在多次「思考-行动-观察」中逐步完成复杂任务。引入 Chain of Thought 提升推理质量。",
        concepts: ["Agent 循环实现", "ReAct 范式", "思维链提示"],
        projectMilestone: "Agent 能自主完成需要 3 步以上的任务",
      },
      {
        id: "week-3",
        title: "Agent 实战与安全边界",
        description:
          "增加更多工具（搜索、邮件、文件操作），加入人类确认环节。设计安全的权限控制。部署一个真正能「干活」的 Agent。",
        concepts: ["多工具协调", "Human-in-the-loop", "Agent 安全设计"],
        projectMilestone: "完整的 Agent 应用，有权限控制，能演示实际工作任务",
      },
    ],
    moneyAngle:
      "变现三层次：卖对话（卷到免费）→ 卖知识（有壁垒）→ 卖行动（高客单价）。一个能自动整理发票、生成报表、发周报的 Agent，企业愿意付 100 元/月。Agent = 能干活的产品，比纯聊天产品值钱 10 倍。",
    educationAngle:
      "AI 不只会说话了，它现在有手有脚了——可以查资料、发通知、做事情。未来你和 AI 协作，就像有了一个永远不会累的助手。但要学会「管理」它。",
  },
  {
    id: "module-4",
    num: 4,
    title: "拆解黑盒",
    subtitle: "从零训练微型 GPT，彻底搞懂 AI 原理",
    description:
      "这是整个路线中最「硬核」的部分，也是让你从「会用 AI」跨越到「理解 AI」的关键。我们用纯 Python + NumPy，从零实现一个微型 GPT。不需要 GPU，不需要深度学习框架。做完后，你再也不会觉得 AI 是魔法。",
    weeks: 4,
    hours: 14,
    project: "从零训练微型 GPT（字符级预测）",
    techStack: ["Python", "NumPy", "Google Colab（免费 GPU）", "PyTorch（可选）"],
    concepts: [
      {
        name: "神经网络本质",
        explanation:
          "一大堆「旋钮」（参数）连成的网。输入数据，网输出预测，对比正确答案，按误差方向调节每个旋钮。反复这个过程，网络就能学会模式。",
        time: "1.5h",
      },
      {
        name: "反向传播",
        explanation:
          "「这次猜错了多少？把差值往回传，每个旋钮按比例调整」。是神经网络学习的核心算法，本质是链式求导。",
        time: "1.5h",
      },
      {
        name: "Transformer 架构",
        explanation:
          "现代 LLM 的核心发明。Attention 机制让 AI 能「注意到」一句话里不同词之间的关系。比如处理「猫追老鼠，它跑了」时，知道「它」指的是「老鼠」而不是「猫」。",
        time: "2h",
      },
      {
        name: "预训练 vs 微调",
        explanation:
          "预训练 = 让 AI 读遍互联网，学会语言本身（耗资百万美元）。微调 = 在通用能力之上，教它特定行为（几百美元就能做）。个人开发者的战场在微调，不在预训练。",
        time: "1h",
      },
      {
        name: "Scaling Law（规模定律）",
        explanation:
          "模型越大、数据越多、算力越强 → 能力越强。这条简单规律是过去五年 AI 爆发的底层驱动力。它解释了为什么各大公司都在疯狂买显卡。",
        time: "30min",
      },
      {
        name: "RLHF（人类反馈强化学习）",
        explanation:
          "ChatGPT 为什么「听话」？因为训练时人类给它的回答打分，它学会了「什么样的回答人类喜欢」。这是让大模型从「有用」变成「好用」的关键技术。",
        time: "1h",
      },
      {
        name: "Tokenizer 原理",
        explanation:
          "怎么把文字转成数字？BPE（Byte Pair Encoding）是最常用的算法。本质是统计高频字符对，不断合并，形成词表。",
        time: "1h",
      },
    ],
    weeks_content: [
      {
        id: "week-1",
        title: "神经网络基础：从感知机到多层网络",
        description:
          "从最简单的单个神经元开始，用 NumPy 实现前向传播。理解权重、偏置、激活函数。手写数字识别的迷你网络。",
        concepts: ["神经元数学模型", "前向传播", "激活函数（ReLU, Sigmoid）", "损失函数"],
        projectMilestone: "用 NumPy 实现一个能学习 XOR 的 2 层网络",
      },
      {
        id: "week-2",
        title: "反向传播：AI 学习的核心秘密",
        description:
          "手工推导反向传播的数学过程，用代码实现自动梯度计算。理解链式法则在神经网络中的应用。",
        concepts: ["梯度下降", "反向传播推导", "链式法则", "学习率的作用"],
        projectMilestone: "实现完整的前向+反向传播，训练一个 3 层网络做 MNIST 分类",
      },
      {
        id: "week-3",
        title: "Transformer 解剖：Attention 到底在干什么",
        description:
          "逐行理解 Transformer 的每个组件。重点攻克 Self-Attention 机制——这可能是整个 AI 学习中最重要的一个概念。参考 Jay Alammar 的图解。",
        concepts: [
          "Self-Attention 机制",
          "Multi-Head Attention",
          "Position Encoding",
          "Layer Normalization",
        ],
        projectMilestone: "用 NumPy 实现单头 Self-Attention，能可视化 Attention 权重",
      },
      {
        id: "week-4",
        title: "训练微型 GPT：让模型「学会」生成文字",
        description:
          "整合前三周的知识，用莎士比亚文本训练一个字符级 GPT。观察 loss 下降、生成质量提升的过程。这是整个模块的高光时刻。",
        concepts: ["GPT 架构总览", "训练循环", "文本生成（Sampling）", "评估生成质量"],
        projectMilestone: "训练完成的微型 GPT 能生成「莎士比亚风格」的新文本",
      },
    ],
    moneyAngle:
      "训练模型成本极高（百万美元级），但微调和应用成本极低。个人开发者的战场在「应用层」不在「模型层」。但理解模型层能让你做出更好的应用决策——比如知道为什么选 RAG 而不是微调，知道什么时候该用哪个模型。",
    educationAngle:
      "AI 不是魔法，就是一大堆数学运算。它的学习过程和你学说话很像——听多了、看多了，慢慢就学会了。只不过它读过的书是你的几百万倍。就像小孩学语言要先听大量的话，AI 也要先「读」海量的文字。",
  },
  {
    id: "module-5",
    num: 5,
    title: "产品化",
    subtitle: "把知识变成产品，跑通变现闭环",
    description:
      "最后一个模块，目标是把你前四个模块积累的能力变成一个真正能见人的线上产品。从需求验证到 MVP 开发到部署上线到收集反馈，跑通完整的产品闭环。",
    weeks: 4,
    hours: 14,
    project: "一个真实的线上 AI 产品",
    techStack: ["Python", "Streamlit / Next.js", "Vercel / Railway", "DeepSeek / GLM / OpenAI / Claude API"],
    concepts: [
      {
        name: "需求验证",
        explanation:
          "在写代码之前，先用 AI 调研：这个方向有人付费吗？竞品长什么样？目标用户是谁？用最小的成本验证「有人愿意为这个付钱」。",
        time: "2h",
      },
      {
        name: "MVP 开发",
        explanation:
          "最小可用版本。功能砍到只剩核心，快速出活。不追求完美，追求「能用」。用 AI 辅助写代码的效率是传统开发的 3-5 倍。",
        time: "6h",
      },
      {
        name: "部署与运维",
        explanation:
          "让产品在互联网上「活着」。选择免费部署平台（Streamlit Cloud / Vercel / Railway），配置域名、环境变量、监控。",
        time: "2h",
      },
      {
        name: "反馈与迭代",
        explanation:
          "发给 5-10 个朋友用，收集真实反馈。用户说「挺好的」没有用，要观察他们的实际行为。根据反馈迭代一版。",
        time: "2h",
      },
    ],
    weeks_content: [
      {
        id: "week-1",
        title: "选方向 + 需求验证",
        description:
          "从四个方向（垂直助手、知识库、Agent、微调模型）中选一个。用 AI 调研竞品、目标用户、付费意愿。用最少的时间确定「这个方向值得做」。",
        concepts: ["AI 辅助市场调研", "竞品分析方法", "用户画像构建"],
        projectMilestone: "确定产品方向，有至少 3 个竞品分析 + 5 个潜在用户反馈",
      },
      {
        id: "week-2",
        title: "MVP 开发：用 AI 高效写代码",
        description:
          "用 Cursor / Claude Code 等 AI 编程工具加速开发。你设计架构，AI 填代码细节，你审核修正。目标是 6 小时内做出核心功能可用的版本。",
        concepts: ["AI 辅助编程最佳实践", "组件化设计", "快速原型"],
        projectMilestone: "MVP 核心功能可运行，自己能用它完成一个完整任务",
      },
      {
        id: "week-3",
        title: "部署上线：让全世界看到你的产品",
        description:
          "选择合适的部署平台，配置环境变量、自定义域名（可选）。做好基本的错误处理和日志。确保产品 24 小时可访问。",
        concepts: ["免费部署方案对比", "环境变量管理", "基本监控"],
        projectMilestone: "产品上线，有一个可分享的 URL",
      },
      {
        id: "week-4",
        title: "找人试用 + 迭代收尾",
        description:
          "发给 5-10 个人试用，收集反馈。区分「礼貌好评」和「真问题」。快速迭代一版。写产品介绍文案，思考定价策略。",
        concepts: ["用户反馈收集技巧", "A/B 测试入门", "定价策略基础"],
        projectMilestone: "至少 5 人用过并给出反馈，完成一版迭代",
      },
    ],
    moneyAngle:
      "这个模块做完，你会拥有一个真实的线上产品 + 一套可复用的技术栈 + 一次完整的产品体验。无论这个产品赚不赚钱，你已经跑通了「AI 副业」的完整闭环。赚钱只是把这个闭环重复 10 次。",
    educationAngle:
      "爸爸做的这个东西，现在全世界的人都能在互联网上用它了。未来你也可以——你脑子里有一个想法，然后用 AI 帮你把它变成现实，然后分享给全世界。技术让创意民主化，AI 让这个进程快了 10 倍。",
  },
];

export function getModule(id: string): ModuleData | undefined {
  return modules.find((m) => m.id === id);
}

export function getWeek(moduleId: string, weekId: string): WeekContent | undefined {
  const mod = getModule(moduleId);
  return mod?.weeks_content.find((w) => w.id === weekId);
}
