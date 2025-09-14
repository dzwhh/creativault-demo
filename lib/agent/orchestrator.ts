import { randomId, sleep } from '../utils';
import type { AgentTask, AgentTaskPartial } from '../types';

// In-memory store for agent tasks
const taskStore = new Map<string, AgentTask>();

// Mock AI responses for different analysis types
const mockAnalysisContent = {
  market: {
    steps: [
      { name: '收集市场数据', duration: 2000 },
      { name: '分析竞争态势', duration: 3000 },
      { name: '识别市场机会', duration: 2500 },
      { name: '生成市场洞察', duration: 1500 },
    ],
    outputs: [
      {
        key: 'market_overview',
        format: 'markdown' as const,
        value: `# 市场分析报告

## 市场概况
目标市场规模预计达到 $2.5B，年增长率约 15%。主要驱动因素包括：
- 消费者行为数字化转型
- 移动端购买习惯增强
- 个性化需求增长

## 竞争格局
- **头部玩家**：占据 60% 市场份额
- **新兴品牌**：快速增长，创新能力强
- **传统品牌**：转型升级中

## 机会识别
1. **细分市场空白**：18-25岁用户群体关注度不足
2. **渠道机会**：短视频平台潜力巨大
3. **产品创新**：AI驱动个性化推荐`
      },
      {
        key: 'market_data',
        format: 'json' as const,
        value: JSON.stringify({
          marketSize: 2500000000,
          growthRate: 0.15,
          competitors: 45,
          opportunities: 12,
          threats: 8
        })
      }
    ]
  },
  audience: {
    steps: [
      { name: '收集受众数据', duration: 2200 },
      { name: '分析用户行为', duration: 2800 },
      { name: '构建用户画像', duration: 2000 },
      { name: '生成受众洞察', duration: 1800 },
    ],
    outputs: [
      {
        key: 'audience_analysis',
        format: 'markdown' as const,
        value: `# 受众分析报告

## 核心受众画像
**主要用户群体**: 25-34岁都市白领
- 收入水平: ¥8,000-15,000/月
- 教育背景: 本科及以上
- 消费习惯: 品质导向，价格敏感度中等

## 行为特征
- **购买决策周期**: 3-7天
- **信息获取渠道**: 社交媒体 (65%), 搜索引擎 (45%), KOL推荐 (35%)
- **活跃时间**: 晚上 8-11点，周末全天

## 痛点与需求
1. 时间成本高，希望快速决策
2. 信息过载，需要可信推荐
3. 个性化需求强烈`
      }
    ]
  },
  competition: {
    steps: [
      { name: '识别竞争对手', duration: 1800 },
      { name: '分析竞品策略', duration: 3200 },
      { name: '评估竞争优势', duration: 2400 },
      { name: '制定差异化策略', duration: 2000 },
    ],
    outputs: [
      {
        key: 'competition_analysis',
        format: 'markdown' as const,
        value: `# 竞争分析报告

## 主要竞争对手
1. **竞品A**: 市场领导者，品牌知名度高
   - 优势: 渠道覆盖广，产品线丰富
   - 劣势: 创新速度慢，年轻化不足

2. **竞品B**: 新兴品牌，增长迅速
   - 优势: 营销创新，用户体验好
   - 劣势: 供应链不稳定，成本控制差

## 竞争策略分析
- **价格策略**: 中高端定位为主
- **渠道策略**: 线上线下融合
- **营销策略**: KOL合作 + 内容营销

## 差异化机会
1. 技术创新突破
2. 服务体验升级
3. 垂直场景深耕`
      }
    ]
  },
  creative: {
    steps: [
      { name: '解析创意元素', duration: 2000 },
      { name: '分析视觉风格', duration: 2600 },
      { name: '评估传播效果', duration: 2200 },
      { name: '生成优化建议', duration: 1600 },
    ],
    outputs: [
      {
        key: 'creative_analysis',
        format: 'markdown' as const,
        value: `# 创意素材分析报告

## 创意元素分析
**视觉风格**: 简约现代，色彩搭配和谐
**文案特点**: 情感化表达，利益点突出
**CTA设计**: 醒目，行动导向明确

## 传播效果评估
- **注意力抓取**: ⭐⭐⭐⭐⭐ (9.2/10)
- **信息传达**: ⭐⭐⭐⭐ (8.5/10)
- **行动驱动**: ⭐⭐⭐⭐ (8.1/10)

## 优化建议
1. **视觉优化**: 增强品牌元素露出
2. **文案优化**: 强化价值主张表达
3. **互动优化**: 增加用户参与元素

## 创意方向
- 生活化场景展示
- 用户UGC内容
- 限时优惠刺激`
      }
    ]
  }
};

