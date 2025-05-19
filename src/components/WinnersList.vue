<!--
  Component: WinnersList
  Description: 展示每轮抽奖的中奖记录
  Usage: <WinnersList :winner-history="winnerHistory" />
-->
<template>
  <div class="winners-list">
    <div v-if="winnerHistory.length === 0" class="py-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md">
      暂无中奖记录
    </div>

    <div v-else class="space-y-4">
      <div v-for="(round, index) in winnerHistory" :key="index" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-medium">
            第 {{ round.round }} 轮抽奖
            <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {{ formatTime(round.timestamp) }}
            </span>
          </h3>
          <div class="text-sm text-primary-600 dark:text-primary-400">
            {{ round.winners.length }} 人中奖
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <div
            v-for="winner in round.winners"
            :key="winner.id"
            class="bg-white dark:bg-gray-700 px-3 py-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-600"
          >
            <div class="text-center text-gray-800 dark:text-gray-200 truncate" :title="winner.name">
              {{ winner.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  winnerHistory: {
    type: Array,
    default: () => []
  }
});

// 格式化时间
function formatTime(timestamp) {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  
  // 格式化为 HH:MM:SS
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
}
</script>