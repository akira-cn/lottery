<!--
  Component: ParticipantManager
  Description: 管理抽奖参与者列表，支持添加、删除参与者
  Usage: <ParticipantManager :participants="participants" @update:participants="participants = $event" />
-->
<template>
  <div class="participant-manager w-full max-w-full overflow-hidden px-2 sm:px-0">
    <div class="mb-5">
      <label for="participant-name" class="block text-sm font-medium mb-2">参与者昵称</label>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-2">
        <input
          id="participant-name"
          v-model="newParticipant"
          type="text"
          placeholder="输入参与者昵称"
          class="w-full sm:flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
          @keyup.enter="addParticipant"
        />
        <button
          @click="addParticipant"
          class="w-full sm:w-auto px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-sm font-medium"
          :disabled="!newParticipant.trim()"
        >
          添加
        </button>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
        <h3 class="text-lg font-medium">参与者列表 <span class="inline-flex items-center justify-center px-2 py-0.5 ml-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">{{ localParticipants.length }}</span></h3>
        <button
          v-if="localParticipants.length > 0"
          @click="importFromClipboard"
          class="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
        >
          <span class="i-carbon-paste mr-1 text-base"></span>
          从剪贴板批量导入
        </button>
      </div>

      <div v-if="localParticipants.length === 0" class="py-6 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
        <span class="i-carbon-user-multiple block mx-auto mb-2 text-2xl opacity-50"></span>
        暂无参与者，请添加
      </div>

      <ul v-else class="max-h-72 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 shadow-sm">
        <li
          v-for="(participant, index) in localParticipants"
          :key="participant.id"
          class="flex items-center justify-between py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
        >
          <span class="truncate mr-2">{{ index + 1 }}. {{ participant.name }}</span>
          <button
            @click="removeParticipant(participant.id)"
            class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:outline-none p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-150"
            aria-label="删除参与者"
          >
            <span class="i-carbon-trash-can text-base"></span>
          </button>
        </li>
      </ul>
    </div>

    <div class="flex flex-wrap sm:flex-nowrap justify-center sm:justify-end gap-2 mt-4">
      <button
        @click="clearParticipants"
        class="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-sm flex items-center justify-center"
        :disabled="localParticipants.length === 0"
      >
        <span class="i-carbon-trash-can mr-1"></span>
        清空列表
      </button>
      <button
        @click="generateRandomParticipants"
        class="w-full sm:w-auto px-3 py-2 text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500 shadow-sm flex items-center justify-center"
      >
        <span class="i-carbon-user-multiple mr-1"></span>
        生成随机参与者
      </button>
      <button
        @click="importFromClipboard"
        class="w-full sm:w-auto px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-sm flex items-center justify-center"
      >
        <span class="i-carbon-paste mr-1"></span>
        批量导入
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  participants: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:participants']);

// 本地参与者列表
const localParticipants = ref([...props.participants]);

// 新参与者输入
const newParticipant = ref('');

// 监听props变化
watch(() => props.participants, (newVal) => {
  localParticipants.value = [...newVal];
}, { deep: true });

// 监听本地参与者列表变化，通知父组件更新
watch(localParticipants, (newVal) => {
  emit('update:participants', [...newVal]);
}, { deep: true });


// 生成随机参与者
function generateRandomParticipants() {
  const count = 10; // 默认生成10个随机参与者
  const randomNames = [
    '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
    '郑一', '王二', '陈三', '刘四', '林五', '黄六', '赵七', '吴八',
    '周九', '徐十', '孙一', '马二', '朱三', '胡四', '郭五', '何六',
    '高七', '林八', '王九', '杨十', '刘一', '李二'
  ];
  
  const newParticipants = [];
  
  for (let i = 0; i < count; i++) {
    // 随机选择一个名字
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    const name = randomNames[randomIndex];
    
    // 添加一个随机后缀，确保名字不重复
    const suffix = Math.floor(Math.random() * 1000);
    const fullName = `${name}${suffix}`;
    
    newParticipants.push({
      id: `participant-${Date.now()}-${i}`,
      name: fullName
    });
  }
  
  // 更新参与者列表
  localParticipants.value = [...localParticipants.value, ...newParticipants];
}



// 添加参与者
function addParticipant() {
  const name = newParticipant.value.trim();
  if (!name) return;
  
  // 检查是否已存在同名参与者
  if (localParticipants.value.some(p => p.name === name)) {
    alert(`参与者 "${name}" 已存在`);
    return;
  }
  
  // 创建新数组以确保触发响应式更新
  localParticipants.value = [...localParticipants.value, {
    id: Date.now().toString(),
    name
  }];
  
  newParticipant.value = '';
}

// 移除参与者
function removeParticipant(id) {
  const index = localParticipants.value.findIndex(p => p.id === id);
  if (index !== -1) {
    localParticipants.value.splice(index, 1);
  }
}

// 清空参与者列表
function clearParticipants() {
  if (confirm('确定要清空所有参与者吗？')) {
    localParticipants.value = [];
  }
}

// 从剪贴板批量导入
async function importFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    const names = text.split(/[\n,，;；\s]+/).filter(name => name.trim());
    
    if (names.length === 0) {
      alert('剪贴板内容为空或格式不正确');
      return;
    }
    
    const newParticipants = names.map(name => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      name: name.trim()
    }));
    
    // 过滤掉已存在的名称
    const existingNames = new Set(localParticipants.value.map(p => p.name));
    const uniqueNewParticipants = newParticipants.filter(p => !existingNames.has(p.name));
    
    if (uniqueNewParticipants.length === 0) {
      alert('所有参与者已存在');
      return;
    }
    
    localParticipants.value = [...localParticipants.value, ...uniqueNewParticipants];
    alert(`成功导入 ${uniqueNewParticipants.length} 名参与者`);
  } catch (error) {
    alert('无法访问剪贴板，请检查浏览器权限');
    console.error('剪贴板访问错误:', error);
  }
}
</script>