export class AgentOrchestrator {
  private eventListeners: Map<string, Set<(data: AgentTaskPartial) => void>> = new Map();

  createTask(type: AgentTask['type'], input: Record<string, unknown>): string {
    const taskId = randomId();
    const now = new Date().toISOString();
    
    const config = mockAnalysisContent[type];
    const steps = config.steps.map((step, index) => ({
      id: `step-${index + 1}`,
      name: step.name,
      status: 'pending'
    }));

    const task: AgentTask = {
      id: taskId,
      type,
      input,
      status: 'pending',
      steps,
      outputs: [],
      createdAt: now,
      updatedAt: now
    };

    taskStore.set(taskId, task);
    
    // Start task execution asynchronously
    this.runTask(taskId);
    
    return taskId;
  }

  getTask(taskId: string): AgentTask | undefined {
    return taskStore.get(taskId);
  }

  getAllTasks(): AgentTask[] {
    return Array.from(taskStore.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async runTask(taskId: string): Promise<void> {
    const task = taskStore.get(taskId);
    if (!task) return;

    try {
      // Update task status to running
      task.status = 'running';
      task.updatedAt = new Date().toISOString();
      this.notifyListeners(taskId, { taskId, status: 'running' });

      const config = mockAnalysisContent[task.type];
      
      // Execute steps sequentially
      for (let i = 0; i < task.steps.length; i++) {
        const step = task.steps[i];
        const stepConfig = config.steps[i];
        
        // Start step
        step.status = 'running';
        step.startedAt = new Date().toISOString();
        task.updatedAt = new Date().toISOString();
        
        this.notifyListeners(taskId, {
          taskId,
          step: step.name,
          status: 'running',
          progress: (i / task.steps.length) * 100
        });

        // Simulate step execution with partial updates
        const duration = stepConfig.duration;
        const chunks = 3;
        const chunkDuration = duration / chunks;
        
        for (let chunk = 0; chunk < chunks; chunk++) {
          await sleep(chunkDuration);
          
          this.notifyListeners(taskId, {
            taskId,
            step: step.name,
            status: 'running',
            partial: `正在执行 ${step.name}... (${Math.round(((chunk + 1) / chunks) * 100)}%)`,
            progress: ((i + (chunk + 1) / chunks) / task.steps.length) * 100
          });
        }

        // Complete step
        step.status = 'completed';
        step.finishedAt = new Date().toISOString();
        task.updatedAt = new Date().toISOString();
      }

      // Add outputs
      task.outputs = config.outputs;
      task.status = 'done';
      task.updatedAt = new Date().toISOString();
      
      this.notifyListeners(taskId, {
        taskId,
        status: 'done',
        progress: 100
      });

    } catch (error) {
      task.status = 'failed';
      task.updatedAt = new Date().toISOString();
      
      this.notifyListeners(taskId, {
        taskId,
        status: 'failed'
      });
    }
  }

  // Event system for SSE
  subscribe(taskId: string, callback: (data: AgentTaskPartial) => void): () => void {
    if (!this.eventListeners.has(taskId)) {
      this.eventListeners.set(taskId, new Set());
    }
    
    this.eventListeners.get(taskId)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.eventListeners.get(taskId);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.eventListeners.delete(taskId);
        }
      }
    };
  }

  private notifyListeners(taskId: string, data: AgentTaskPartial) {
    const listeners = this.eventListeners.get(taskId);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }

  // Helper method to clean up completed tasks (optional)
  cleanup(maxAge: number = 24 * 60 * 60 * 1000): void {
    const cutoff = Date.now() - maxAge;
    
    taskStore.forEach((task, taskId) => {
      if (new Date(task.updatedAt).getTime() < cutoff && 
          (task.status === 'done' || task.status === 'failed')) {
        taskStore.delete(taskId);
        this.eventListeners.delete(taskId);
      }
    });
  }
}

// Singleton instance
export const agentOrchestrator = new AgentOrchestrator();

// Auto cleanup every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    agentOrchestrator.cleanup();
  }, 60 * 60 * 1000);
}