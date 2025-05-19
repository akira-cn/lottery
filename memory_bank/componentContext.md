# 组件上下文

## 抽奖应用组件

### 参与者管理组件
- **名称**: `ParticipantManager`
- **路径**: `/src/components/ParticipantManager.vue`
- **描述**: 管理抽奖参与者列表，支持添加、删除参与者，批量导入和生成随机参与者
- **功能**:
  - 添加单个参与者
  - 删除指定参与者
  - 清空参与者列表
  - 生成随机参与者
  - 从剪贴板批量导入参与者
- **Props**:
  - `participants: Array` - 参与者列表，每个参与者包含id和name属性
- **事件**:
  - `@update:participants` - 更新参与者列表
- **UI特点**:
  - 响应式设计，适配移动端和桌面端
  - 参与者列表支持滚动查看
  - 支持暗色模式

### 抽奖设置组件
- **名称**: `LotterySettings`
- **路径**: `/src/components/LotterySettings.vue`
- **描述**: 配置抽奖规则，如每轮抽取人数
- **功能**:
  - 调整每轮抽取的中奖人数
  - 显示可参与抽奖的人数
  - 开始抽奖按钮
- **Props**:
  - `winnerCount: Number` - 每轮抽取的中奖人数
  - `participants: Array` - 可参与抽奖的参与者列表
- **事件**:
  - `@update:winner-count` - 更新每轮抽取人数
  - `@start-lottery` - 开始抽奖
- **UI特点**:
  - 数字调节器控制中奖人数
  - 智能限制中奖人数不超过参与者总数
  - 状态反馈显示当前可参与抽奖人数

### 抽奖展示组件
- **名称**: `LotteryDisplay`
- **路径**: `/src/components/LotteryDisplay.vue`
- **描述**: 展示抽奖动画和结果
- **功能**:
  - 抽奖过程动画展示
  - 随机滚动展示参与者名称
  - 展示中奖结果
  - 手动停止抽奖
- **Props**:
  - `isRunning: Boolean` - 抽奖是否进行中
  - `participants: Array` - 参与者列表
  - `winners: Array` - 当前轮次中奖者
  - `winnerCount: Number` - 每轮抽取的中奖人数
- **事件**:
  - `@lottery-complete` - 抽奖完成，返回中奖者列表
- **UI特点**:
  - 动画效果增强用户体验
  - 中奖结果卡片式展示
  - 适配不同屏幕尺寸的响应式网格布局

### 中奖名单组件
- **名称**: `WinnersList`
- **路径**: `/src/components/WinnersList.vue`
- **描述**: 展示每轮抽奖的中奖记录
- **功能**:
  - 按轮次展示中奖记录
  - 显示每轮抽奖的时间
  - 显示每轮中奖人数
- **Props**:
  - `winnerHistory: Array` - 历史中奖记录，包含轮次、时间戳和中奖者信息
- **UI特点**:
  - 分轮次卡片式展示
  - 响应式网格布局适配不同屏幕
  - 时间格式化显示