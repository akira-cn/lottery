<!--
  Component: LotterySettings
  Description: 配置抽奖规则，如每轮抽取人数
  Usage: <LotterySettings :winner-count="winnerCount" :participants="participants" @update:winner-count="winnerCount = $event" @start-lottery="startLottery" />
-->
<template>
  <div class="lottery-settings w-full max-w-full overflow-hidden px-2 sm:px-0">
    <div class="mb-5">
      <label for="winner-count" class="block text-sm font-medium mb-2">每轮抽取人数</label>
      <div class="flex flex-wrap items-center gap-3 sm:gap-2">
        <button
          @click="decreaseWinnerCount"
          class="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-colors duration-150"
          :disabled="localWinnerCount <= 1"
          aria-label="减少抽奖人数"
        >
          <span class="text-lg font-bold">−</span>
        </button>
        <input
          id="winner-count"
          v-model.number="localWinnerCount"
          type="number"
          min="1"
          :max="maxWinnerCount"
          class="w-20 text-center px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
        />
        <button
          @click="increaseWinnerCount"
          class="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-colors duration-150"
          :disabled="localWinnerCount >= maxWinnerCount"
          aria-label="增加抽奖人数"
        >
          <span class="text-lg font-bold">+</span>
        </button>
        <span class="text-sm text-gray-500 dark:text-gray-400 ml-1">
          (最多 {{ maxWinnerCount }} 人)
        </span>
      </div>
    </div>

    <div class="lottery-status mb-5 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
      <div class="text-sm">
        <span class="font-medium">可参与抽奖人数：</span>
        <span :class="{'text-red-500 dark:text-red-400 font-bold': participants.length === 0, 'text-primary-600 dark:text-primary-400 font-bold': participants.length > 0}">
          {{ participants.length }}
        </span>
      </div>
    </div>

    <button
      @click="startLottery"
      class="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium shadow-sm flex items-center justify-center gap-2"
      :disabled="!canStartLottery"
    >
      <span class="i-carbon-play-filled text-xl"></span>
      开始抽奖
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  winnerCount: {
    type: Number,
    default: 1
  },
  participants: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:winner-count', 'start-lottery']);

// 本地每轮抽取人数
const localWinnerCount = ref(props.winnerCount);

// 监听props变化
watch(() => props.winnerCount, (newVal) => {
  localWinnerCount.value = newVal;
});

// 监听参与者列表变化，确保每轮抽取人数不超过参与者总数
watch(() => props.participants, (newParticipants) => {
  const newLength = newParticipants.length;
  // 强制更新UI显示
  if (localWinnerCount.value > newLength && newLength > 0) {
    localWinnerCount.value = newLength;
    emit('update:winner-count', localWinnerCount.value);
  }
}, { deep: true, immediate: true });

// 监听本地值变化，向父组件发送更新事件
watch(localWinnerCount, (newVal) => {
  // 确保值在有效范围内
  if (newVal < 1) {
    localWinnerCount.value = 1;
  } else if (newVal > maxWinnerCount.value) {
    localWinnerCount.value = maxWinnerCount.value;
  }
  emit('update:winner-count', localWinnerCount.value);
});

// 计算最大可抽取人数
const maxWinnerCount = computed(() => {
  return Math.max(1, props.participants.length);
});

// 是否可以开始抽奖
const canStartLottery = computed(() => {
  return props.participants.length > 0 && props.participants.length >= localWinnerCount.value;
});

// 减少每轮抽取人数
function decreaseWinnerCount() {
  if (localWinnerCount.value > 1) {
    localWinnerCount.value--;
  }
}

// 增加每轮抽取人数
function increaseWinnerCount() {
  if (localWinnerCount.value < maxWinnerCount.value) {
    localWinnerCount.value++;
  }
}

// 开始抽奖
function startLottery() {
  if (canStartLottery.value) {
    emit('start-lottery');
  }
}
</script>