<!--
  Component: LotteryDisplay
  Description: 展示抽奖动画和结果
  Usage: <LotteryDisplay :is-running="isLotteryRunning" :participants="participants" :winners="winners" :winner-count="winnerCount" @lottery-complete="handleLotteryComplete" />
-->
<template>
  <div class="lottery-display flex-1 flex flex-col w-full max-w-full overflow-hidden px-2 sm:px-0">
    <!-- 抽奖动画区域 -->
    <div class="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-lg mb-5 min-h-60 shadow-sm border border-gray-100 dark:border-gray-700">
      <!-- 抽奖进行中 -->
      <div v-if="isRunning" class="text-center w-full">
        <div class="lottery-animation mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-primary-100 dark:border-primary-900">
          <div class="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 animate-bounce">
            {{ currentName }}
          </div>
        </div>
        <button
          @click="stopLottery"
          class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium shadow-sm flex items-center justify-center gap-2 mx-auto"
        >
          <span class="i-carbon-stop-filled text-xl"></span>
          开奖 🎉
        </button>
      </div>

      <!-- 抽奖结果 -->
      <div v-else-if="winners.length > 0" class="text-center w-full">
        <h3 class="text-xl sm:text-2xl font-medium mb-5 flex items-center justify-center gap-2">
          <span class="i-carbon-trophy text-yellow-500 text-2xl"></span>
          恭喜以下幸运者
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto px-2">
          <div
            v-for="winner in winners"
            :key="winner.id"
            class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-2 border-primary-500 dark:border-primary-400 transition-transform duration-300 hover:scale-105"
          >
            <div class="text-xl font-bold text-primary-600 dark:text-primary-400 truncate">
              {{ winner.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- 等待开始抽奖 -->
      <div v-else class="text-center text-gray-500 dark:text-gray-400 p-6">
        <div class="text-6xl sm:text-7xl mb-4 animate-pulse">🎁</div>
        <p class="text-base sm:text-lg">点击"开始抽奖"按钮开始抽奖</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps({
  isRunning: {
    type: Boolean,
    default: false
  },
  participants: {
    type: Array,
    default: () => []
  },
  winners: {
    type: Array,
    default: () => []
  },
  // 添加winnerCount属性，表示每轮抽取的中奖人数
  winnerCount: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['lottery-complete']);

// 当前展示的名称
const currentName = ref('');

// 动画定时器
let animationTimer = null;

// 监听抽奖状态变化
watch(() => props.isRunning, (newVal) => {
  if (newVal) {
    startAnimation();
  } else {
    stopAnimation();
  }
});

// 开始动画
function startAnimation() {
  if (props.participants.length === 0) return;
  
  // 随机展示参与者名称
  animationTimer = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * props.participants.length);
    currentName.value = props.participants[randomIndex].name;
  }, 100);
}

// 停止动画
function stopAnimation() {
  if (animationTimer) {
    clearInterval(animationTimer);
    animationTimer = null;
  }
}

// 停止抽奖并选出中奖者
function stopLottery() {
  stopAnimation();
  
  // 从参与者中随机选出指定数量的中奖者
  const availableParticipants = [...props.participants];
  const selectedWinners = [];
  
  // 确定实际可抽取的人数（不超过可用参与者数量）
  // 使用父组件传入的winnerCount属性获取每轮应抽取人数
  const winnerCount = Math.min(props.winnerCount, availableParticipants.length);
  
  for (let i = 0; i < winnerCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableParticipants.length);
    selectedWinners.push(availableParticipants[randomIndex]);
    availableParticipants.splice(randomIndex, 1);
  }
  
  // 通知父组件抽奖完成
  emit('lottery-complete', selectedWinners);
}

// 组件卸载时清除定时器
onUnmounted(() => {
  stopAnimation();
});
</script>

<style scoped>
.lottery-animation {
  min-height: 60px;
}
</style>