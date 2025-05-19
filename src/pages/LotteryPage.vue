<!--
  Page: LotteryPage
  Description: 抽奖应用主页面，包含抽奖设置区、抽奖展示区和中奖名单区
  Usage: 作为应用的主页面，在App.vue中引入
-->
<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- 左侧抽奖设置区 -->
    <div class="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 class="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">抽奖设置</h2>
      <ParticipantManager
        :participants="participants"
        @update:participants="participants = $event"
      />
      <div class="mt-6">
        <LotterySettings
          :winner-count="winnerCount"
          :participants="availableParticipants"
          @update:winner-count="winnerCount = $event"
          @start-lottery="startLottery"
        />
      </div>
    </div>

    <!-- 右侧抽奖展示区 -->
    <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col">
      <h2 class="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">抽奖区域</h2>
      <LotteryDisplay
        :is-running="isLotteryRunning"
        :participants="availableParticipants"
        :winners="currentWinners"
        :winner-count="winnerCount"
        @lottery-complete="handleLotteryComplete"
      />
    </div>

    <!-- 底部中奖名单区 -->
    <div class="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-4">
      <h2 class="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">中奖名单</h2>
      <WinnersList :winner-history="winnerHistory" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ParticipantManager from '../components/ParticipantManager.vue';
import LotterySettings from '../components/LotterySettings.vue';
import LotteryDisplay from '../components/LotteryDisplay.vue';
import WinnersList from '../components/WinnersList.vue';

// 参与者列表
const participants = ref([]);

// 每轮抽取人数
const winnerCount = ref(1);

// 抽奖状态
const isLotteryRunning = ref(false);

// 当前轮次中奖者
const currentWinners = ref([]);

// 历史中奖记录
const winnerHistory = ref([]);

// 计算可参与抽奖的人员（排除已中奖者）
const availableParticipants = computed(() => {
  // 获取所有已中奖者
  const allWinners = winnerHistory.value.flatMap(round => round.winners);
  // 过滤掉已中奖者
  return participants.value.filter(p => !allWinners.some(w => w.id === p.id));
});

// 开始抽奖
function startLottery() {
  if (availableParticipants.value.length === 0) {
    alert('没有可参与抽奖的人员');
    return;
  }
  
  if (availableParticipants.value.length < winnerCount.value) {
    alert(`可参与抽奖的人数不足 ${winnerCount.value} 人`);
    return;
  }
  
  isLotteryRunning.value = true;
  currentWinners.value = [];
}

// 处理抽奖完成
function handleLotteryComplete(winners) {
  isLotteryRunning.value = false;
  currentWinners.value = winners;
  
  // 添加到历史记录
  winnerHistory.value.push({
    round: winnerHistory.value.length + 1,
    winners: [...winners],
    timestamp: new Date().toISOString()
  });
}
</script>